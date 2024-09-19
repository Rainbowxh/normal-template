import { defineComponent } from 'vue'

export const ButtonWrapper = defineComponent({
  setup(props: any, { slots }) {
    return () => {
      return <el-button {...props}>{slots.default?.()}</el-button>
    }
  }
})
