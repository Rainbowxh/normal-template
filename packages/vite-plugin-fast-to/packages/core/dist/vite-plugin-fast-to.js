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
                    // 添加slot层级
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
    return [
        {
            name: 'vite-plugin-fast-to',
            enforce: 'pre',
            apply(_, config) {
                /**
                 * 决定什么时候开启
                 * 仅仅在serve端开启 vite --mode serve-dev --host
                 */
                const { command } = config;
                return command === 'serve';
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
                // console.log(id)
                const { filename, query } = parseVueRequest(id);
                const isVue = filename.endsWith('.vue') && query.type !== 'style' && !query.raw;
                if (isVue) {
                    const result = compileSFCTemplate({ code, id });
                    return result;
                }
                return code;
            },
            configureServer(server) {
                console.log(server.printUrls);
                server.openBrowser;
            },
            transformIndexHtml(html) {
                console.log('transformIndexHtml', html);
            },
            configResolved() {
                // console.log('config',name)
            },
            async generateBundle() {
                console.log('generate');
            },
            async closeBundle() {
                console.log('close');
            }
        }
    ];
}

module.exports = vitePluginFastTo;
