import { computed, defineComponent } from "vue";

import { ElInput } from "element-plus";
import { inject, ref, onMounted } from "vue";

import deepcopy from "deepcopy";

import { useMenuDragger } from "./useMenuDragger" 

export default defineComponent({
  props: {},
  setup(props) {
    const { data, config = {}, containerRef, updateData } = inject("main");

    const components = config.componentList;

    // 1. 实现菜单 => 功能区域的拖拽
    const { dragStart, dragEnd } = useMenuDragger(data, containerRef, updateData)

    return () => {
      return (
        <div class="editor-menu">
          {components.map((component) => {
            return (
              <div
                class="editor-menu-item"
                draggable
                onDragstart={(e) => dragStart(e, component)}
                onDragend={(e) => dragEnd(e, component)}
              >
                <span>{component.label}</span>
                {component.render()}
              </div>
            );
          })}
        </div>
      );
    };
  },
});
