<script setup lang="ts">
import { useStore } from '@/stores/store'

import JsonSave from '@/components/JsonSave.vue'

const store = useStore()
</script>

<template>
  <div class="mb-4 flex items-end justify-between">
    <h1 class="py-4 text-center text-3xl font-bold">
      <input
        type="text"
        id="preset-name"
        name="preset-name"
        v-model="store.preset.name"
        class="border p-1 font-bold"
      />
      <input
        type="text"
        id="preset-author"
        name="preset-author"
        v-model="store.preset.author"
        class="border p-1 font-bold"
      />
    </h1>
    <JsonSave />
  </div>
</template>
