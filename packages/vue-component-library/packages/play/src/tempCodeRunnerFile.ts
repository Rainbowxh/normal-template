import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementComponents from "vue-component-library";

const app = createApp(App);
app.use(ElementComponents).mount('#app')
