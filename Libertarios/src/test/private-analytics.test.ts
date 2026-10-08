import { describe, expect, it } from "vitest";
import { stripPrivateUrl } from "@/lib/analytics-url";

describe("stripPrivateUrl (lo que llega a Vercel Analytics)", () => {
  it("quita respuestas, voto habitual y comunidad de un resultado compartido", () => {
    expect(
      stripPrivateUrl("https://www.libertarios.eu/es/a-quien-votar?r=0123s.a&v=1&ca=MD&vh=psoe#x"),
    ).toBe("https://www.libertarios.eu/es/a-quien-votar");
  });

  it("conserva solo los utm_*", () => {
    expect(
      stripPrivateUrl("https://www.libertarios.eu/es?utm_source=x&r=01&utm_campaign=29n"),
    ).toBe("https://www.libertarios.eu/es?utm_source=x&utm_campaign=29n");
  });

  it("no cuenta el panel de administración", () => {
    expect(stripPrivateUrl("https://www.libertarios.eu/admin/afinidad")).toBeNull();
    expect(stripPrivateUrl("https://www.libertarios.eu/administracion")).not.toBeNull();
  });
});
