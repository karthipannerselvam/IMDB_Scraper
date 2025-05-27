import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import AdminPanel from '../views/adminPanel.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/admin', component: AdminPanel },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
