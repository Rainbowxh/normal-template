import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Icon from "@try-component-library/components/icon/index"

const app = createApp(App)

const plugins = [
  Icon
]

plugins.forEach((plugin) =>{
  plugin.install(app)
})

app.mount('#app')
