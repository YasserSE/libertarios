/**
 * Voz en off con ElevenLabs para un partido:
 *   npm run tts -- pp               genera public/vo/pp/NN.wav y src/vo-manifest.json
 *   npm run tts -- --voices         lista voces femeninas en español disponibles
 *   ONLY=3,5 npm run tts -- pp      regenera solo esos beats
 *
 * Clave: ELEVENLABS_API_KEY o el fichero ~/.config/elevenlabs/key (nunca en el repo).
 * Voz: ELEVENLABS_VOICE_ID (por defecto, la elegida abajo).
 *
 * Vídeos explicativos (src/explainers): modo continuo. Una sola toma con el guion
 * entero, cortada por escenas con los tiempos de cada carácter: entonación
 * natural entre escenas y sin pausas bruscas (`--beats` fuerza una toma por escena).
 *
 * Se usa /with-timestamps porque devuelve el tiempo de cada carácter: con eso
 * se sacan los tiempos exactos de cada palabra para subtítulos y cortes.
 * Lo que se dice es el guion de build.ts; solo cambia la pronunciación de
 * siglas y cifras (los subtítulos siguen mostrando el texto normal).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { buildReel, words, type VoClip } from "../src/build";
import { INTRO } from "../src/intro-script";
import { EXPLAINERS } from "../src/explainers";

const API = "https://api.elevenlabs.io/v1";
const MODEL = "eleven_multilingual_v2";
const DEFAULT_VOICE = process.env.ELEVENLABS_VOICE_ID ?? "";

const keyFile = `${homedir()}/.config/elevenlabs/key`;
const KEY = process.env.ELEVENLABS_API_KEY ?? (existsSync(keyFile) ? readFileSync(keyFile, "utf8").trim() : "");
if (!KEY) {
  console.error(`Falta la clave: exporta ELEVENLABS_API_KEY o guárdala en ${keyFile}`);
  process.exit(1);
}
const headers = { "xi-api-key": KEY, "Content-Type": "application/json" };

/** Pronunciación por palabra de subtítulo (la puntuación se conserva). */
const sayAs = (w: string) =>
  w
    .replace(/^IRPF/, "i erre pe efe")
    .replace(/^PP(?=\W|$)/, "pepé")
    .replace(/^PSOE/, "pesóe")
    .replace(/^libertarios\.eu/, "libertarios punto eu")
    .replace(/^37,5/, "treinta y siete y media");

async function listVoices() {
  const mine = (await (await fetch(`${API}/voices`, { headers })).json()) as {
    voices: { voice_id: string; name: string; labels?: Record<string, string> }[];
  };
  console.log("Tus voces:");
  for (const v of mine.voices) console.log(`  ${v.voice_id}  ${v.name}  ${JSON.stringify(v.labels ?? {})}`);
  const shared = (await (
    await fetch(`${API}/shared-voices?language=es&gender=female&page_size=25&sort=trending`, { headers })
  ).json()) as { voices: { voice_id: string; public_owner_id: string; name: string; accent?: string; descriptive?: string; use_case?: string }[] };
  console.log("\nBiblioteca (español, mujer):");
  for (const v of shared.voices ?? [])
    console.log(`  ${v.voice_id}  ${v.name}  · ${v.accent ?? ""} · ${v.descriptive ?? ""} · ${v.use_case ?? ""}`);
}

type Alignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

async function speak(voice: string, text: string, prev: string, next: string) {
  const res = await fetch(`${API}/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      text,
      model_id: MODEL,
      language_code: "es",
      previous_text: prev || undefined,
      next_text: next || undefined,
      // Voz más fluida y algo más rápida (10-10-2026): velocidad máxima de ElevenLabs.
      voice_settings: { stability: 0.38, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true, speed: 1.2 },
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
  return (await res.json()) as { audio_base64: string; alignment: Alignment };
}

async function main() {
  const arg = process.argv[2] ?? "pp";
  if (arg === "--voices") return listVoices();
  if (!DEFAULT_VOICE) {
    console.error("Elige voz: `npm run tts -- --voices` y exporta ELEVENLABS_VOICE_ID.");
    process.exit(1);
  }

  const explainer = EXPLAINERS[arg];
  const reel = { beats: explainer ? explainer.scenes : arg === "intro" ? INTRO : buildReel(arg).beats };
  if (explainer && !process.argv.includes("--beats")) return continuous(arg, reel.beats.map((b) => b.script));
  const dir = new URL(`../public/vo/${arg}/`, import.meta.url).pathname;
  mkdirSync(dir, { recursive: true });
  const manifestPath = new URL("../src/vo-manifest.json", import.meta.url).pathname;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<string, VoClip[]>;
  const old = manifest[arg] ?? [];
  const only = process.env.ONLY ? new Set(process.env.ONLY.split(",").map(Number)) : null;

  const spokenOf = (script: string) => {
    const shown = words(script);
    const parts = shown.map(sayAs);
    return { shown, parts, text: parts.join(" ") };
  };

  const clips: VoClip[] = [];
  for (const [i, b] of reel.beats.entries()) {
    const name = String(i).padStart(2, "0");
    if (only && !only.has(i) && old[i]) {
      clips.push(old[i]);
      continue;
    }
    const { shown, parts, text } = spokenOf(b.script);
    const prev = i > 0 ? spokenOf(reel.beats[i - 1].script).text : "";
    const next = i + 1 < reel.beats.length ? spokenOf(reel.beats[i + 1].script).text : "";
    const { audio_base64, alignment } = await speak(DEFAULT_VOICE, text, prev, next);

    const mp3 = `${dir}${name}.mp3`;
    const wav = `${dir}${name}.wav`;
    writeFileSync(mp3, Buffer.from(audio_base64, "base64"));
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", mp3, "-ar", "48000", "-ac", "1", wav]);
    execFileSync("rm", [mp3]);
    const seconds = Number(
      execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav]).toString().trim(),
    );

    // cada palabra de subtítulo empieza donde empieza el primer carácter de su forma dicha
    let offset = 0;
    const timed = shown.map((word, k) => {
      const t = alignment.character_start_times_seconds[offset] ?? seconds;
      offset += parts[k].length + 1;
      return { word, t: Number(t.toFixed(3)) };
    });
    clips.push({ file: `vo/${arg}/${name}.wav`, seconds: Number(seconds.toFixed(3)), words: timed });
    console.log(`${name} ${seconds.toFixed(2)}s  ${text}`);
  }

  manifest[arg] = clips;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
  console.log(`\n→ src/vo-manifest.json (${arg})`);
}

/** Una toma para todo el guion, cortada por escenas. */
async function continuous(id: string, scripts: string[]) {
  const dir = new URL(`../public/vo/${id}/`, import.meta.url).pathname;
  mkdirSync(dir, { recursive: true });
  const scenes = scripts.map((sc) => {
    const shown = words(sc);
    const parts = shown.map(sayAs);
    return { shown, parts, text: parts.join(" ") };
  });
  const text = scenes.map((s) => s.text).join(" ");
  const starts: number[] = [];
  let off = 0;
  for (const s of scenes) {
    starts.push(off);
    off += s.text.length + 1;
  }
  const { audio_base64, alignment } = await speak(DEFAULT_VOICE, text, "", "");
  const full = `${dir}full.mp3`;
  writeFileSync(full, Buffer.from(audio_base64, "base64"));
  const total = Number(
    execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", full]).toString().trim(),
  );
  const at = (i: number) => alignment.character_start_times_seconds[i] ?? total;
  // cada escena empieza un pelín antes de su primera letra para no comerse el ataque
  const cut = starts.map((c, i) => (i === 0 ? 0 : Math.max(0, at(c) - 0.04)));
  const clips: VoClip[] = scenes.map((s, i) => {
    const name = String(i).padStart(2, "0");
    const from = cut[i];
    const to = i + 1 < scenes.length ? cut[i + 1] : total;
    const wav = `${dir}${name}.wav`;
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", full, "-ss", from.toFixed(3), "-to", to.toFixed(3), "-ar", "48000", "-ac", "1", wav]);
    let o = starts[i];
    const timed = s.shown.map((word, k) => {
      const t = at(o) - from;
      o += s.parts[k].length + 1;
      return { word, t: Number(Math.max(0, t).toFixed(3)) };
    });
    console.log(`${name} ${(to - from).toFixed(2)}s  ${s.text}`);
    return { file: `vo/${id}/${name}.wav`, seconds: Number((to - from).toFixed(3)), words: timed };
  });
  execFileSync("rm", [full]);
  const manifestPath = new URL("../src/vo-manifest.json", import.meta.url).pathname;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<string, VoClip[]>;
  manifest[id] = clips;
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
  console.log(`\n→ src/vo-manifest.json (${id}, toma continua de ${total.toFixed(1)} s)`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
