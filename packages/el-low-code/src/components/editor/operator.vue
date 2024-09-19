<template>
  <div @click="onclick">
    this is a test
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineOptions, onActivated } from 'vue';
import { useDataStore } from './pinia/data.pinia';

const store = useDataStore();

defineOptions({
  name: 'operator'
})

const onclick = () => {
}

</script>

<style scoped></style>
