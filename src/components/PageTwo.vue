<script setup lang="ts">
// import { useStore } from '@/stores/store'

import PageTwoRow from '@/components/PageTwoRow.vue'

// const store = useStore()
</script>

<template>
  <h1>Page Two</h1>
  <div>
    <PageTwoRow v-for="n in 36" :key="n" :index="n" />
  </div>
</template>

<!-- store.preset.gains" />
store.preset.offsets" /
store.preset.attacks" /
store.preset.decays" />
store.preset.sustains"
store.preset.holds" />
store.preset.releases"  -->
