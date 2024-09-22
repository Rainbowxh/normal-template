<template>
  <div @click="onclick">
    这里是操作属性
  </div>
</template>

<script setup lang="ts">
import { onMounted, onActivated } from 'vue';
import { useDataStore } from './pinia/data.pinia';


defineOptions({
  name: 'operator'
})

const onclick = () => {}

</script>

<style scoped></style>
