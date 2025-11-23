<script setup lang="ts">
import { useStore } from '@/stores/store'

import JsonSave from '@/components/JsonSave.vue'

const store = useStore()
</script>

<template>
  <div class="flex p-4">
    <div class="mr-auto flex gap-4">
      <input
        type="text"
        id="preset-name"
        name="preset-name"
        v-model="store.preset.name"
        placeholder="Preset Name"
        class="rounded-md bg-neutral-100 px-3 py-1 text-xl font-semibold tracking-wide"
      />
      <input
        type="text"
        id="preset-author"
        name="preset-author"
        v-model="store.preset.author"
        placeholder="Preset Author"
        class="rounded-md bg-neutral-100 px-3 py-1 text-xl font-semibold tracking-wide"
      />
    </div>
    <JsonSave />
  </div>
</template>
