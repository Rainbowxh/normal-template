import { compileSFCTemplate } from "./compiler/template"
import { parseVueRequest } from "./utils"
import { ViteDevServer } from 'vite'

function vitePluginFastTo() {
  const name = ''
  /**
   * 以下的钩子会交替执行
   * resloveId: 1
   * resloveId: 2
   * load: 1
   * load: 2
   * transform: 1
   * transform: 2
   */
  let count = 0

  return [
    {
    name: 'vite-plugin-fast-to',
    enforce: 'pre',
    apply(_: any, config: { command: any }) {
      /**
       * 决定什么时候开启
       * 仅仅在serve端开启 vite --mode serve-dev --host
       */
      const { command } = config
      return command === 'serve'
    },
    async resolveId(id: any) {
      /**
       * 能够标记特殊内容， 用于后序load的处理
       * 在这里可以替换一些图标/图片的地址
       * 需要在pre阶段进行处理, post 阶段应该对图片进行了相应的转换
       */
      // console.log(...arguments)
    },
    async load(id: any) {
      /**
       * 根据特殊的id 来更改引用的地址
       *  */ 
    },
    transform(code: any ,id: string) {
      // console.log(id)
      const { filename, query } = parseVueRequest(id)
      const isVue = filename.endsWith('.vue') && query.type !== 'style' && !query.raw;
      if(isVue) {
        const result = compileSFCTemplate({ code, id });
        return result
      }
      return code
    },
    configureServer(server: ViteDevServer) {
      console.log(server.printUrls)
      server.openBrowser
    },
    transformIndexHtml(html: any) {
      console.log('transformIndexHtml',html)
    },
    configResolved() {
      // console.log('config',name)
    },
    async generateBundle() {
      console.log('generate')
    },

    async closeBundle() {
      console.log('close')
    }
  }]
}
export default vitePluginFastTo;
