import { defineComponent, onMounted, Ref, toRef } from 'vue'
import { useDataStore } from '../pinia/data.pinia'
import { usePreviewStore } from '../pinia/preview.pinia'

export type Operator = {
  ondragstart?: (operator: any) => void
  ondragend?: (operator: any) => void
  ondragleave?: (operator: any) => void
  ondragover?: (operator: any) => void
  ondragenter?: (operator: any) => void
  ondrop?: (operator: any) => void
}

export const DragWrapper = defineComponent({
  props: {
    operator: {
      type: Object,
      default: () => ({})
    },
    component: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props: any, { slots }) {
    const dataStore = useDataStore()

    const currentPreview = toRef(dataStore.refs, 'currentPreview')

    const { ondragstart, ondragend } = useDraggable(props.component, currentPreview , props.operator)

    return () => {
      return (
        <div draggable onDragstart={ondragstart} onDragend={ondragend}>
          {slots.default?.()}
        </div>
      )
    }
  }
})

export function useDraggable(comp: any, target: Ref<HTMLElement> ,operator: Operator) {
  let removeEventListener: any = null;

  const ondragstart = (e: DragEvent) => {
    // 记录当前操作对象
    removeEventListener = addDragEvent(target.value)
  }

  const ondragend = (e: DragEvent) => {
    // 将当前操作对象放入预览列表
    removeEventListener();
  }

  const addDragEvent = (container: HTMLElement) => {
    if (!container) return
    const ondragenter = (e: DragEvent) => {
      e.preventDefault()
    }

    const ondragleave = (e: DragEvent) => {
      e.preventDefault()
    }

    const ondragover = (e: DragEvent) => {
      e.preventDefault()
    }

    const ondrop = (e: DragEvent) => {
      operator.ondrop?.(comp)
      e.preventDefault()
    }

    container.addEventListener('dragenter', ondragenter)
    container.addEventListener('dragleave', ondragleave)
    container.addEventListener('dragover', ondragover)
    container.addEventListener('drop', ondrop)

    return () => {
      container.removeEventListener('dragenter', ondragenter)
      container.removeEventListener('dragleave', ondragleave)
      container.removeEventListener('dragover', ondragover)
      container.removeEventListener('drop', ondrop)
    }
  }

  return {
    ondragstart,
    ondragend
  }
}
