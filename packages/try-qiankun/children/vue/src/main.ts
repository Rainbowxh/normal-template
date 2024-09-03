import { createApp } from "vue";
import App from "./app.vue";

const instance = createApp(App)

instance.mount('#app')

export async function bootstrap() {}

export async function mount() {}

export async function unmount() {}
