import { createCheckStore } from '../../shared/createCheckStore.js'
import { createEmptyState, evaluate, sanitizeState, summarize } from './scoring.js'

export const useNigBwStore = createCheckStore({
  id: 'nig-bw',
  createEmpty: createEmptyState,
  sanitize: sanitizeState,
  evaluate,
  summarize,
})
