import { createApp } from 'vue'
import App from "./App.vue";
import {test} from "../../vue-component"

const instance = createApp(App)

instance.mount('#app')
