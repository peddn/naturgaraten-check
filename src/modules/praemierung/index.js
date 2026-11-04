import PraemierungView from './PraemierungView.vue'
import { usePraemierungStore } from './store.js'

export default {
  id: 'praemierung',
  navLabel: 'Prämierung',
  title: 'Naturgartenprämierung',
  description: 'Bronze, Silber, Gold oder Grüne Oase, früher bei „Tausende Gärten – Tausende Arten“, heute bei NaturGarten e.V.',
  region: 'Bundesweit',
  path: '/praemierung',
  routes: [{ path: '/praemierung', component: PraemierungView }],
  useStore: usePraemierungStore,
}
