import { defineComponent, toRefs } from 'vue'
import { useDataStore } from '../pinia/data.pinia'
import './templates.scss'
import { DragWrapper } from '../wrappers'
import { usePreviewStore } from '../pinia/preview.pinia'

export const Templates = defineComponent({
  name: 'templates',
  setup() {
    const store = useDataStore()
    const previewStore = usePreviewStore()
    const comps = store.comps

    return () => {
      return (
        <div class="templates">
          <div>操作栏</div>
          <div class="flex-row gap-medium">
            {comps.componentList.map((component: any) => {
              return <DragWrapper component={component} operator={{
                ondrop: (comp: any) => {
                  previewStore.addPreview(comp)
                }
              }}>{component.preview()}</DragWrapper>
            })}
          </div>
        </div>
      )
    }
  }
})
