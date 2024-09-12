<template>
  <div>
    {{ store.count }}
    <div @click="onClick">add</div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, inject } from 'vue';
import { useCounterStore2 } from './stores';
import { PiniaSymbol } from './pinia/rootState';

const store = useCounterStore2();
const _p = inject(PiniaSymbol)

store.increment();

const onClick = () => { 
  store.increment(store.double)
  console.log(ins?.appContext.config.globalProperties.$pinia.state.value)
}

store.$patch(() => {
})

const ins = getCurrentInstance();



</script>

<style scoped>

</style>
