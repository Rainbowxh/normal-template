<template>
  <div>
    <div @click="onClick">add</div>
    <test></test>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, toRef, toRefs, watch } from 'vue';
import { defineStore,PiniaSymbol } from './pinia/index1';
import test from "./test"



// import { getCurrentInstance, inject } from 'vue';
// import { useCounterStore2 } from './stores';
// import { PiniaSymbol } from './pinia/rootState';

// const store = useCounterStore2();
// const _p = inject(PiniaSymbol)

// store.increment();

// const onClick = () => { 
//   store.increment(store.double)
//   console.log(ins?.appContext.config.globalProperties.$pinia.state.value)
// }

// store.$patch(() => {
// })

// const ins = getCurrentInstance();
const pinia: any = inject(PiniaSymbol);


const onClick = () => {}

const useStore = defineStore('name', {
  state: () => ({ count: '123' })
});

const t = useStore();

console.log(pinia.state.value, t)

pinia.state.value['name'].count += 3

console.log(pinia.state.value, t)

const abc = { name: '这是测试' }

const re = toRefs(abc)

console.log(re)




</script>

<style scoped>

</style>
