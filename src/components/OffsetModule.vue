<script setup lang="ts">
import { ref, watch } from 'vue'

import AdjustmentSlider from '@/components/AdjustmentSlider.vue'

import { useStore } from '@/stores/store'
const store = useStore()

const toolOptionValue = ref<number>(1)
const toolOptions = ref([
  { text: '1/16 & drag', value: 1 },
  { text: '1/8', value: 2 },
  { text: 'Dotted 1/8', value: 3 },
  { text: '1/4', value: 4 },
  { text: '1/2', value: 8 },
])

const numHarmonics = ref<number>(36)
const tempo = ref<number>(120)

const handleRoundAmount = (roundAmountEmitted: number) => {
  roundAmount.value = roundAmountEmitted
}

const activeOffsets = ref<number[]>(new Array(numHarmonics.value).fill(0))
const activeHolds = ref<number[]>(new Array(numHarmonics.value).fill(0))
const activeAttacks = ref<number[]>(new Array(numHarmonics.value).fill(0))
const activeReleases = ref<number[]>(new Array(numHarmonics.value).fill(0))
const activeDecays = ref<number[]>(new Array(numHarmonics.value).fill(0))
const activeSustains = ref<number[]>(new Array(numHarmonics.value).fill(0))
const activeGains = ref<number[]>(new Array(numHarmonics.value).fill(1))
const roundAmount = ref<number>(0)

watch(
  [
    activeOffsets,
    activeHolds,
    activeAttacks,
    activeReleases,
    activeDecays,
    activeSustains,
    activeGains,
  ],
  () => {
    if (store.preset) {
      const correctedOffsets = activeOffsets.value.map(
        (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
      )

      const correctedHolds = activeHolds.value.map(
        (item) => ((item / roundAmount.value) * (60 / tempo.value)) / 4,
      )

      store.preset.offsets.splice(0, numHarmonics.value, ...correctedOffsets)
      store.preset.holds.splice(0, numHarmonics.value, ...correctedHolds)
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
        <input class="max-w-14 rounded-sm bg-gray-300 p-1" type="number" v-model="numHarmonics" />
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
        v-for="(n, i) in numHarmonics"
        :key="n"
        :value="toolOptionValue"
        v-model:offset="activeOffsets[i]"
        v-model:hold="activeHolds[i]"
        @roundAmount="handleRoundAmount"
      />
    </div>
  </div>
</template>
