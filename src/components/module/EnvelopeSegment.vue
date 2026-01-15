<script setup lang="ts">
import { ref } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import { selectText } from '@/utils/helpers'

import RandomizeControls from '@/components/module/RandomizeControls.vue'
import TopRuler from '@/components/module/TopRuler.vue'
import ManualEntry from '@/components/module/ManualEntry.vue'
import MouseStageRows from '@/components/module/MouseStageRows.vue'
import MouseStageColumns from '@/components/module/MouseStageColumns.vue'
import EnvelopeHarmonicRow from '@/components/module/EnvelopeHarmonicRow.vue'
import EnvelopeHarmonicColumn from '@/components/module/EnvelopeHarmonicColumn.vue'

import { useStore } from '@/stores/store'

const props = defineProps<{
  isVisible: boolean
  grid: number
  bars: number
  tempo: number
  activeHarmonics: number[]
  envelopeSegmentValues: number[]
  isMagnitude: boolean
  isGain: boolean
}>()

const emit = defineEmits(['updateEnvelopeSegmentValues'])

const store = useStore()

const rowPixelHeight = defineModel<string>('rowPixelHeight', { required: true })
const timeScaleSeconds = defineModel<string>('timeScaleSeconds', {
  required: true,
})

const currentHarmonicIndex = ref(0)
const currentHarmonicValue = ref(0)

const activeEnvSegmentValues: number[] = [...props.envelopeSegmentValues]

const envelopeHarmonicRowRefs = ref<InstanceType<typeof EnvelopeHarmonicRow>[]>(
  [],
)

const envelopeHarmonicColumnRefs = ref<
  InstanceType<typeof EnvelopeHarmonicColumn>[]
>([])

const setRefsRows = (
  el: InstanceType<typeof EnvelopeHarmonicRow> | null,
  index: number,
) => {
  if (el) {
    envelopeHarmonicRowRefs.value[index] = el
  }
}

const setRefsColumns = (
  el: InstanceType<typeof EnvelopeHarmonicColumn> | null,
  index: number,
) => {
  if (el) {
    envelopeHarmonicColumnRefs.value[index] = el
  }
}

const handleUpdateRowValue = (index: number, rowValue: number) => {
  currentHarmonicIndex.value = index
  currentHarmonicValue.value = rowValue

  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvelopeSegmentValues', activeEnvSegmentValues)
}

const randomize = (lowerLimit: number, upperLimit: number) => {
  if (!props.isMagnitude) {
    envelopeHarmonicRowRefs.value.forEach((childInstance, index) => {
      if (props.activeHarmonics.includes(index))
        childInstance.setRandomValueInRange(lowerLimit, upperLimit)
    })
  } else {
    envelopeHarmonicColumnRefs.value.forEach((childInstance, index) => {
      if (props.activeHarmonics.includes(index))
        childInstance.setRandomValueInRange(lowerLimit, upperLimit)
    })
  }
}

const updateRowValueFromManual = (rowIndex: number, newRowValue: number) => {
  if (!props.isMagnitude) {
    envelopeHarmonicRowRefs.value.forEach((childInstance, index) => {
      if (index === rowIndex) childInstance.setManualValue(newRowValue)
    })
  } else {
    envelopeHarmonicColumnRefs.value.forEach((childInstance, index) => {
      if (index === rowIndex) childInstance.setManualValue(newRowValue)
    })
  }
}

const handleNewValueFromMouseStage = (
  rowIndex: number,
  newRowValue: number,
) => {
  if (props.activeHarmonics.includes(rowIndex) || newRowValue === 0) {
    envelopeHarmonicRowRefs.value.forEach((childInstance, index) => {
      if (index === rowIndex) childInstance.setRatioValue(newRowValue)
    })
  }
  if (props.activeHarmonics.includes(rowIndex) || newRowValue === 0) {
    envelopeHarmonicColumnRefs.value.forEach((childInstance, index) => {
      if (index === rowIndex) childInstance.setRatioValue(newRowValue)
    })
  }
}
</script>

<template>
  <div
    class="flex h-full min-h-0 flex-1 flex-col bg-linear-to-b from-zinc-200/60 to-neutral-50 to-30% px-4 pt-4"
  >
    <div class="mb-4 flex justify-between">
      <RandomizeControls @randomize="randomize" />
      <ManualEntry
        :currentHarmonicIndex
        :currentHarmonicValue
        @updateRowValue="updateRowValueFromManual"
      />
      <div v-if="!isMagnitude" class="flex w-1/3 justify-end gap-4">
        <div v-show="grid === 0" class="flex gap-2">
          <div class="self-center text-xs">Time Scale (s)</div>
          <input
            type="text"
            :id="`time-scale${uuidv4()}`"
            name="time-scale"
            v-model="timeScaleSeconds"
            @click="selectText"
            class="w-9 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
          />
        </div>
        <div class="hidden gap-2">
          <div class="self-center text-xs">Row Height (px)</div>
          <input
            type="text"
            :id="`row-height${uuidv4()}`"
            name="row-height"
            v-model="rowPixelHeight"
            @click="selectText"
            class="w-9 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
          />
        </div>
      </div>
    </div>

    <TopRuler
      v-if="!isMagnitude"
      :timeScaleSeconds="parseInt(timeScaleSeconds)"
      :grid
      :bars
    />

    <div class="min-h-0 flex-1">
      <div
        v-if="!isMagnitude"
        class="relative flex h-full w-full flex-col-reverse bg-white"
      >
        <MouseStageRows
          v-if="isVisible"
          :rowPixelHeight
          :numHarmonics="activeHarmonics[activeHarmonics.length - 1]! + 1"
          @newValueFromMouseStage="handleNewValueFromMouseStage"
        />
        <EnvelopeHarmonicRow
          v-for="(item, index) in 511"
          v-show="index <= activeHarmonics[activeHarmonics.length - 1]!"
          :key="index"
          :ref="
            (el) =>
              setRefsRows(el as InstanceType<typeof EnvelopeHarmonicRow>, index)
          "
          :isActive="activeHarmonics.includes(index)"
          :color="store.harmonicRowColors[index]!"
          :rowPixelHeight
          :timeScaleSeconds="parseInt(timeScaleSeconds)"
          :grid
          :bars
          :tempo
          :startingValue="envelopeSegmentValues[index]!"
          @updateRowValue="handleUpdateRowValue(index, $event)"
        />
      </div>
      <div v-else class="relative flex h-full bg-white">
        <MouseStageColumns
          v-if="isVisible"
          :numHarmonics="activeHarmonics[activeHarmonics.length - 1]! + 1"
          @newValueFromMouseStage="handleNewValueFromMouseStage"
        />

        <EnvelopeHarmonicColumn
          v-for="(item, index) in 511"
          v-show="index <= activeHarmonics[activeHarmonics.length - 1]!"
          :key="index"
          :ref="
            (el) =>
              setRefsColumns(
                el as InstanceType<typeof EnvelopeHarmonicColumn>,
                index,
              )
          "
          :isActive="activeHarmonics.includes(index)"
          :color="store.harmonicRowColors[index]!"
          :timeScaleSeconds="parseInt(timeScaleSeconds)"
          :grid
          :bars
          :tempo
          :isGain
          :index
          :startingValue="envelopeSegmentValues[index]!"
          @updateRowValue="handleUpdateRowValue(index, $event)"
        />
      </div>
    </div>
  </div>
</template>
