<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import AdjustmentSlider from './components/AdjustmentSlider.vue'
import JsonDrop from './components/JsonDrop.vue'
import JsonSave from './components/JsonSave.vue'

import type { SineMachinePreset } from './types/SineMachinePreset.ts'

const jsonData = ref<SineMachinePreset | null>(null)

const handleJsonLoaded = (data: SineMachinePreset) => {
  jsonData.value = data
}

const activeOscTotal = 8

const activeOffsets = ref<number[]>(new Array(activeOscTotal).fill(null))
const activeHolds = ref<number[]>(new Array(activeOscTotal).fill(null))

const correctedOffsets = computed(() => {
  return activeOffsets.value.map((item) => item / 90)
})

const correctedHolds = computed(() => {
  return activeHolds.value.map((item) => item / 90)
})

const selectedValue = ref<number>()

const tempo = ref<number>(120)

const options = ref([
  { text: '8th', value: 2 },
  { text: 'Dotted 8th', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
  { text: 'drag', value: 1 },
])

watch(correctedOffsets, () => {
  if (jsonData.value) {
    jsonData.value.offsets.splice(0, 8, ...correctedOffsets.value)
    jsonData.value.holds.splice(0, 8, ...correctedHolds.value)
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
        v-model:offset="activeOffsets[i]"
        v-model:hold="activeHolds[i]"
        v-model:value="selectedValue"
      />
    </div>

    <input type="text" v-model="tempo" />

    <select id="myDropdown" v-model="selectedValue">
      <option value="" disabled>Please select one</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
