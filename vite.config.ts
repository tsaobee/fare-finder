import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// Plain Vite + React single-page app. Build output is a static SPA in dist/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
  },
  // Some auto-generated integration files reference `process.env` as an SSR
  // fallback. In a static SPA there is no Node process, so shim it to an empty
  // object — the `import.meta.env.VITE_*` values are what actually get used.
  define: {
    "process.env": {},
  },
});
