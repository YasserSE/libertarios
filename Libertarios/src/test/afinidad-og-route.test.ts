// @vitest-environment node
import { describe, it, expect } from "vitest";
import type { Answers } from "@/data/afinidad/types";
import { dataset } from "@/data/afinidad";
import { encodeResultParams } from "@/lib/afinidad/encode";
import { GET } from "@/app/api/og/afinidad/route";

/*
 * La ruta de la imagen OG devuelve un PNG de 1200×630 y por debajo de 300 KB
 * (límite práctico de WhatsApp) en sus cuatro variantes: genérica, resultado,
 * anónima y entrada de «Dijeron vs. hicieron».
 */

function pngSize(buf: Uint8Array): { width: number; height: number } {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

function resultQuery(): string {
  const answers: Answers = {};
  dataset.questions.forEach((q, i) => {
    answers[q.id] = { value: ([2, 1, -1, -2] as const)[i % 4], important: false };
  });
  return encodeResultParams({ answers }, dataset.questions, dataset.version).toString();
}

const entry = (dataset.saidVsDid ?? [])[0];
const CASES: [string, string][] = [
  ["genérica", "l=gl"],
  ["resultado", `${resultQuery()}&l=es`],
  ["anónima", `${resultQuery()}&anon=1&l=ca`],
  ["dijeron vs. hicieron", `dvh=${encodeURIComponent(entry?.id ?? "x")}&l=eu`],
];

describe("imagen OG de «¿A quién votar?»", () => {
  it.each(CASES)("%s: PNG 1200×630 < 300 KB", async (_name, query) => {
    const res = await GET(new Request(`http://localhost/api/og/afinidad?${query}`));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/png");
    const buf = new Uint8Array(await res.arrayBuffer());
    expect(Array.from(buf.slice(1, 4))).toEqual([0x50, 0x4e, 0x47]); // «PNG»
    expect(pngSize(buf)).toEqual({ width: 1200, height: 630 });
    expect(buf.byteLength).toBeLessThan(300 * 1024);
  }, 30_000);
});
