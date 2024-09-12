import { defineComponent } from "vue";
import { inject, computed, onMounted, ref } from "vue";
import "./editor.scss";
import EditorBlock from "./editor-block.jsx";
import EditorMenu from "./editor-menu.jsx";
import { useBlockFocus } from "./useBlockFocus";
import { useBlockDragger } from "./useBlockDragger";
import { useCommand } from "./useCommand";

export default defineComponent({
  setup() {
    const { data, containerRef } = inject("main");
    const tRef = ref();
    const containerStyles = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));

    // 2. 获取所有焦点的方法
    const { blockMousedown, focusData, containerMousedown, lastSelectBlock } =
      useBlockFocus(data, (e) => mousedown(e));

    // 3. 拖拽所有被选中的属性
    const { mousedown, markLine } = useBlockDragger(
      focusData,
      lastSelectBlock,
      data.value.container
    );

    const { commands } = useCommand(data);
    const buttons = [
      {
        label: "撤销",
        handler: () => {
          commands.undo();
        },
      },
      {
        label: "重做",
        handler: () => {
          commands.redo();
        },
      },
    ];

    return () => (
      <div class="editor">
        <div class="editor-left">
          <EditorMenu />
        </div>
        <div class="editor-top">
          {buttons.map((btn, index) => {
            return (
              <div class="editor-top-button" onClick={btn.handler}>
                {btn.label}
              </div>
            );
          })}
        </div>
        <div class="editor-right">属性栏</div>
        <div class="editor-container">
          {/* 负责产生滚动条 */}
          <div className="editor-container-canvas">
            {/* 产生内容区域 */}
            <div
              ref={containerRef}
              className="editor-container-canvas_content"
              style={containerStyles.value}
              onMousedown={containerMousedown}
            >
              {data.value.blocks.map((block, index) => (
                <EditorBlock
                  class={block.focus ? "editor-block-focus" : ""}
                  block={block}
                  onMousedown={(e) => blockMousedown(e, block, index)}
                />
              ))}
              {/* 对齐线 */}
              {!!markLine.x && (
                <div
                  class="mark-line-x"
                  style={{ left: markLine.x + "px" }}
                ></div>
              )}
              {!!markLine.y && (
                <div
                  class="mark-line-y"
                  style={{ top: markLine.y + "px" }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
