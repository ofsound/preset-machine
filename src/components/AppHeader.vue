<script setup lang="ts">
import JsonSave from '@/components/JsonSave.vue'
import { usePreset } from '@/composable/usePreset.ts'

defineProps<{
  isInspector: boolean
}>()

defineEmits(['toggleInspector'])

const { corePreset } = usePreset()
</script>

<template>
  <div class="flex p-2 py-3">
    <div class="mr-auto flex gap-4">
      <input
        type="text"
        id="preset-name"
        name="preset-name"
        v-model="corePreset.name"
        placeholder="Preset Name"
        class="rounded-md bg-neutral-100 px-3 py-1 font-semibold tracking-wide"
      />
      <input
        type="text"
        id="preset-author"
        name="preset-author"
        v-model="corePreset.author"
        placeholder="Preset Author"
        class="rounded-md bg-neutral-100 px-3 py-1 font-semibold tracking-wide"
      />
    </div>
    <div class="flex gap-2">
      <button
        class="block w-36 cursor-pointer rounded-md bg-neutral-600 px-4 py-1 text-center text-sm font-semibold tracking-wide text-white text-shadow-xs hover:text-shadow-lg"
        @click="$emit('toggleInspector')"
      >
        <span v-if="!isInspector">Show Inspector</span>
        <span v-else>Hide Inspector</span>
      </button>
      <JsonSave />
    </div>
  </div>
</template>
