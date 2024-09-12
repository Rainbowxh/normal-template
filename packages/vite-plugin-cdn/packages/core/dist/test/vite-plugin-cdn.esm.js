// src/index.ts
function vitePluginCdn(config) {
  let _config = null;
  return [
    {
      name: "vite-plugin-cdn",
      enforce: "post",
      buildStart() {
        console.log("======================");
      },
      apply(_, config2) {
        const { command } = config2;
        return command === "build";
      },
      config(originConfig) {
      },
      configResolved(resolvedConfig) {
        _config = resolvedConfig;
      },
      async resolveId(id) {
      },
      async load(id) {
      },
      transform(code, id) {
        const ast = this.parse(code);
        console.log("------------", ast);
      },
      transformIndexHtml(html) {
      },
      async generateBundle() {
        console.log("generate");
      },
      async closeBundle() {
        console.log("close");
      },
      buildEnd() {
        console.log("++++++++++++++++++++++");
      }
    }
  ];
}
var src_default = vitePluginCdn;
export {
  src_default as default
};
//# sourceMappingURL=vite-plugin-cdn.esm.js.map
