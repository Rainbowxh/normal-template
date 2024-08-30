<template>
  <div class="container">
    <div class="left">
      <div class="bar-item" @click="onClick">vue1</div>
      <div class="bar-item" @click="onClick">vue2</div>
      <div class="bar-item" @click="onClick">vue3</div>
      <div class="bar-item" @click="onClick">vue4</div>
    </div>
    <div class="right">
      <router-view>
      </router-view>
      <div id="#renderPlace">this is a environment</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
let nowPath = '/a'

const onClick = () => {
  nowPath = nowPath === '/a' ? '/b' : '/a'
  router.replace(nowPath)
}

const listener = (params: any) => {
  const { state } = params
}

window.addEventListener('popstate', listener)




</script>

<style scoped>
.container {
  display: flex;
}

.left {
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 10px;
}

.bar-item {
  background-color: palegoldenrod;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
