<script setup lang="ts">
import JsonSave from '@/components/JsonSave.vue'
import { usePreset } from '@/composable/usePreset.ts'

defineEmits(['toggleInspector'])

const { preset } = usePreset()
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
    <div class="flex gap-2">
      <button
        class="block cursor-pointer rounded-md bg-neutral-600 px-4 py-1 text-sm font-semibold tracking-wide text-white text-shadow-xs hover:text-shadow-lg"
        @click="$emit('toggleInspector')"
      >
        Toggle Inspector
      </button>

      <JsonSave />
    </div>
  </div>
</template>
