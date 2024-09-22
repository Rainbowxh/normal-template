import { defineComponent, onMounted, ref } from 'vue'
import './preview.scss'
import { EnumRefs, useDataStore } from '../pinia/data.pinia'
import { usePreviewStore } from '../pinia/preview.pinia'
import { DragWrapper } from '../wrappers'

export const Preview = defineComponent({
  name: 'Preview',
  setup() {
    const currentPreviewRef = ref()

    const dataStore = useDataStore()

    const { previewList } = usePreviewStore()

    dataStore.refs.currentPreview = currentPreviewRef
    previewList.currentRef = currentPreviewRef

    return () => (
      <div
        class="preview"
        ref={(el) => {
          currentPreviewRef.value = el
        }}
        onClick={() => {}}
      >
        <div>这是表单</div>
        <el-form>
          {previewList.map((instance: any, index: any) => {
            return (
              <div
                class={{
                  ['preview-status--selected']: instance.status === 'selected'
                }}
                onClick={(e: any) => {
                  previewList.map((item: any) => { item.status = 'normal'})
                  instance.status = 'selected'
                  instance.props.content = '123123213'
                }}
              >
                  <el-form-item label={'123'}>
                    {instance.render()}
                  </el-form-item>
              </div>
            )
          })}
        </el-form>
      </div>
    )
  }
})
