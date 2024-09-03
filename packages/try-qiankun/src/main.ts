import { createApp } from "vue";
import App from "./app.vue";
import { createRouter, createWebHashHistory }  from "vue-router";
import { mount, unmount } from "../children/vue1/dist/static/js/index-B5Qt9EMX.js";

const routes = [
  { path: '/a', component: () => import('./views/home.vue') },
  { path: '/b', component: () => import('./views/home-B.vue')  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

const instance = createApp(App)
instance.use(router)
instance.mount('#app')


console.log(mount, unmount)
