import VogelgartenView from './VogelgartenView.vue'
import { useVogelgartenStore } from './store.js'

export default {
  id: 'vogelgarten',
  navLabel: 'Vogelgarten',
  title: 'Vogelfreundlicher Garten',
  description: 'Kostenlose Plakette von LBV und Landesamt für Umwelt. Die Vorprüfung zeigt, ob du dich anmelden kannst.',
  region: 'Private Gärten in Bayern',
  path: '/vogelgarten',
  routes: [{ path: '/vogelgarten', component: VogelgartenView }],
  useStore: useVogelgartenStore,
}
