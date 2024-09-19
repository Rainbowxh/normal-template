import { defineStore } from 'pinia'
import { reactive, ref, shallowReadonly, type VNodeRef } from 'vue'
import { comps } from '@/components/editor/comps/index'

export enum EnumRefs {
  container = 'container'
}

export const useDataStore = defineStore('data', () => {
  // everythings in refs are refs
  const refs = reactive<Record<EnumRefs, null | VNodeRef>>({
    container: null
  })

  const registerRef = (name: EnumRefs, ref: null | VNodeRef) => {
    refs[name] = ref
  }

  return {
    refs: shallowReadonly(refs), // prevent reactive object from being changed
    comps,
    registerRef
  }
})
