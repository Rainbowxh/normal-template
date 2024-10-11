<template>
  <div :class="eFormItemClass">
    <label class="e-form-item__label">表单项目:</label>
    <input></input>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, reactive } from 'vue';

const eFormItemClass = computed(() => {
  return {
   'e-form-item': true,
   'e-form-item--is-require': true
  }
})

defineOptions({
  name: 'EFormItem'
})

const validate = () => {
  return true
}


const context = reactive({
  validate
})

const formContext = inject<any>('EForm');

onMounted(() => {
  formContext.addField(context);
})

</script>

<style scoped>
.e-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.e-form-item__label {
  position: relative;
  width: 100px;
  text-align: right;
  margin-right: 10px;
}

.e-form-item--is-require .e-form-item__label::before{
  content: "*";
  align-items: center;
  display: flex;
  position: absolute;
  transform: translate(-100%, 0%);
}
</style>
