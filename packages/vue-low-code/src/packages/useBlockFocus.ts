import { AnyColumn } from "element-plus/es/components/table-v2/src/common";
import { computed, ref } from "vue";

export function useBlockFocus(data: any, callback: any) {
  const selectIndex = ref(-1); // 表示没有任何一个被选中

  const lastSelectBlock = computed(() =>  data.value.blocks[selectIndex.value])

  const focusData = computed(() => {
    let focus: any = []
    let unFocus: any[] = []
    data.value.blocks.forEach((block: { focus: any; }) => {
      block.focus ? focus.push(block) : unFocus.push(block)
    })
    return { focus, unFocus }
  })

  const clearBlockFocus = () => {
    data.value.blocks.forEach((block: { focus: boolean; }) => block.focus = false)
  }

  // 点击选中,shift点击选中
  const blockMousedown = (e: any, block: AnyColumn, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    // block上我们规划一个属性 focus, 获取交代你后将focuse变为true
    if(e.shiftKey) {
      if(focusData.value.focus.length <= 1) {
        block.focus = true; // 当前只有一个节点被选中的时候
      }else {
        block.focus = !block.focus;
      }
      block.focus = true;
    }else if(!block.focus) {
      //需要清空其他的focus
      clearBlockFocus();
      block.focus = true;
      block.zIndex = 1000;
    }
    selectIndex.value = index
    // 当我按下的时候就开始记录
    callback(e)
  }
  
  const containerMousedown = () => {
    selectIndex.value = -1
    clearBlockFocus()
  }

  return {
    containerMousedown,
    blockMousedown,
    focusData,
    lastSelectBlock,
  }
}
