<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

import JsonSave from '@/components/JsonSave.vue'
</script>

<template>
  <div class="flex p-4">
    <div class="mr-auto flex gap-4">
      <input
        type="text"
        id="preset-name"
        name="preset-name"
        v-model="preset.name"
        placeholder="Preset Name"
        class="rounded-md bg-neutral-100 px-3 py-1 text-xl font-semibold tracking-wide"
      />
      <input
        type="text"
        id="preset-author"
        name="preset-author"
        v-model="preset.author"
        placeholder="Preset Author"
        class="rounded-md bg-neutral-100 px-3 py-1 text-xl font-semibold tracking-wide"
      />
    </div>

    <JsonSave />
  </div>
</template>
