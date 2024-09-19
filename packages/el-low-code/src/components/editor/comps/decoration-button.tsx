import { defineComponent, h } from 'vue'

export const DecorationButton = defineComponent({
  setup(props, { slots }) {
    console.log(slots)

    return () => {
      return h('div', {}, [slots.default?.()])
    }
  }
})
