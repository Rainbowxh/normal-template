<template>
  <form style="background-color: antiquewhite;">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { onMounted, provide, reactive } from 'vue';

defineOptions({
  name: 'EForm'
})

const fields: any = [];

const addField = (field: unknown) => fields.push(field);

const valid = async () => {
  const rejectResult:any[] = []
  for(let field of fields) {
    try {
      await field.validate();
    }catch(err) {
      rejectResult.push(err)
    }
  }

  if(rejectResult.length === 0) {
    return true;
  }else {
    return false;
  }
} 

onMounted(() => {
  valid();
})

provide('EForm', reactive({
  addField,
}))

defineExpose({
  valid
})

</script>

<style scoped>

</style>
