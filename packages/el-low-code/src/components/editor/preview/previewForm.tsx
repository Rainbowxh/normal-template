import { defineComponent, h, ref } from 'vue'
import { compile } from '@vue/compiler-dom'

export const PreviewForm = defineComponent({
  name: 'Preview',
  setup() {
    const form = ref({
      name: '123'
    })

    const vnodeStr = `      h('div', { class: 'dynamic' }, [
        h('p', {}, 'This is a dynamically generated VNode'),
        h('span', {}, 'Powered by eval')
      ])`

    const generateVNode = (str: string) => {
      const func = new Function('h', str)
      const result = func(h)
      console.log(result)
    }

    return () => {
      return (
        <el-form model={form.value} style="width: 400px;">
          {generateVNode(vnodeStr)}
        </el-form>
      )
    }
  }
})
