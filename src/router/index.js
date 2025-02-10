import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProjectsView from '../views/Projects.vue'
import AboutView from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
