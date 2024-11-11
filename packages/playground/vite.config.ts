import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginScriptDefer from './plugin/scriptDefer'

export default defineConfig((params) => {
  const { command, mode } = params
  return {
    plugins: [vue(), vitePluginScriptDefer()],
  } as any
})
