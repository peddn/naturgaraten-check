<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const viewKey = computed(() => route.matched[0]?.path ?? route.path)
</script>

<template>
  <RouterView :key="viewKey" />
</template>
