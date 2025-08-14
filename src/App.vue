<script setup lang="ts">
import JsonSave from '@/components/JsonSave.vue'
import OffsetHold from '@/components/OffsetHold.vue'
import FreeformDraw from '@/components/FreeformDraw.vue'

import { usePreset } from '@/composables/usePreset'

import { useCounterStore } from '@/stores/counter'

// access the `store` variable anywhere in the component ✨
const store = useCounterStore()
console.log(store.name)

const { preset } = usePreset()
</script>

<template>
  <div>
    <div class="mb-4 flex items-end justify-between">
      <h1 class="py-4 text-center text-3xl font-bold">{{ preset.name }} : {{ preset.author }}</h1>
      <JsonSave />
    </div>

    <FreeformDraw />
    <OffsetHold />

    <footer class="mt-auto flex justify-between pt-3 pb-3 text-right text-xs">
      <div class="italic">click (and drag) on row to choose an offset and hold length</div>
      <div>preset machine v.02</div>
    </footer>
  </div>
</template>
