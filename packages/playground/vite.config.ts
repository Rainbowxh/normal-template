import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig((params) => {
  const { command, mode } = params
  return {
    plugins: [vue()],
  } as any
})
