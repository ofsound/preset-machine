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
const roundAmount = ref<number>(0)

watch(
  [activeOffsets, activeHolds],
  () => {
    if (jsonData.value) {
      const correctedOffsets = activeOffsets.value.map(
        (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
      )
      const correctedHolds = activeHolds.value.map(
        (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
      )
      jsonData.value.offsets.splice(0, harmonics.value, ...correctedOffsets)
      jsonData.value.holds.splice(0, harmonics.value, ...correctedHolds)
    }
  },
  { deep: true },
)
</script>

<template>
  <div v-if="jsonData">
    <div class="mb-4 flex items-end justify-between">
      <h1 class="mb-0 py-4 text-center text-3xl font-bold">
        {{ jsonData.name }} : {{ jsonData.author }}
      </h1>
      <JsonSave :jsonData="jsonData" />
    </div>

    <div class="flex rounded-sm bg-gray-200 p-4">
      <div>
        Harmonics:
        <input class="max-w-14 rounded-sm bg-gray-300 p-1" type="number" v-model="harmonics" />
      </div>
      <div class="ml-4">
        Tempo: <input class="max-w-14 rounded-sm bg-gray-300 p-1" type="number" v-model="tempo" />
      </div>
      <div class="ml-auto">
        Hold Length:&nbsp;&nbsp;
        <select class="bg-gray-3 rounded-sm bg-gray-300 p-1 text-black" v-model="toolOptionValue">
          <option value="-1" disabled>Hold note value</option>
          <option
            v-for="toolOption in toolOptions"
            :key="toolOption.value"
            :value="toolOption.value"
          >
            {{ toolOption.text }}
          </option>
        </select>
      </div>
    </div>

    <div class="mx-auto mt-4 mb-10 flex flex-col-reverse">
      <AdjustmentSlider
        v-for="(n, i) in harmonics"
        :key="n"
        :value="toolOptionValue"
        v-model:offset="activeOffsets[i]"
        v-model:hold="activeHolds[i]"
        v-model:roundAmount="roundAmount"
      />
    </div>
  </div>

  <template v-else>
    <JsonDrop @jsonLoaded="handleJsonLoaded" />
  </template>
  <footer class="mt-auto flex justify-between pt-3 pb-3 text-right text-xs">
    <div class="italic">click row to choose an offset with selected hold length</div>
    <div>preset machine v.01</div>
  </footer>
</template>

<style scoped></style>
