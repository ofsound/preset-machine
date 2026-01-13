<script setup lang="ts">
import { ref, watch } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import { selectText } from '@/utils/helpers'

const emit = defineEmits(['updatePresetVisualizerSettings'])

const numHarmonics = ref('36')
// const rowPixelHeight = ref('4')
const timeScaleSeconds = ref('20')

watch([numHarmonics, timeScaleSeconds], () => {
  emit(
    'updatePresetVisualizerSettings',
    // Number(numHarmonics.value),
    Math.min(Number(numHarmonics.value), 511),
    // Number(rowPixelHeight.value),
    Number(timeScaleSeconds.value),
  )
})
</script>

<template>
  <div
    class="absolute right-0 z-10 mt-2 flex h-6 gap-3 rounded-bl pl-2 text-white"
  >
    <div class="flex gap-2">
      <div class="self-center text-xs">Harmonics</div>
      <input
        type="text"
        :id="`num-harmonics${uuidv4()}`"
        name="num-harmonics"
        v-model="numHarmonics"
        @click="selectText"
        class="w-12 rounded-sm border border-neutral-600 bg-slate-800/0 p-1 px-2 text-right text-xs font-semibold tabular-nums"
      />
    </div>
    <div class="flex gap-2">
      <div class="self-center text-xs">Time Scale (s)</div>
      <input
        type="text"
        :id="`time-scale${uuidv4()}`"
        name="time-scale"
        v-model="timeScaleSeconds"
        @click="selectText"
        class="w-9 rounded-sm border border-neutral-600 bg-slate-800/0 p-1 px-2 text-right text-xs font-semibold tabular-nums"
      />
    </div>

    <!-- <div class="flex gap-2">
      <div class="self-center text-xs">Row Height (px)</div>
      <input
        type="text"
        :id="`row-height${uuidv4()}`"
        name="row-height"
        v-model="rowPixelHeight"
        @click="selectText"
        class="w-9 rounded-sm border border-neutral-600 bg-slate-800/0 p-1 px-2 text-right text-xs font-semibold tabular-nums"
      />
    </div> -->
  </div>
</template>
