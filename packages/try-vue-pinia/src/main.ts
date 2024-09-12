import { createApp } from "vue";
import App from "./app.vue";
// import { createPinia } from "pinia";

import { createPinia } from "./pinia/index"

const app = createApp(App)

const pinia = createPinia()

pinia.use(persistPlugin)

function persistPlugin() {
}

app.use(pinia) // use pinia plugin

app.mount('#app')
