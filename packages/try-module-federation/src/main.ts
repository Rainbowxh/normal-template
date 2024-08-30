import { createApp } from "vue";
import * as vue from "vue";
import App from "./app.vue";

window.Vue = vue;

const instance = createApp(App)

instance.mount('#app')

