<script setup lang="ts">
import { ref } from 'vue'

import RandomizeControls from '@/components/RandomizeControls.vue'
import TopMargin from '@/components/TopMargin.vue'
import ManualEntry from '@/components/ManualEntry.vue'
import EnvelopeHarmonicRow from '@/components/EnvelopeHarmonicRow.vue'

import { useStore } from '@/stores/store'

const props = defineProps<{
  grid: number
  bars: number
  tempo: number
  activeHarmonics: number[]
  envelopeSegmentValues: number[]
}>()

const emit = defineEmits(['updateEnvelopeSegmentValues'])

const store = useStore()

const maxSeconds = ref<number>(5)
const numDivisions = ref<number>(5)

const rowPixelHeight = ref('6')
const timeScaleSeconds = ref('5')

const currentHarmonicIndex = ref(0)
const currentHarmonicValue = ref(0)

const activeEnvSegmentValues: number[] = [...props.envelopeSegmentValues]

const envelopeHarmonicRowRefs = ref<InstanceType<typeof EnvelopeHarmonicRow>[]>(
  [],
)

const setRefs = (
  el: InstanceType<typeof EnvelopeHarmonicRow> | null,
  index: number,
) => {
  if (el) {
    envelopeHarmonicRowRefs.value[index] = el
  }
}

const handleUpdateRowValue = (index: number, rowValue: number) => {
  currentHarmonicIndex.value = index
  currentHarmonicValue.value = rowValue

  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvelopeSegmentValues', activeEnvSegmentValues)
}

const randomize = (lowerLimit: number, upperLimit: number) => {
  envelopeHarmonicRowRefs.value.forEach((childInstance, index) => {
    if (props.activeHarmonics.includes(index))
      childInstance.setRandomValueInRange(lowerLimit, upperLimit)
  })
}

const updateTimeScale = (newMaxSeconds: number, newNumDivisions: number) => {
  maxSeconds.value = newMaxSeconds
  numDivisions.value = newNumDivisions
}

const updateRowValueFromManual = (rowIndex: number, newRowValue: number) => {
  envelopeHarmonicRowRefs.value.forEach((childInstance, index) => {
    if (index === rowIndex) childInstance.setManualValue(newRowValue)
  })
}
</script>

<template>
  <div class="bg-slate-200 px-4 pt-6">
    <div class="flex justify-between">
      <ManualEntry
        :currentHarmonicIndex
        :currentHarmonicValue
        @updateRowValue="updateRowValueFromManual"
      />
      <RandomizeControls @randomize="randomize" />

      <!-- <TimeScaleControls
        v-show="grid === 0"
        @updateTimeScale="updateTimeScale"
      /> -->
      <input
        type="text"
        class="w-14 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold tabular-nums"
        v-model="timeScaleSeconds"
      />

      <input
        type="text"
        class="w-14 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold tabular-nums"
        v-model="rowPixelHeight"
      />
    </div>

    <TopMargin :timeScaleSeconds="parseInt(timeScaleSeconds)" :grid :bars />

    <div class="mb-3 flex w-full flex-col-reverse">
      <EnvelopeHarmonicRow
        v-for="(item, index) in activeHarmonics[activeHarmonics.length - 1]"
        :key="index"
        :ref="
          (el) => setRefs(el as InstanceType<typeof EnvelopeHarmonicRow>, index)
        "
        :isActive="activeHarmonics.includes(index)"
        :color="store.harmonicRowColors[index]!"
        :rowPixelHeight
        :timeScaleSeconds="parseInt(timeScaleSeconds)"
        :grid
        :bars
        :tempo
        @updateRowValue="handleUpdateRowValue(index, $event)"
      />
    </div>
  </div>
</template>
