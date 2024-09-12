import { defineStore } from "../pinia/index"
import { computed, ref } from "vue"


export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  getters: {
    double() {
      return this.count *= 2
    }
  },
  actions: {
    increment() {
      this.count++
    }
  },
})


export const useCounterStore2 = defineStore('main', () => {
  const count = ref(0)

  const double = computed(() => count.value * 2)
  
  const increment = () => {
    count.value = count.value + 1;
  }

  return {
    count,
    double,
    increment
  }
})
