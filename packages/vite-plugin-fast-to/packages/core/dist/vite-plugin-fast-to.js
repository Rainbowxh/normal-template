'use strict';

var compilerDom = require('@vue/compiler-dom');
var MagicString = require('magic-string');

const KEY_PROP = "dev-fast-to";
async function compileSFCTemplate(params) {
    const { code, id } = params;
    const magicS = new MagicString(code);
    const astTree = compilerDom.parse(code, { comments: true });
    const path = id;
    compilerDom.transform(astTree, {
        nodeTransforms: [
            (node, context) => {
                if (node.type === compilerDom.NodeTypes.ELEMENT) {
                    if (["template", "script", "style"].includes(node.tag)) {
                        return;
                    }
                    // 添加slot层级 组件层级添加没有意义，最后会被编译成 element 的形式
                    // if (node.tagType === ElementTypes.COMPONENT) {
                    //   const slot: any = node;
                    //   slot.path = path;
                    //   for (let i = 0; i < node.children.length; i++) {
                    //     //@ts-ignore
                    //     node.children[i].slot = slot;
                    //   }
                    // }
                    if (node.tagType === compilerDom.ElementTypes.ELEMENT) {
                        // let prev = "";
                        // if ((node as any).slot) {
                        //   prev = generateProps("slot", path, node);
                        // }
                        const insertPosition = findInsertPosition(node.tagType, node);
                        const current = generateProps("", path, node);
                        // magicS.prependLeft(insertPosition, current + prev);
                        magicS.prependLeft(insertPosition, current);
                    }
                }
            },
        ],
    });
    return magicS.toString();
}
function generateProps(name, path, node) {
    const { line, column } = node.loc.start;
    // see detail https://github.dev/yyx990803/launch-editor
    {
        return ` ${KEY_PROP}="${path}:${line}:${column}"`;
    }
}
function findInsertPosition(type, node) {
    if (type === compilerDom.ElementTypes.ELEMENT) {
        //获取标签 attrs 的最后一个位置, 不然为标签的后一个位置
        return node.props.length
            ? Math.max(...node.props.map((i) => i.loc.end.offset))
            : node.loc.start.offset + node.tag.length + 1;
    }
    return 0;
}

function parseVueRequest(id) {
    const [filename] = id.split('?', 2);
    // 借用URL方法来生成解析，解析当前vue文件的
    const url = new URL(id, 'http://domain.inspector');
    const query = Object.fromEntries(url.searchParams.entries());
    if (query.vue != null)
        query.vue = true;
    if (query.src != null)
        query.src = true;
    if (query.index != null)
        query.index = Number(query.index);
    if (query.raw != null)
        query.raw = true;
    if (query.hasOwnProperty('lang.tsx') || query.hasOwnProperty('lang.jsx'))
        query.isJsx = true;
    return {
        filename,
        query,
    };
}

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
            buildStart() {
              console.log('start')
            },
            buildEnd() {
              console.log('end')
            },
            apply(_, config) {
                /**
                 * 决定什么时候开启
                 * 仅仅在serve端开启 vite --mode serve-dev --host
                 */
                const { command } = config;
                return command === "serve";
            },
            async resolveId(id) {
                /**
                 * 能够标记特殊内容， 用于后序load的处理
                 * 在这里可以替换一些图标/图片的地址
                 * 需要在pre阶段进行处理, post 阶段应该对图片进行了相应的转换
                 */
                // console.log(...arguments)
            },
            async load(id) {
                /**
                 * 根据特殊的id 来更改引用的地址
                 *  */
            },
            transform(code, id) {
                const { filename, query } = parseVueRequest(id);
                const isVue = filename.endsWith(".vue") && query.type !== "style" && !query.raw;
                if (isVue) {
                    const result = compileSFCTemplate({ code, id });
                    return result;
                }
                return code;
            },
            configureServer(server) {
                server.openBrowser;
            },
            transformIndexHtml(html) {
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
            apply(_, config) {
                /**
                 * 决定什么时候开启
                 * 仅仅在serve端开启 vite --mode serve-dev --host
                 */
                const { command } = config;
                return command === "serve";
            },
            configResolved(resolvedConfig) {
                // 存储最终解析的配置
                finalConfig = resolvedConfig;
                console.log(finalConfig);
            },
            transformIndexHtml(html) {
                const port = finalConfig.server.port;
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
              target = target.parentNode
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
      `;
                html = html.replace('</head>', `${htmlString}</head>`);
                return html;
            }
        },
    ];
}

module.exports = vitePluginFastTo;
