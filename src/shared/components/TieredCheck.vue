<script setup>
import { computed, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ChoiceQuestion from './ChoiceQuestion.vue'
import CriterionRating from './CriterionRating.vue'
import ModuleLayout from './ModuleLayout.vue'
import PointMeter from './PointMeter.vue'
import TieredScene from './TieredScene.vue'

// Ablauf für Module nach dem Muster „Stufen“: Kernkriterien, je Kategorie ein Schritt, Ergebnis.
// Modulspezifisches kommt über Slots: intro (Schritt 1), criterion (unter jedem Kriterium),
// result (im Ergebnis), next (Weg zur echten Plakette).
const props = defineProps({
  base: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, required: true },
  config: { type: Object, required: true },
  store: { type: Object, required: true },
  options: { type: Object, default: () => ({}) },
  rating: { type: Function, required: true },
  shape: { type: String, default: 'star' },
  unit: { type: Array, default: () => ['Stern', 'Sterne'] },
  levelLabels: { type: Array, default: undefined },
  coreIntro: { type: String, default: 'Diese Kriterien gelten ohne Ausnahme. Fehlt eines, gibt es keine Plakette.' },
})

const route = useRoute()
const router = useRouter()

const steps = computed(() => [
  { slug: 'kernkriterien', label: 'Kernkriterien', title: 'Die Kernkriterien', intro: props.coreIntro },
  ...props.config.categories.map((category) => ({
    slug: category.id,
    label: category.navLabel ?? category.title,
    title: category.title,
    intro: `Du brauchst hier mindestens ${category.required} ${props.unit[1]}.`,
    category,
  })),
  { slug: 'ergebnis', label: 'Ergebnis' },
])

const step = computed(() => Math.max(0, steps.value.findIndex((item) => item.slug === route.params.step)))
const current = computed(() => steps.value[step.value])
const result = computed(() => props.store.result)
const activeScore = computed(() =>
  current.value.category ? result.value.categories.find((c) => c.id === current.value.category.id) : null,
)
const isLast = computed(() => step.value === steps.value.length - 1)

const pathFor = (index) => `${props.base}/${steps.value[index].slug}`
const goTo = (index) => router.push(pathFor(index))
const stepOf = (categoryId) => steps.value.findIndex((s) => s.slug === categoryId)
const unitFor = (n) => (n === 1 ? props.unit[0] : props.unit[1])

watch(step, async () => {
  await nextTick()
  document.querySelector('[data-step-heading]')?.focus({ preventScroll: true })
  document.querySelector('[aria-current="step"]')?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  document.getElementById('check')?.scrollIntoView({ block: 'start' })
})

const headline = computed(
  () =>
    ({
      ready: 'Dein Garten erfüllt die Kriterien.',
      missing: 'Bis zur Plakette fehlt noch etwas.',
      open: 'Noch nicht alles beantwortet.',
    })[result.value.status],
)

const summary = computed(() => {
  const { status, coreFailed, coreOpen } = result.value
  if (status === 'ready') return 'Nach deiner Einschätzung kannst du dich anmelden. Die Entscheidung fällt bei der Begehung vor Ort.'
  if (status === 'missing') {
    return coreFailed.length > 0
      ? 'Alle Kernkriterien müssen erfüllt sein. Hier hilft kein Ausgleich durch Punkte.'
      : 'Jeder Bereich hat eine eigene Mindestzahl. Mehr in einem Bereich gleicht den anderen nicht aus.'
  }
  return coreOpen.length > 0 ? 'Es fehlen noch Kernkriterien und vielleicht ein paar Bewertungen.' : 'Bewerte die offenen Kriterien, damit das Ergebnis feststeht.'
})

const openSuggestions = computed(() => result.value.suggestions.filter((s) => s.items.length > 0))
</script>

<template>
  <ModuleLayout :title="title" :lead="lead">
    <template #scene>
      <TieredScene class="lg:max-h-full" :config="config" :state="store.answers" :result="result" :rating="rating" />
    </template>

    <nav aria-label="Schritte" class="sticky top-0 z-10 -mx-4 bg-lichen/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-14 lg:px-14">
      <ol class="flex gap-1 overflow-x-auto">
        <li v-for="(item, index) in steps" :key="item.slug" class="shrink-0">
          <RouterLink
            :to="pathFor(index)"
            class="flex items-center gap-1.5 rounded-full px-3 py-1 font-bold whitespace-nowrap transition-colors"
            :class="index === step ? 'bg-fir text-paper' : 'hover:bg-lichen-deep'"
            :aria-current="index === step ? 'step' : undefined"
          >
            <span class="font-serif">{{ index + 1 }}</span>
            {{ item.label }}
          </RouterLink>
        </li>
      </ol>
    </nav>

    <template v-if="isLast">
      <TieredScene class="mt-3 rounded-3xl bg-fir lg:hidden" :config="config" :state="store.answers" :result="result" :rating="rating" />
      <h2 tabindex="-1" data-step-heading class="mt-5 font-serif text-4xl font-bold leading-tight outline-none md:text-5xl">{{ headline }}</h2>
      <p class="mt-3 max-w-[60ch]">{{ summary }}</p>

      <section class="mt-8" aria-labelledby="core-result">
        <h3 id="core-result" class="font-serif text-2xl font-bold">Kernkriterien</h3>
        <ul class="mt-2">
          <li v-for="item in result.core" :key="item.id" class="flex items-baseline gap-2 py-0.5">
            <span class="w-14 shrink-0 font-bold" :class="{ 'text-leaf': item.value === true, 'text-rosehip': item.value === false, 'text-fir-soft': item.value === null }">
              {{ item.value === true ? 'Erfüllt' : item.value === false ? 'Fehlt' : 'Offen' }}
            </span>
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </section>

      <section class="mt-8" aria-labelledby="points-result">
        <h3 id="points-result" class="font-serif text-2xl font-bold">{{ unit[1] }} pro Bereich</h3>
        <dl class="mt-2 space-y-3">
          <div v-for="category in result.categories" :key="category.id">
            <dt>{{ category.title }}</dt>
            <dd class="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-leaf">
              <PointMeter :score="category.score" :required="category.required" :max="category.max" :shape="shape" />
              <span class="font-bold text-fir">
                {{ category.score }} von mindestens {{ category.required }}
                <span class="font-normal">({{ category.answered }} von {{ category.total }} bewertet)</span>
              </span>
            </dd>
          </div>
        </dl>
      </section>

      <section v-if="openSuggestions.length" class="mt-8" aria-labelledby="tips">
        <h3 id="tips" class="font-serif text-2xl font-bold">Hier holst du die meisten {{ unit[1] }}</h3>
        <div v-for="group in openSuggestions" :key="group.id" class="mt-4">
          <h4 class="font-bold">{{ group.title }}</h4>
          <ul class="mt-1 space-y-2">
            <li v-for="item in group.items" :key="item.id" class="border-l-4 border-sprout pl-3">
              <button type="button" class="text-left underline decoration-leaf underline-offset-2" @click="goTo(stepOf(group.id))">{{ item.title }}</button>
              <span class="ml-1 text-base text-fir-soft">bis zu +{{ item.gain }} {{ unitFor(item.gain) }}</span>
              <p v-if="item.tip" class="text-base">{{ item.tip }}</p>
            </li>
          </ul>
        </div>
      </section>

      <slot name="result" />

      <section class="mt-8 rounded-3xl bg-lichen-deep p-5" aria-labelledby="next">
        <h3 id="next" class="font-serif text-2xl font-bold">Zur echten Plakette</h3>
        <slot name="next" />
      </section>
    </template>

    <template v-else>
      <h2 tabindex="-1" data-step-heading class="mt-5 font-serif text-4xl font-bold leading-tight outline-none md:text-5xl">{{ current.title }}</h2>
      <p class="mt-2 max-w-[60ch]">{{ current.intro }}</p>

      <div v-if="activeScore" class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-leaf">
        <PointMeter :score="activeScore.score" :required="activeScore.required" :max="activeScore.max" :shape="shape" />
        <span class="font-bold text-fir" aria-live="polite">{{ activeScore.score }} von mindestens {{ activeScore.required }} {{ unit[1] }}</span>
      </div>

      <div class="mt-7">
        <template v-if="step === 0">
          <slot name="intro" />
          <ChoiceQuestion v-for="criterion in config.core" :key="criterion.id" v-model="store.answers.core[criterion.id]" :criterion="criterion" />
        </template>
        <template v-else>
          <CriterionRating
            v-for="criterion in current.category.criteria"
            :key="criterion.id"
            v-model="store.answers.ratings[criterion.id]"
            :criterion="criterion"
            :blocked="options.isBlocked?.(store.answers, criterion.id) ?? false"
            :shape="shape"
            :labels="levelLabels"
          >
            <slot name="criterion" :criterion="criterion" />
          </CriterionRating>
        </template>
      </div>

      <div class="mt-8 flex gap-2">
        <button v-if="step > 0" type="button" class="rounded-full border-2 border-leaf/50 px-5 py-2 font-bold transition-colors hover:border-leaf hover:bg-paper" @click="goTo(step - 1)">Zurück</button>
        <button type="button" class="rounded-full bg-leaf px-6 py-2 font-bold text-paper transition-colors hover:bg-fir" @click="goTo(step + 1)">
          {{ step === steps.length - 2 ? 'Ergebnis ansehen' : 'Weiter' }}
        </button>
      </div>
    </template>
  </ModuleLayout>
</template>
