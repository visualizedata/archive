import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Project from '../views/Project.vue'
import Keynote from '../views/Keynote.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/keynote/:year',
    name: 'Keynote',
    component: Keynote,
  },
  {
    path: '/:slug',
    name: 'ProjectView',
    component: Project,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
