import { createApp } from "vue";
import App from "./app.vue";
import { createRouter, createWebHashHistory }  from "vue-router";
const routes = [
  { path: '/a', component: () => import('./views/home.vue') },
  { path: '/b', component: () => import('./views/home-B.vue')  },
]

const func = async () => {
  const result = await routes[0].component()
}



const router = createRouter({
  routes,
  history: createWebHashHistory(),
})


const instance = createApp(App)
instance.use(router)
instance.mount('#app')
