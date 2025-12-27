<script setup lang="ts">
import RandomizeEnvelopeSegment from '@/components/RandomizeEnvelopeSegment.vue'

import { usePreset } from '@/composable/usePreset.ts'

import type { EnvelopeLabelAndSegment } from '@/types.ts'

const { preset } = usePreset()

const envelopeSegments: EnvelopeLabelAndSegment[] = [
  { label: 'Offset', envelopeSegment: preset.offsets },
  { label: 'Attack', envelopeSegment: preset.attacks },
  { label: 'Decay', envelopeSegment: preset.decays },
  { label: 'Hold', envelopeSegment: preset.holds },
  { label: 'Release', envelopeSegment: preset.releases },
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
