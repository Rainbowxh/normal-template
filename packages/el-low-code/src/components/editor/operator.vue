<template>
  <div class="operator">
    <el-form v-if="operator" label-width="auto">

      <el-form-item label="现有组件">
        <el-select v-model="operator.link">
          <el-option v-for="item in options" :key="item.value" :label="item.label + item.value" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="id">
        <el-input v-model="operator.id" disabled />
      </el-form-item>

      <el-form-item label="标签">
        <el-input v-model="operator.label" />
      </el-form-item>

      <el-form-item label="内容">
        <el-input v-model="operator.content" />
      </el-form-item>

      <div v-for="(config, index) in currentConfigs" :key="index">
        <el-form-item v-if="config.type === 'input'" :label="config.label">
          <el-input v-model="operator.props[config.key]" />
        </el-form-item>

        <el-form-item v-if="config.type === 'select'" :label="config.label">
          <el-select>
            <el-option v-for="item in config.value" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item> 
      </div>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePreviewStore } from './pinia/preview.pinia';
import { computed, watch, ref } from 'vue';

const store = usePreviewStore();
const { currentInstance, previewList } = storeToRefs(store)

const options = computed(() => {
  return previewList.value.map(item => {
    return {
      label: item.label,
      value: item.id
    }
  })
})

const operator = currentInstance;


const currentConfigs = computed(() => {
  const props = currentInstance.value.props;

  const keys = Object.keys(props)

  return keys.map(key => {
    if (key === 'options') {
      return {
        type: 'select',
        label: key,
        key,
        value: props[key]
      }
    }

    return {
      type: 'input',
      label: key,
      key,
      value: props[key]
    }
  })
})

watch(() => currentInstance.value, (val) => {
  if (!currentInstance.value) return
}, { immediate: true })

defineOptions({
  name: 'operator'
})


</script>

<style scoped>
.operator {
  flex-wrap: wrap;
  white-space: wrap;
  display: flex;
  word-break: break-all;
  padding: 20px;
}
</style>
