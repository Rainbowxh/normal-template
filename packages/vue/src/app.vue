<template>
  <div>
    {{ name.obj }}
    <test :name="name"></test>
  </div>
</template>

<script setup lang="ts">
import test from "./test.vue"
import { ref } from 'vue';
const name = ref({ obj: '123' });


</script>

<style scoped>

</style>
