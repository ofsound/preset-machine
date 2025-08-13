<script setup lang="ts">
import { ref, watch } from 'vue'

import AdjustmentSlider from '@/components/AdjustmentSlider.vue'

import { useState } from '@/composables/useState'
const { preset } = useState()

const toolOptionValue = ref<number>(1)
const toolOptions = ref([
  { text: '1/16 & drag', value: 1 },
  { text: '1/8', value: 2 },
  { text: 'Dotted 1/8', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
])

const harmonics = ref<number>(8)
const tempo = ref<number>(120)

const handleRoundAmount = (roundAmountEmitted: number) => {
  roundAmount.value = roundAmountEmitted
}

const activeOffsets = ref<number[]>(new Array(harmonics.value).fill(0))
const activeHolds = ref<number[]>(new Array(harmonics.value).fill(0))
const roundAmount = ref<number>(0)

watch(
  [activeOffsets, activeHolds],
  () => {
    if (preset) {
      const correctedOffsets = activeOffsets.value.map(
        (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
      )
      const correctedHolds = activeHolds.value.map(
        (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
      )
      preset.offsets.splice(0, harmonics.value, ...correctedOffsets)
      preset.holds.splice(0, harmonics.value, ...correctedHolds)
    }
  },
  { deep: true },
)
</script>

<template>
  <div>
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
        @roundAmount="handleRoundAmount"
      />
    </div>
  </div>
</template>
