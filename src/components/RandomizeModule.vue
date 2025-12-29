<script setup lang="ts">
import RandomizeEnvelopeSegment from '@/components/RandomizeEnvelopeSegment.vue'

import { useStore } from '@/stores/store'

import { usePreset } from '@/composable/usePreset.ts'

import type { EnvelopeLabelAndSegment } from '@/types.ts'

const store = useStore()

const { corePreset, presetModLayers } = usePreset()

const presetModLayer = presetModLayers.find(
  (layer) => layer.moduleID === store.visibleModuleID,
)

console.log(presetModLayer)

const envelopeSegments: EnvelopeLabelAndSegment[] = [
  { label: 'Offset', envelopeSegment: corePreset.offsets },
  { label: 'Attack', envelopeSegment: corePreset.attacks },
  { label: 'Decay', envelopeSegment: corePreset.decays },
  { label: 'Hold', envelopeSegment: corePreset.holds },
  { label: 'Release', envelopeSegment: corePreset.releases },
]

const updateEnvelopeSegmentArray = (index: number, updatedArray: number[]) => {
  if (envelopeSegments[index]) {
    envelopeSegments[index].envelopeSegment.forEach((element, i) => {
      if (updatedArray[i])
        envelopeSegments[index]!.envelopeSegment[i] = updatedArray[i]
    })
  }
}
</script>

<template>
  <div>
    <RandomizeEnvelopeSegment
      v-for="(item, index) in envelopeSegments"
      :key="index"
      :index="index"
      :envelopeSegment="item.envelopeSegment"
      :label="item.label"
      :updateEnvelopeSegmentArray="updateEnvelopeSegmentArray"
    />
  </div>
</template>
