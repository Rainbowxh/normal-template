import { compileSFCTemplate } from "./compiler/template";
import { parseVueRequest } from "./utils";
import {  defineConfig, ViteDevServer } from "vite";
function vitePluginCdn(config: {
  vue: {},
}) {
  let _config = null;
  return [
    {
      name: "vite-plugin-cdn",
      enforce: "post",
      buildStart() {
        console.log("======================")
      },
      apply(_: any, config: { command: any }) {
        const { command } = config;
        return command === "build";
      },
      config(originConfig)  {
        // 获取用户的原始配置
      },
      configResolved(resolvedConfig) {
        // 获取最终的配置
        _config = resolvedConfig
      },
      async resolveId(id: any) {
        /**
         * 能够标记特殊内容， 用于后序load的处理
         * 在这里可以替换一些图标/图片的地址
         * 需要在pre阶段进行处理, post 阶段应该对图片进行了相应的转换
         */
      },
      async load(id: any) {
        /**
         * 根据特殊的id 来更改引用的地址
         *  */
      },
      transform(code: any, id: string) {
        const ast = this.parse(code);
        console.log("------------", ast)
      },
      transformIndexHtml(html: any) {
      },
      async generateBundle() {
        console.log("generate");
      },
      async closeBundle() {
        console.log("close");
      },

      buildEnd() {
        console.log("++++++++++++++++++++++")
      },
    },

  ];
}
export default vitePluginCdn;
