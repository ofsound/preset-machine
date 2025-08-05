<script setup lang="ts">
import { ref, watch } from 'vue'

import AdjustmentSlider from './components/AdjustmentSlider.vue'
import JsonDrop from './components/JsonDrop.vue'
import JsonSave from './components/JsonSave.vue'

import type { SineMachinePreset } from './types/SineMachinePreset.ts'

const jsonData = ref<SineMachinePreset | null>(null)

const handleJsonLoaded = (data: SineMachinePreset) => {
  jsonData.value = data
}

const activeOscTotal = 8

const tempo = ref<number>(120)

const toolOptionValue = ref<number>()
const toolOptions = ref([
  { text: '8th', value: 2 },
  { text: 'Dotted 8th', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
  { text: 'drag', value: 1 },
])

const activeOffsets = ref<number[]>(new Array(activeOscTotal).fill(null))
const activeHolds = ref<number[]>(new Array(activeOscTotal).fill(null))

watch([activeOffsets, activeHolds], () => {
  if (jsonData.value) {
    const correctedOffsets = activeOffsets.value.map((item) => item / 90)
    const correctedHolds = activeHolds.value.map((item) => item / 90)
    jsonData.value.offsets.splice(0, activeOscTotal, ...correctedOffsets)
    jsonData.value.holds.splice(0, activeOscTotal, ...correctedHolds)
  }
})
</script>

<template>
  <JsonDrop @jsonLoaded="handleJsonLoaded" />

  <div v-if="jsonData">
    <div class="flex justify-center gap-4">
      <h1 class="py-4 text-center text-2xl font-bold">
        {{ jsonData.name }} : {{ jsonData.author }}
      </h1>
      <JsonSave :jsonData="jsonData" />
    </div>

    <div class="mx-a mb-10 flex max-w-200 flex-col-reverse">
      <AdjustmentSlider
        v-for="(n, i) in activeOscTotal"
        :key="n"
        :value="toolOptionValue"
        v-model:offset="activeOffsets[i]"
        v-model:hold="activeHolds[i]"
      />
    </div>

    <input type="text" v-model="tempo" />

    <select id="myDropdown" v-model="toolOptionValue">
      <option value="" disabled>Please select one</option>
      <option v-for="toolOption in toolOptions" :key="toolOption.value" :value="toolOption.value">
        {{ toolOption.text }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
