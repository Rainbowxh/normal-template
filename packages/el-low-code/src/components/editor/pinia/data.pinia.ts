import { defineStore } from 'pinia'
import { reactive, ref, shallowReadonly, toRaw, toRefs, type VNodeRef } from 'vue'
import { comps } from '@/components/editor/comps/index'

export enum EnumRefs {
  container = 'container',
  currentPreview = 'currentPreview'
}

export const useDataStore = defineStore('data', () => {
  // everything in refs are refs
  const refs = reactive<Record<any, any>>({
    container: null,
    currentPreview: null,
  })

  return {
    refs, // prevent reactive object from being changed
    comps,
  }
})
