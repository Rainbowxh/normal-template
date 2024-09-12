import { compileSFCTemplate } from "./compiler/template";
import { parseVueRequest } from "./utils";
import { resolveConfig, ViteDevServer } from "vite";

function vitePluginFastTo() {
  console.log("doing???");
  /**
   * 以下的钩子会交替执行
   * resloveId: 1
   * resloveId: 2
   * load: 1
   * load: 2
   * transform: 1
   * transform: 2
   */

  let finalConfig = null;

  return [
    {
      name: "vite-plugin-fast-to",
      enforce: "pre",
      apply(_: any, config: { command: any }) {
        /**
         * 决定什么时候开启
         * 仅仅在serve端开启 vite --mode serve-dev --host
         */
        const { command } = config;
        return command === "serve";
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
      transform(code: any, id: string) {
        const { filename, query } = parseVueRequest(id);
        const isVue =
          filename.endsWith(".vue") && query.type !== "style" && !query.raw;
        if (isVue) {
          const result = compileSFCTemplate({ code, id });
          return result;
        }
        return code;
      },
      configureServer(server: ViteDevServer) {
        server.openBrowser;
      },
      transformIndexHtml(html: any) {
      },
      configResolved() {
        // console.log('config',name)
      },
      async generateBundle() {
        console.log("generate");
      },

      async closeBundle() {
        console.log("close");
      },
    },

    {
      name: "vite-plugin-fast-to:post",
      enforce: "post",
      apply(_: any, config: { command: any }) {
        /**
         * 决定什么时候开启
         * 仅仅在serve端开启 vite --mode serve-dev --host
         */
        const { command } = config;
        return command === "serve";
      },
      buildStart() {
        console.log("======================")
      },
      buildEnd() {
        console.log("----------------------")
      },
      configResolved(resolvedConfig) {
        // 存储最终解析的配置
        finalConfig = resolvedConfig;
      },
      transformIndexHtml(html: any) {
        const port = finalConfig.server.port
        const htmlString = `
        <style>
          .vite-fast-to-mask { position: relative; }
          .vite-fast-to-mask::after { pointer-events: none; position: absolute; content: ''; left: -1px; right: -1px;bottom: -1px;top: -1px; border: 1px solid silver; background-color: rgba(192,192,192,.3); z-index: 10000; }
        </style>
        <script>
          const findRecentNode = (node) => {
            let target = node
            let maxCount = 3;
            while (target && maxCount > 0) {
              const path =
                target.attributes && target.attributes['dev-fast-to'] && target.attributes['dev-fast-to'].nodeValue
              if (path) {
                return {
                  target,
                  path
                }
              }
              target = node.parent
              maxCount--
            }
            return {}
          }
          const init = () => {
            const event = (e) => {
              const { metaKey, target } = e
              if (metaKey) {
                const path = findRecentNode(target).path
                if (path) {
                  console.log('http://localhost:${port}/__open-in-editor?file=' + path)
                  fetch('http://localhost:${port}/__open-in-editor?file=' + path)
                }
                e.preventDefault()
                e.stopPropagation()
              }
            }
            window.addEventListener('click', event, { capture: true })
            const state = {
              key: '',
              prev: null,
            }
            const onkeydown = (e) => {
              const { key } = e; 
              state.key = key;
              if(key === 'Meta') {
                window.addEventListener('mousemove', onMousemove)
              }
            }
            const onkeyup = (e) => {
              state.key = ''
              window.removeEventListener('mousemove', onMousemove)
              if(state.prev) {
                state.prev.classList.remove('vite-fast-to-mask');
              }
            }
            const onMousemove = (e) => {
              const target = findRecentNode(e.target).target;
              if(!target) return;
              // 为了性能控考虑
              if(target && target === state.prev) {
                return;              
              }
              if(state.prev) {
                state.prev.classList.remove('vite-fast-to-mask');
              }
              target.classList.add('vite-fast-to-mask')
              state.prev = target
            }
            window.addEventListener('keydown', onkeydown, true)
            window.addEventListener('keyup', onkeyup, true)
            return () => window.removeEventListener('click', event)
          }
          const unmount = init()
        </script>
      `
        html = html.replace('</head>', `${htmlString}</head>`);

        return html
      }
    },

    {
      name: "vite:vite-plugin-fast-to-end:post",
      enforce: "post",
      buildStart() {
        console.log("======================")
      },
      buildEnd() {
        console.log("----------------------")
      },
    },
  ];
}
export default vitePluginFastTo;
