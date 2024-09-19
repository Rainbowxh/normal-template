import vuePlugin from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve } from "path";
import dtsPlugin from "vite-plugin-dts";

console.log();

export default defineConfig({
  plugins: [
    vuePlugin(),
    dtsPlugin({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "vue-component-library",
      fileName: "index.es",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue", // for umd use;
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as any;
        },
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("packages/utils")) {
            return "utils";
          }
        },
      },
    },
  },
});
