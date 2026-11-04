import { createRouter, createWebHashHistory } from 'vue-router'
import { modules } from '../modules/index.js'
import HomeView from '../views/HomeView.vue'

// Hash-URLs funktionieren auf jedem statischen Hosting ohne Weiterleitungsregeln.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    ...modules.flatMap((module) => module.routes),
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
