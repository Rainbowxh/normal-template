import { defineComponent, h } from 'vue'
import { PreviewForm } from './previewForm'
import './preview.scss'

export const Preview = defineComponent({
  name: 'Preview',
  setup() {
    return () => <div class="preview"></div>
  }
})
