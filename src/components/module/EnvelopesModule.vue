<script setup lang="ts">
import { ref } from 'vue'

import TempoGridControls from '@/components/module/TempoGridControls.vue'
import ActiveHarmonics from '@/components/module/ActiveHarmonics.vue'
import EnvelopeSegmentMenu from '@/components/module/EnvelopeSegmentMenu.vue'
import EnvelopeSegment from '@/components/module/EnvelopeSegment.vue'

import { usePreset } from '@/composable/usePreset.ts'
import { useStore } from '@/stores/store'

import type { EnvelopeLabelAndSegment } from '@/types.ts'

const store = useStore()

const { presetModLayers } = usePreset()

const presetModLayer = presetModLayers.find(
  (layer) => layer.moduleID === store.visibleModuleID,
)!

const envelopeSegments: EnvelopeLabelAndSegment[] = [
  { label: 'Gain', envelopeSegmentValues: presetModLayer.gains },
  { label: 'Offset', envelopeSegmentValues: presetModLayer.offsets },
  { label: 'Attack', envelopeSegmentValues: presetModLayer.attacks },
  { label: 'Decay', envelopeSegmentValues: presetModLayer.decays },
  { label: 'Sustain', envelopeSegmentValues: presetModLayer.sustains },
  { label: 'Hold', envelopeSegmentValues: presetModLayer.holds },
  { label: 'Release', envelopeSegmentValues: presetModLayer.releases },
]

const lastMenuButtonClickedLabel = ref('Gain')

const grid = ref(0)
const bars = ref(1)
const tempo = ref(120)

const rowPixelHeight = ref('6')
const timeScaleSeconds = ref('5')

const updateTempoGridSetting = (
  newGrid: number,
  newBars: number,
  newTempo: number,
) => {
  grid.value = newGrid
  bars.value = newBars
  tempo.value = newTempo
}

const menuButtonClicked = (item: EnvelopeLabelAndSegment) => {
  lastMenuButtonClickedLabel.value = item.label
}

const activeHarmonics = ref<number[]>(
  Array.from({ length: 511 }, (_, i) => i + 1),
)

const handleActiveHarmonicsUpdate = (newArray: number[]) => {
  activeHarmonics.value = [...newArray]
}

const updateEnvelopeSegmentArray = (index: number, updatedArray: number[]) => {
  envelopeSegments[index]!.envelopeSegmentValues.splice(
    0,
    updatedArray.length,
    ...updatedArray,
  )
}
</script>

<template>
  <div class="flex h-full flex-col overflow-hidden rounded-lg bg-neutral-50">
    <TempoGridControls
      v-show="true"
      @updateTempoGridSetting="updateTempoGridSetting"
    />

    <hr class="border-gray-200" />

    <ActiveHarmonics @updateActiveHarmonics="handleActiveHarmonicsUpdate" />

    <hr class="border-gray-200" />

    <EnvelopeSegmentMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />

    <EnvelopeSegment
      v-for="(item, index) in envelopeSegments"
      v-show="lastMenuButtonClickedLabel === item.label"
      v-model:rowPixelHeight="rowPixelHeight"
      v-model:timeScaleSeconds="timeScaleSeconds"
      :key="index"
      :grid
      :bars
      :tempo
      :activeHarmonics
      :isMagnitude="item.label === 'Gain' || item.label === 'Sustain'"
      :isGain="item.label === 'Gain'"
      :envelopeSegmentValues="item.envelopeSegmentValues"
      @updateEnvelopeSegmentValues="updateEnvelopeSegmentArray(index, $event)"
    />
  </div>
</template>
