import { createApp } from "vue";
import App from "./app.vue";

// import { createPinia } from "./pinia/index"
import { createPinia } from "./pinia/index1"

const app = createApp(App)

const pinia = createPinia()

app.use(pinia) // use pinia plugin

app.mount('#app')
