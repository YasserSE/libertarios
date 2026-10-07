// Los tests cubren el boletín activado; en producción depende del despliegue.
process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED = "1";
import "@testing-library/jest-dom";

// Los tests con `@vitest-environment node` (p. ej. la imagen OG) no tienen `window`.
if (typeof window !== "undefined") Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
