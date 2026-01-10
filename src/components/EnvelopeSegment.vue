<script setup lang="ts">
import { ref } from 'vue'

import { v4 as uuidv4 } from 'uuid'

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

// const updateTimeScale = (newMaxSeconds: number, newNumDivisions: number) => {
//   maxSeconds.value = newMaxSeconds
//   numDivisions.value = newNumDivisions
// }

const updateRowValueFromManual = (rowIndex: number, newRowValue: number) => {
  envelopeHarmonicRowRefs.value.forEach((childInstance, index) => {
    if (index === rowIndex) childInstance.setManualValue(newRowValue)
  })
}
</script>

<template>
  <div
    class="flex h-full min-h-0 flex-1 flex-col bg-linear-to-b from-zinc-200/60 to-neutral-50 to-30% px-4 pt-4"
  >
    <div class="mb-4 flex justify-between">
      <div class="flex gap-8">
        <RandomizeControls @randomize="randomize" />
        <ManualEntry
          :currentHarmonicIndex
          :currentHarmonicValue
          @updateRowValue="updateRowValueFromManual"
        />
      </div>

      <div class="flex gap-4">
        <div v-show="grid === 0" class="flex gap-2">
          <div class="self-center text-xs">Time Scale (s)</div>
          <input
            :id="`time-scale${uuidv4()}`"
            name="time-scale"
            type="text"
            class="w-9 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
            v-model="timeScaleSeconds"
          />
        </div>
        <div class="flex gap-2">
          <div class="self-center text-xs">Row Height (px)</div>
          <input
            :id="`row-height${uuidv4()}`"
            name="row-height"
            type="text"
            class="w-9 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
            v-model="rowPixelHeight"
          />
        </div>
      </div>
    </div>

    <TopMargin :timeScaleSeconds="parseInt(timeScaleSeconds)" :grid :bars />

    <div class="min-h-0 flex-1 overflow-scroll">
      <div class="flex w-full flex-col-reverse overflow-auto bg-white">
        <EnvelopeHarmonicRow
          v-for="(item, index) in activeHarmonics[activeHarmonics.length - 1]"
          :key="index"
          :ref="
            (el) =>
              setRefs(el as InstanceType<typeof EnvelopeHarmonicRow>, index)
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
  </div>
</template>
