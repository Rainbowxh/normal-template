import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

import Tree from "@try-component-library/components/tree"
import { Form, FormItem } from "@try-component-library/components/form"

const plugins = [Tree, Form, FormItem];

plugins.forEach(plugin => plugin.install(app))

app.mount('#app')
console.log(app)
