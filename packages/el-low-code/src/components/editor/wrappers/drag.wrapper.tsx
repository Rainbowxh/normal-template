import { defineComponent, onBeforeUnmount } from 'vue'

export const DragWrapper = defineComponent({
  props: {
    base: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props: any, { slots }) {
    const { ondragstart, ondragend } = useDraggable()
    return () => {
      return (
        <div draggable onDragstart={ondragstart} onDragend={ondragend}>
          {slots.default?.()}
        </div>
      )
    }
  }
})

export function useDraggable(comp: any) {
  const ondragstart = (e: DragEvent) => {}

  const ondragend = (e: DragEvent) => {}

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
