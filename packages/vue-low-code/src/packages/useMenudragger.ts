import deepcopy from "deepcopy";
import { events } from "./event";


export function useMenuDragger(data: any, containerRef: any, updateData: any) {
  let currentComponent: any= null

  const dragStart = (e: any, component: any) => {
    // dragenter 进入元素中 添加一个移动表示
    // dragover 在目标元素经过 必须要组织默认行为 否则不能够触发drop
    // dragleave 离开元素的时候 需要增加一个金庸表示
    // drop 松手的时候 根据拖拽的组件添加一个组件
    containerRef.value.addEventListener('dragenter', dragenter)
    containerRef.value.addEventListener('dragover', dragover)
    containerRef.value.addEventListener('dragleave', dragleave)
    containerRef.value.addEventListener('drop', drop)
    currentComponent = component
    events.emit('start')
  };

  const dragenter = (e: any) => {
  }

  const dragover = (e: { preventDefault: () => void; }) => {
    // 默认无法将数据/元素放置到其他元素中。如果需要设置允许放置，就要阻止元素的默认行为。
    e.preventDefault();
  }

  const dragleave = (e: { dataTransfer: { dropEffect: string; }; }) => {
    e.dataTransfer.dropEffect = 'none'
  }

  const drop = (e: { offsetY: any; offsetX: any; }) => {
    // 需要在目标元素监听什么时候放置元素,所以需要drop钩子
    const blocks = data.value.blocks;
    let dataValue = { ...data.value, blocks: [
      ...blocks,
      {
        top: e.offsetY,
        left: e.offsetX,
        type: currentComponent.key,
        alignCenter: true, //渲染的时候居中
      }
    ]}
    updateData(deepcopy(dataValue))
  }

  const dragEnd = () => {
    containerRef.value.removeEventListener('dragenter', dragenter)
    containerRef.value.removeEventListener('dragover', dragover)
    containerRef.value.removeEventListener('dragleave', dragleave)
    containerRef.value.removeEventListener('drop', drop)
    events.emit('end')
  }

  return { 
    dragStart,
    dragEnd
  }
}
