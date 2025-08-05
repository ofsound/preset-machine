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

const harmonics = ref<number>(16)
const tempo = ref<number>(120)

const toolOptionValue = ref<number>(1)
const toolOptions = ref([
  { text: '1/16', value: 1 },
  { text: '1/8', value: 2 },
  { text: 'Dotted 1/8', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
])

const activeOffsets = ref<number[]>(new Array(harmonics.value).fill(null))
const activeHolds = ref<number[]>(new Array(harmonics.value).fill(null))

watch(
  [activeOffsets, activeHolds],
  () => {
    if (jsonData.value) {
      const correctedOffsets = activeOffsets.value.map((item) => item / 90)
      const correctedHolds = activeHolds.value.map((item) => item / 90)
      jsonData.value.offsets.splice(0, harmonics.value, ...correctedOffsets)
      jsonData.value.holds.splice(0, harmonics.value, ...correctedHolds)
    }
  },
  { deep: true },
)
</script>

<template>
  <div v-if="jsonData">
    <JsonSave :jsonData="jsonData" />

    <h1 class="py-4 text-center text-2xl font-bold">{{ jsonData.name }} : {{ jsonData.author }}</h1>

    <div class="mx-auto mt-4 mb-10 flex max-w-200 flex-col-reverse">
      <AdjustmentSlider
        v-for="(n, i) in harmonics"
        :key="n"
        :value="toolOptionValue"
        v-model:offset="activeOffsets[i]"
        v-model:hold="activeHolds[i]"
      />
    </div>

    <div class="flex rounded-sm bg-gray-200 p-4">
      <div>Harmonics: <input type="text" v-model.number="harmonics" /></div>
      <div>Tempo: <input type="text" v-model.number="tempo" /></div>
      Tool:&nbsp;&nbsp;
      <select class="bg-gray-200 text-black" v-model="toolOptionValue">
        <option value="-1" disabled>Please select one</option>
        <option v-for="toolOption in toolOptions" :key="toolOption.value" :value="toolOption.value">
          {{ toolOption.text }}
        </option>
      </select>
    </div>
  </div>
  <template v-else>
    <JsonDrop @jsonLoaded="handleJsonLoaded" />
  </template>
  <footer class="mt-auto pt-3 pb-3 text-right">preset machine v.01</footer>
</template>

<style scoped></style>
