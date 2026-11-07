import { createCheckStore } from '../../shared/createCheckStore.js'
import { createEmptyState, evaluate, sanitizeState, summarize } from './scoring.js'

export const useNigBerlinStore = createCheckStore({
  id: 'nig-berlin',
  createEmpty: createEmptyState,
  sanitize: sanitizeState,
  evaluate,
  summarize,
})
