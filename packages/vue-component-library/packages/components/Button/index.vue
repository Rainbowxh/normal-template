<template>
  <component :is="dd" />
</template>

<script setup lang="ts">
import { defineComponent, h, ref, watch } from 'vue';
defineOptions({
  name: 'ElButton'
})

const name = ref('dfdf');
const dd = ref();

watch(name, (value) => {
  dd.value = h('div',value)
}, {immediate: true});

setTimeout(() =>  {
  console.log('doing?>>>')
  name.value = '234324423'
},2000)

</script>

<style scoped>

</style>
