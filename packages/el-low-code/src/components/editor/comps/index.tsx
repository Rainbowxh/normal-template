import { reactive, VNode } from 'vue'
import { ButtonWrapper, DragWrapper } from '../wrappers'

export enum CompName {
  Text = 'Text',
  Tag = 'Tag',
  Image = 'Image',
  Input = 'Input',
  Radio =  'Radio',
  Select = 'Select',
  Upload = 'upload',
}

type Comp = {
  name: string
  defaultProps: {}
  preview: () => VNode
  render: (props: any) => VNode
  linkRule?: () => {},
  requireRule?: () => {}
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
  preview: () => {
    return (
      <ButtonWrapper>
        <div>{CompName.Text}</div>
      </ButtonWrapper>
    )
  },
  render: (props: any) => <div>{ props.content }</div>
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
  render: (props: any) => <div>{ props.content }</div>
})


comps.register({
  name: CompName.Input,
  defaultProps: {
    style: "width: 240px",
    placeholder: '这是内容'
  },
  preview: () => {
    return (
      <ButtonWrapper draggable="true">
        <div>{CompName.Input}</div>
      </ButtonWrapper>
    )
  },
  render: (props: any) => {
    return <el-input style={props.style} placeholder={props.placeholder}></el-input>
  }
})


comps.register({
  name: CompName.Select,
  defaultProps: {
    style: "width: 240px",
    placeholder: '这是内容',
    options: [
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
    ]
  },
  preview: () => {
    return (
      <ButtonWrapper draggable="true">
        <div>{CompName.Select}</div>
      </ButtonWrapper>
    )
  },
  render: (props: any) => {
    return (
      <el-select style={props.style}>
        {props.options.map(opt => <el-option label={opt.label} value={opt.value}></el-option>)}
      </el-select>
    )
  }
})

