<script setup lang="ts">
import { ref } from 'vue'

import PresetVisualizerControls from './PresetVisualizerControls.vue'
import PresetVisualizerRow from '@/components/PresetVisualizerRow.vue'

import { useStore } from '@/stores/store'

const store = useStore()

const numHarmonics = ref(36)
// const rowPixelHeight = ref(4)
const timeScaleSeconds = ref(20)

const updatePresetVisualizerSettings = (
  newNumHarmonics: number,
  // newRowPixelHeight: number,
  newTimeScaleSeconds: number,
) => {
  numHarmonics.value = newNumHarmonics
  // rowPixelHeight.value = newRowPixelHeight
  timeScaleSeconds.value = newTimeScaleSeconds
}
</script>

<template>
  <div class="relative flex h-80 flex-col bg-black">
    <PresetVisualizerControls
      @updatePresetVisualizerSettings="updatePresetVisualizerSettings"
    />
    <div class="flex flex-1 flex-col-reverse bg-black">
      <PresetVisualizerRow
        v-for="(n, index) in numHarmonics"
        :key="index"
        :index="index"
        :timeScaleSeconds
        :color="store.harmonicRowColors[index]!"
      />
    </div>
    <div class="flex h-4 justify-between bg-slate-400 text-xs font-semibold">
      <div
        v-for="index in timeScaleSeconds + 1"
        :key="index"
        class="relative first:opacity-0 last:opacity-0"
      >
        {{ index - 1 }}
      </div>
    </div>
  </div>
</template>
