import { ElButton, ElInput } from "element-plus"
// 列表区 可以显示所有的物料
// key 对应的组件映射关系

type Component = any

function createEditorConfig() {
  const componentList: Component[] = []
  const componentMap: Record<string, Component> = {}

  return {
    register: (component: Component) => {
      const { key } = component;
      if(!componentMap[key]) {
        componentList.push(component)
        componentMap[key] = component
      }
    },
    componentMap,
    componentList
  }
}

export const registerConfig = createEditorConfig();

registerConfig.register({
  key: 'text',
  label: '文本',
  preview: () => "渲染的文本",
  render: () => '渲染的文本',
})

registerConfig.register({
  key: 'input',
  label: '输入',
  preview: () => <ElInput placeholder="预览输入"></ElInput>,
  render: () => <ElInput  placeholder="渲染输入"></ElInput>,
})

registerConfig.register({
  key: 'button',
  label: '按钮',
  preview: () => <ElButton>预览按钮</ElButton>,
  render: () => <ElButton>渲染按钮</ElButton>,
})



