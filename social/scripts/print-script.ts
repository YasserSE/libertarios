/** Imprime el guion de voz en off de un partido: `npm run script -- pp` */
import { buildReel, beatFrames, FPS } from "../src/build";

const id = process.argv[2] ?? "pp";
const reel = buildReel(id);
let t = 0;
for (const b of reel.beats) {
  const s = beatFrames(b) / FPS;
  console.log(`[${t.toFixed(1).padStart(5)}s] ${b.type.padEnd(9)} ${b.script}`);
  t += s;
}
console.log(`\nTotal: ${t.toFixed(1)} s`);
