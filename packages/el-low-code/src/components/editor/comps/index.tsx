import { reactive, VNode } from 'vue'
import { DecorationButton } from './decoration-button'
import { ButtonWrapper, DragWrapper } from '../wrappers'

export enum CompName {
  Text = 'Text',
  Tag = 'Tag',
  Image = 'Image'
}

type Comp = {
  name: string
  defaultProps: {}
  preview: () => VNode
  render: () => VNode
}

function createConfigs() {
  const componentList: Comp[] = []
  const componentMap = new Map()

  const register = (comp: Comp) => {
    const { name } = reactive(comp)

    if (componentMap.has(name)) {
      console.warn('Component Name has been registered!')
      return
    }
    componentList.push(comp)
    componentMap.set(name, comp)
  }

  return {
    register,
    componentList,
    componentMap
  }
}

export const comps = createConfigs()

comps.register({
  name: CompName.Text,
  defaultProps: {},
  preview: (component) => {
    return (
      <ButtonWrapper>
        <div>{CompName.Text}</div>
      </ButtonWrapper>
    )
  },
  render: () => <div>Text</div>
})

comps.register({
  name: CompName.Tag,
  defaultProps: {},
  preview: () => {
    return (
      <ButtonWrapper draggable="true">
        <div>{CompName.Tag}</div>
      </ButtonWrapper>
    )
  },
  render: () => <div>Tag</div>
})
