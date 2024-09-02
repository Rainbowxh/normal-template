import { createApp } from "vue";
import App from "./app.vue";
import { createRouter, createWebHashHistory }  from "vue-router";
import { registerMicroApps, start } from "./micro-fe";
const routes = [
  { path: '/a', component: () => import('./views/home.vue') },
  { path: '/b', component: () => import('./views/home-B.vue')  },
]


registerMicroApps([
  {
    name: 'a',
    localhost: 'localhost:3155',
    container: '#sub-container',
    activeRule: '/a',
  },{
    name: 'b',
    localhost: 'localhost:3155',
    container: '#sub-container',
    activeRule: '/b',
  }
])


start()




const router = createRouter({
  routes,
  history: createWebHashHistory(),
})


const instance = createApp(App)
instance.use(router)
instance.mount('#app')
