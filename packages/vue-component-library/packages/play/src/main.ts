import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

//@ts-ignore
import components from "vue-component-library"

const app = createApp(App);

app.use(components).mount('#app')
