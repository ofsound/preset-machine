<script setup lang="ts">
import RandomizeEnvelopeSegment from '@/components/RandomizeEnvelopeSegment.vue'

import { useStore } from '@/stores/store'

import { usePreset } from '@/composable/usePreset.ts'

import type { EnvelopeLabelAndSegment } from '@/types.ts'

const store = useStore()

const { presetModLayers, finalPreset } = usePreset()

const presetModLayer = presetModLayers.find(
  (layer) => layer.moduleID === store.visibleModuleID,
)!

const envelopeSegments: EnvelopeLabelAndSegment[] = [
  { label: 'Offset', envelopeSegment: presetModLayer.offsets },
  { label: 'Attack', envelopeSegment: presetModLayer.attacks },
  { label: 'Decay', envelopeSegment: presetModLayer.decays },
  { label: 'Hold', envelopeSegment: presetModLayer.holds },
  { label: 'Release', envelopeSegment: presetModLayer.releases },
]

const updateEnvelopeSegmentArray = (index: number, updatedArray: number[]) => {
  if (envelopeSegments[index]) {
    envelopeSegments[index].envelopeSegment.forEach((element, i) => {
      if (updatedArray[i])
        envelopeSegments[index]!.envelopeSegment[i] = updatedArray[i]
    })
  }

  console.log(finalPreset.value)
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
