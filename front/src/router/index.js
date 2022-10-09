import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Home from '@/views/Home.vue';

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login,
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;