<script setup lang="ts">
import { ref } from 'vue'

import EnvelopeHarmonicRow from '@/components/EnvelopeHarmonicRow.vue'

import { useStore } from '@/stores/store'

const props = defineProps<{
  envelopeSegment: number[]
  numHarmonics: number
  activeHarmonics: number[]
}>()

const emit = defineEmits(['updateEnvelopeSegmentArray'])

const store = useStore()

const activeEnvSegmentValues: number[] = [...props.envelopeSegment]

const handleRowValue = (index: number, rowValue: number) => {
  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvelopeSegmentArray', activeEnvSegmentValues)
}

const lowerLimit = ref(0)
const upperLimit = ref(0)

// const activeEnvSegmentValues: number[] = [...props.envelopeSegment]

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

  // props.updateEnvelopeSegmentArray(props.index, activeEnvSegmentValues)
}
</script>

<template>
  <div>
    <div class="flex gap-2">
      <input
        class="w-10 bg-slate-200"
        type="number"
        :id="'lower-limit'"
        :name="'lower-limit'"
        v-model="lowerLimit"
      />
      <input
        class="w-10 bg-slate-200"
        type="number"
        :id="'upper-limit'"
        :name="'upper-limit'"
        v-model="upperLimit"
      />
      <button
        @click="randomize"
        class="cursor-pointer rounded-sm border bg-sky-50 px-3 py-px text-sm font-semibold tracking-wide"
      >
        Randomize
      </button>
    </div>

    <div class="mb-3 flex w-full flex-col-reverse">
      <EnvelopeHarmonicRow
        v-for="(item, index) in 511"
        :key="index"
        :isActive="activeHarmonics.includes(index)"
        :color="store.harmonicRowColors[index]!"
        @rowValue="handleRowValue(index, $event)"
      />
    </div>
  </div>
</template>
