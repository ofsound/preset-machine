<script setup lang="ts">
import JsonSave from '@/components/JsonSave.vue'
// import OffsetHold from '@/components/OffsetHold.vue'
// import FreeformDraw from '@/components/FreeformDraw.vue'
import RandomizeEnvelopes from '@/components/RandomizeEnvelopes.vue'

import { useStore } from '@/stores/store'
import PageTwo from './components/PageTwo.vue'

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

    <!-- <div class="flex">
      <FreeformDraw :segment="store.preset.offsets" />
      <FreeformDraw :segment="store.preset.attacks" />
      <FreeformDraw :segment="store.preset.decays" />
      <FreeformDraw :segment="store.preset.holds" />
      <FreeformDraw :segment="store.preset.releases" />
    </div> -->

    <PageTwo />

    <RandomizeEnvelopes />

    <!-- <OffsetHold /> -->

    <footer class="mt-auto flex justify-between pt-3 pb-3 text-right text-xs">
      <!-- <div class="italic">click (and drag) on row to choose an offset and hold length</div> -->
      <div>preset machine v0.0.3</div>
    </footer>
  </div>
</template>
