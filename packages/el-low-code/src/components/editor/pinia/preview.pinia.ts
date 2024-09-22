import deepcopy from "deepcopy";
import { defineStore } from "pinia";
import { defineComponent, h, reactive, ref } from "vue";




export const usePreviewStore = defineStore('preview',() => {
  const currentRef = ref(null);
  const previewList  = ref<any>([]);

  
  function newInstanceFromComp(comp: any) {

    const props = reactive({
      content: '测试以下' 
    })

    Object.assign(props, comp.defaultProps || {})

    const instance = reactive({
      origin: comp,
      props: props,
      render: (function() {
        return () => comp.render(props)
      })()
    })

    return instance
  }

  const addPreview = (comp: any) => {
    const newInstance = newInstanceFromComp(comp)

    previewList.value.push(newInstance);

    return newInstance;
  }

  return {
    currentRef,
    previewList,
    addPreview
  }
})
