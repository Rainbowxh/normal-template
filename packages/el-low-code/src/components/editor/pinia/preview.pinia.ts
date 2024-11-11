import { defineStore } from "pinia";
import { reactive, ref } from "vue";
/**
 * type: input
 * id: 
 * label: ""
 * origin: ""
 * 
 * props: {}
 * formInfo: {}
 * style: {}
 * render: (props ) => {}
 * 
 */


export const usePreviewStore = defineStore('preview',() => {
  const currentRef = ref(null);
  const currentInstance = ref(null);

  const previewList  = ref<any>([]);
  const addPreview = (comp: any) => {
    const newInstance = newInstanceFromComp(comp)
    previewList.value.push(newInstance);
    return newInstance;
  }

  return {
    currentRef,
    currentInstance,
    previewList,
    addPreview
  }
})

function newInstanceFromComp(comp: any) {
  const id = generateInstanceId();
  const basic = {
    type: comp.name,
    id,
    label: "默认名字",
    origin: comp,
    props: {
      ...comp.defaultProps,
      content: '测试以下' + id 
    },
    formInfo: {},
    render: (props: any) => {
      return comp.render(Object.assign(instance.props, props))
    }
  }

  console.log('basic', basic)
  const instance = reactive(basic);
  return instance
}

function generateInstanceId() {
  const prefix = 'comp_';
  const timestamp = new Date().getTime();
  const hex = timestamp.toString(16);
  return prefix + hex;
}
