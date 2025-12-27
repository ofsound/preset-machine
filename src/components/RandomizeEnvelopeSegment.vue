<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  index: number
  envelopeSegment: number[]
  label: string
  updateEnvelopeSegmentArray: (
    index: number,
    activeEnvSegmentValues: number[],
  ) => void
}>()

const lowerLimit = ref(0)
const upperLimit = ref(0)

const activeEnvSegmentValues: number[] = [...props.envelopeSegment]

const randomize = () => {
  activeEnvSegmentValues.forEach((element, index, array) => {
    const randomizeRange = upperLimit.value / 10 - lowerLimit.value / 10

    const randomDeltaWithinRange = Math.random() * randomizeRange

    const randomValueWithinRange =
      randomDeltaWithinRange + lowerLimit.value / 10

    const thisValue = array[index]

    const newValue = thisValue! + randomValueWithinRange

    if (newValue < 0) {
      array[index] = 0
    } else {
      array[index] = newValue
    }
  })

  props.updateEnvelopeSegmentArray(props.index, activeEnvSegmentValues)
}
</script>

<template>
  <div class="mb-3 w-full">
    <div class="mb-1 font-semibold">{{ label }}</div>
    <div class="flex gap-2">
      <input
        class="w-10 bg-slate-200"
        type="number"
        id="lowerLimit"
        v-model="lowerLimit"
      />
      <input
        class="w-10 bg-slate-200"
        type="number"
        id="upperLimit"
        v-model="upperLimit"
      />
      <button
        @click="randomize"
        class="cursor-pointer rounded-sm border bg-sky-50 px-3 py-px text-sm font-semibold tracking-wide"
      >
        Randomize
      </button>
    </div>
  </div>
</template>
