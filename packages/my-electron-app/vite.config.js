import vuePlugin from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import path from "path";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.join(__dirname, "src", "render"),
  server: {
    port: 3154,
    cors: true,
  },
  build: {
    outDir: path.join(__dirname, "dist", "render"),
    emptyOutDir: true,
  },
  plugins: [vuePlugin()],
});
