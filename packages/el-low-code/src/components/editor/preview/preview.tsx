import { defineComponent, ref } from 'vue'
import './preview.scss'
import { useDataStore } from '../pinia/data.pinia'
import { usePreviewStore } from '../pinia/preview.pinia'
import { storeToRefs } from 'pinia'

export const Preview = defineComponent({
  name: 'Preview',
  setup() {
    const currentPreviewRef = ref()
    const dataStore = useDataStore()
    const previewStore = usePreviewStore()
    let { previewList, currentInstance, currentRef } = storeToRefs(previewStore)

    dataStore.refs.currentPreview = currentPreviewRef
    currentRef.value = currentPreviewRef

    const currentDrag = ref()

    const ondragstart = (e: any) => {
      currentDrag.value = e.target.id
      e.target.style.opacity = 0.3
      e.dataTransfer.setData('text/plain', e.target.id)
    }

    const ondragend = (e: any) => {
      e.target.style.opacity = 1
      console.log('ondragend', e)
    }

    const ondragenter = (e: any) => {
      e.preventDefault()
      console.log('ondragenter', e.target.id)
    }

    const ondragover = (e: any, nowEl: any) => {
      e.preventDefault()
      exchange(currentDrag.value, nowEl);
    }

    const exchange = (a, b) => {
      if(a === b) return;
      const findIndexA = previewList.value.findIndex((item) => item.id === a)
      const findIndexB = previewList.value.findIndex((item) => item.id === b)
      if (findIndexA !== -1 && findIndexB !== -1) {
        const temp = previewList.value[findIndexA]
        previewList.value[findIndexA] = previewList.value[findIndexB];
        previewList.value[findIndexB] = temp
      }
    }

    return () => (
      <div
        class="preview"
        ref={(el) => {
          currentPreviewRef.value = el
        }}
        onClick={() => {}}
      >
        <div>这是表单</div>
        <div onclick={() => { console.log(previewList.value) }}>测试按钮1</div>
        <div>测试按钮2</div>
        <el-form label-width="auto">
          {previewList.value.map((instance: any, index: any) => {
            return (
              <div
                id={instance.id}
                key={instance.id || index}
                draggable
                ondragstart={ondragstart}
                ondragend={ondragend}
                ondragover={(e) => ondragover(e, instance.id)}
                ondragenter={ondragenter}
              >
                <div
                  class={{
                    'preview-status--normal': instance.status === 'normal',
                    'preview-status--selected': instance.status === 'selected'
                  }}
                  onClick={(e: any) => {
                    previewList.value.map((item: any) => {
                      item.status = 'normal'
                    })
                    instance.status = 'selected'
                    currentInstance.value = instance
                  }}
                >
                  <el-form-item label={instance.label}>{instance.render()}</el-form-item>
                </div>
              </div>
            )
          })}
        </el-form>
      </div>
    )
  }
})
