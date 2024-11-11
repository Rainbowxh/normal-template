<template>
  <div class="low-container" ref="containerRef">
    <div class="low-container-left">
      <Templates />
    </div>
    <div class="low-container-center">
      <Preview />
    </div>
    <div class="low-container-right">
      <Operator />
    </div>
  </div>
</template>

<script setup lang="ts">
// templates
import Operator from './operator.vue';
import { Templates } from './templates/index.tsx';
import { Preview } from './preview/preview.tsx';


// import from vue
import { ref, onMounted } from 'vue';

import { useDataStore } from './pinia/data.pinia';
import { EnumRefs } from './pinia/data.pinia';

const dataStore = useDataStore();

const containerRef = ref(null);

onMounted(() => {
  dataStore.refs.container = containerRef.value;
});

</script>

<style scoped>
.low-container {
  position: relative;
  border: 1px solid red;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
}

.low-container-left {
  width: 20%;
  border: 1px solid blue;
}

.low-container-center {
  position: relative;
  width: 60%;
  border: 1px solid green;
}

.low-container-right {
  width: 20%;
  border: 1px solid yellow;
}
</style>
