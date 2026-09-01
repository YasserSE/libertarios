import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  // JSX is transformed by esbuild using the tsconfig's react-jsx setting; no
  // Vite React plugin needed (the old @vitejs/plugin-react-swc import was a
  // leftover from the pre-Next.js setup and was never in package.json).
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
