import {
  parse,
  transform,
  NodeTypes,
  ElementTypes,
  TemplateChildNode,
} from "@vue/compiler-dom";
import MagicString from "magic-string";

const KEY_PROP = "dev-fast-to";

export async function compileSFCTemplate(params: any) {
  const { code, id } = params
  const magicS = new MagicString(code);
  const astTree = parse(code, { comments: true });
  const path = id;

  transform(astTree, {
    nodeTransforms: [
      (node, context) => {
        if (node.type === NodeTypes.ELEMENT) {
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
          if (node.tagType === ElementTypes.ELEMENT) {
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

function generateProps(name: string, path: string, node: TemplateChildNode) {
  const { line, column } = node.loc.start;
  // see detail https://github.dev/yyx990803/launch-editor
  if(name) {
    return ` ${KEY_PROP}-${name}="${path}:${line}:${column}"`;
  }else {
    return ` ${KEY_PROP}="${path}:${line}:${column}"`;
  }
}

function findInsertPosition(type: ElementTypes, node) {
  if (type === ElementTypes.ELEMENT) {
    return node.props.length
      ? Math.max(...node.props.map((i) => i.loc.end.offset))
      : node.loc.start.offset + node.tag.length + 1;
  }
  return 0;
}
