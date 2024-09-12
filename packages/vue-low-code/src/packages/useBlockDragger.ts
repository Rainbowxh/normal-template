import { reactive } from "vue";
import { events } from "./event"
export function useBlockDragger(data: any, lastSelectBlock: any ,container: any) {
  let dragState: any = {
    startX: 0, //元素起始位置 距离窗口 clientX
    startY: 0, //元素起始位置 距离窗口 clientY
    startLeft: 0, //最后被选中元素的位置 距离可功能区
    startTop: 0, //最后被选中元素的位置  距离可功能区
    startPos: [],
  };

  let markLine = reactive({
    x: 0,
    y: 0,
    dragging: false, // 默认不是正在拖拽
  })

  const mousemove = (e: any) => {
    let { clientX: moveX, clientY: moveY } = e;

    if(!dragState.dragging) {
      dragState.dragging = true;
      events.emit('start');
    }

    // 计算当前元素最新的 left top 的值
    // 鼠标移动后 - 鼠标移动前 + left
    const left = moveX - dragState.startX + dragState.startLeft
    const top = moveY - dragState.startY + dragState.startTop

    // 计算相应横线， 距离参照物还有5px时候,显示这跟线
    let y = null;
    let x = null
    for(let i = 0; i < dragState.lines.y.length; i++) {
      const { top: t, showTop: st } = dragState.lines.y[i];
      if(Math.abs(t - top) < 5) {
        y = st;
        // 快速贴边
        // moveY = dragState.startY - dragState.startTop + t
        moveY = moveY + (t - top)
        break; // 找到一根线后,则结束
      }
    }
    // 计算相应纵线， 距离参照物还有5px时候,显示这跟线
    for(let i = 0; i < dragState.lines.x.length; i++) {
      const { left: l, showLeft: sl } = dragState.lines.x[i];
      if(Math.abs(l - left) < 10) {
        x = sl;
        // 快速贴边
        // moveY = dragState.startY - dragState.startTop + t
        moveX = moveX + (l - left)
        break; // 找到一根线后,则结束
      }
    }

    markLine.x = x;
    markLine.y = y

    const durX = moveX - dragState.startX;
    const durY = moveY - dragState.startY;

    data.value.focus.forEach((block: any, index: string | number) => {
      block.top = dragState.startPos[index].top + durY;
      block.left = dragState.startPos[index].left + durX;
    });
  };

  const mousedown = (e: { clientX: any; clientY: any }) => {
    const { width: BWidth, height: BHeight } = lastSelectBlock.value;

    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: lastSelectBlock.value.left, //开始B节点拖拽前位置
      startTop: lastSelectBlock.value.top, //开始B节点拖拽前位置
      startPos: data.value.focus.map((p: any) => ({
        top: p.top,
        left: p.left,
      })),
      dragging: false,
      lines: (() => {
        const { unFocus: unfocused } = data.value;

        // y y => top 横线出现的位置； x x => let 纵线出现的位置
        /**
         * 
         */
        let lines: any = {
          x: [],
          y: [],
        };

        [...unfocused, {top: 0, left: 0, width: container.width, height: container.height }].forEach((block: any) => {
          const {
            top: ATop,
            left: ALeft,
            width: AWidth,
            height: AHeight,
          } = block;
          //A顶 -> B顶  当子元素拖拽到和A元素top一致的时候，要根据这跟辅助线的位置，ATop
          // showTop 之前元素线所在的位置 top b元素所在的位置
          lines.y.push({ showTop: ATop, top: ATop })
          //A顶 -> B底部
          lines.y.push({ showTop: ATop, top: ATop - BHeight })
          //A中 -> B中
          lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - BHeight / 2});
          //A底 -> B顶
          lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight });
          //A底 -> B底
          lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - BHeight });
          //A左 -> B左
          lines.x.push({ showLeft: ALeft, left: ALeft });
          //A右 -> B左
          lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth });
          //A中 -> B中
          lines.x.push({ showLeft: ALeft + AWidth / 2  , left: ALeft  + AWidth / 2  - BWidth / 2});
          //A左 -> B右
          lines.x.push({ showLeft: ALeft, left: ALeft - BWidth });
          //A右 -> B右
          lines.x.push({ showLeft: ALeft + AWidth  , left: ALeft  + AWidth - BWidth});
        
        
        });

        return lines
      })(),
    };
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };

  const mouseup = () => {
    markLine.x = 0;
    markLine.y = 0
    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("mouseup", mouseup);
    if(dragState.dragging) {
      events.emit('end')
    }
  };

  return {
    mousedown,
    markLine
  };
}
