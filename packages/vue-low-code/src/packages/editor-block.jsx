import { computed, defineComponent } from "vue"

import { ElInput } from "element-plus"
import { inject, ref, onMounted } from "vue"

export default defineComponent({
  props: {
    block: {
      type: Object
    }
  },
  setup(props) {
    const { config = {} } = inject('main')
    const { type, top, left, alignCenter } = props.block;
    const blockRef = ref(null);

    const blockStyles = computed(() => {
      const result =  {
        transform: `translate(${props.block.left}px, ${props.block.top}px)`,
        zIndex: props.block.zIndex,
      }
      return result
    })

    const component = config.componentMap[type]
    const RenderComponent = component.render();
    
    onMounted(() => {
      const { offsetWidth, offsetHeight } = blockRef.value;
      props.block.ref = blockRef
      if(alignCenter) { // 说明是拖拽松手的时候才渲染
        props.block.left = props.block.left - offsetWidth / 2 
        props.block.top = props.block.top - offsetHeight / 2 
        props.block.alignCenter = false;
      }
      props.block.width = offsetWidth
      props.block.height = offsetHeight
    })

    return () => {
      return <div class='editor-block' style={blockStyles.value} ref={blockRef}>
        { RenderComponent }
      </div>
    }
  }
})
