<template>
  <div>
    Hello world11
    <component :is="comp" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as A from "../../vue-component"

const comp = ref('');
async function loadScript() {
  const remoteUrl = 'http://localhost:3150/packages/try-module-federation/remote-comp/remote.js';
  const remoteCss = 'http://localhost:3150/packages/try-module-federation/remote-comp/style.css';
  const link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', remoteCss)
  document.body.append(link)
  const res = await import(remoteUrl)
  comp.value = res.componentA;
}
loadScript();

</script>

<style scoped></style>
