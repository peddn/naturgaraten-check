import { createRouter, createWebHashHistory } from 'vue-router'
import { modules } from '../modules/index.js'
import { stateBySlug } from '../shared/regions.js'
import HomeView from '../views/HomeView.vue'
import RegionView from '../views/RegionView.vue'

// Hash-URLs funktionieren auf jedem statischen Hosting ohne Weiterleitungsregeln.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    {
      path: '/land/:slug',
      component: RegionView,
      beforeEnter: (to) => (stateBySlug(to.params.slug) ? true : '/'),
    },
    ...modules.flatMap((module) => module.routes),
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
