import NigBerlinView from './NigBerlinView.vue'
import { useNigBerlinStore } from './store.js'

export default {
  id: 'nig-berlin',
  title: 'Natur im Garten Berlin',
  description: 'Plakette für naturnahe Gärten. Drei Kernkriterien, zwei Grundkriterien und mindestens 7 von 23 weiteren Kriterien.',
  regions: ['BE'],
  icon: 'hedgehog',
  order: 10,
  path: '/nig-berlin',
  routes: [{ path: '/nig-berlin', component: NigBerlinView }],
  useStore: useNigBerlinStore,
}
