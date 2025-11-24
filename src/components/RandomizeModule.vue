<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

import RandomizeEnvelopeSegment from '@/components/RandomizeEnvelopeSegment.vue'

const envelopeSegments = [
  { label: 'Offset', envelopeSegment: preset.offsets },
  { label: 'Attack', envelopeSegment: preset.attacks },
  { label: 'Decay', envelopeSegment: preset.decays },
  { label: 'Hold', envelopeSegment: preset.holds },
  { label: 'Release', envelopeSegment: preset.releases },
]

const updateEnvelopeSegmentArray = (index: number, updatedArray: number[]) => {
  if (envelopeSegments[index]) {
    envelopeSegments[index].envelopeSegment.forEach((element, i) => {
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
