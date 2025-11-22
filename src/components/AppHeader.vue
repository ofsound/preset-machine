<script setup lang="ts">
import JsonSave from '@/components/JsonSave.vue'

import { useStore } from '@/stores/store'

const store = useStore()
</script>

<template>
  <div class="mb-4 flex items-end justify-between">
    <h1 class="py-4 text-center text-3xl font-bold">
      {{ store.preset.name }} : {{ store.preset.author }}
    </h1>
    <JsonSave />
  </div>
</template>
