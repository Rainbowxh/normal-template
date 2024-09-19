import { defineComponent, toRefs } from 'vue'
import { useDataStore } from '../pinia/data.pinia'
import './templates.scss'
import { DragWrapper } from '../wrappers'

export const Templates = defineComponent({
  name: 'templates',
  setup() {
    const store = useDataStore()

    const comps = store.comps

    return () => {
      return (
        <div class="templates">
          {comps.componentList.map((item) => {
            return <DragWrapper>{item.preview()}</DragWrapper>
          })}
        </div>
      )
    }
  }
})
