<template>
  <div>
    {{ name.obj }}
  </div>
</template>

<script setup lang="ts">

import('http://localhost:3150/test.js').then((res) => {
  console.log(res)
})

const prop = defineProps({
  name: {
    type: Object,
    default: ''
  }
})

setTimeout(() => {
  prop.name.obj = '123444'
},2000)


</script>

<style scoped>

</style>
