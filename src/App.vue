<script setup lang="ts">
import JsonSave from '@/components/JsonSave.vue'
import OffsetHold from '@/components/OffsetHold.vue'
import FreeformDraw from '@/components/FreeformDraw.vue'

import { useStore } from '@/stores/store'

const store = useStore()
</script>

<template>
  <div>
    <div class="mb-4 flex items-end justify-between">
      <h1 class="py-4 text-center text-3xl font-bold">
        {{ store.preset.name }} : {{ store.preset.author }}
      </h1>
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
