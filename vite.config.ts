import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Repo name = "Cpp" -> GitHub Pages serves it at https://<user>.github.io/Cpp/
// In dev/preview we use "/" so the local server loads at the root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/Cpp/" : "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1200,
  },
}));
