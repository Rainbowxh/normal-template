<template>
  <div class="container">
    <editor></editor>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import jsonData from "./data.json"

import editor from "./packages/editor.jsx"

import { registerConfig as config } from "./utils/editor-config"

const KEY = 'main'

const data = ref(jsonData);
const containerRef = ref();

provide(KEY, { 
  updateData: (v: any) => {
    data.value = v
  },
  data,
  config,
  containerRef,
})

setTimeout(() => {
  console.log(containerRef.value)
})

</script>

<style>
.container {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}


</style>
