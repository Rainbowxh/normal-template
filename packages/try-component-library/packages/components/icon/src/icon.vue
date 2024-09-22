<template>
  <i :class="bem.b()" :style="style">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { iconProps } from "./icon"
import { createNamespace } from '@try-component-library/utils/index';

const bem = createNamespace('icon')

const props = defineProps(iconProps)

const style = computed(() => {
  if (!props.size && !props.color) {
    return {}
  }

  return {
    ...(props.size ? { "font-size": props.size + "px" } : {}),
    color: props.color || ''
  }
});


</script>

<style scoped></style>
