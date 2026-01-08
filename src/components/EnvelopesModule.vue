<script setup lang="ts">
import { ref } from 'vue'

import TempoGridControls from '@/components//TempoGridControls.vue'
import ActiveHarmonics from '@/components//ActiveHarmonics.vue'
import EnvelopeSegmentMenu from '@/components/EnvelopeSegmentMenu.vue'
import EnvelopeSegment from '@/components/EnvelopeSegment.vue'

import { usePreset } from '@/composable/usePreset.ts'
import { useStore } from '@/stores/store'

import type { EnvelopeLabelAndSegment } from '@/types.ts'

const store = useStore()

const { presetModLayers } = usePreset()

const presetModLayer = presetModLayers.find(
  (layer) => layer.moduleID === store.visibleModuleID,
)!

const envelopeSegments: EnvelopeLabelAndSegment[] = [
  { label: 'Offset', envelopeSegmentValues: presetModLayer.offsets },
  { label: 'Attack', envelopeSegmentValues: presetModLayer.attacks },
  { label: 'Decay', envelopeSegmentValues: presetModLayer.decays },
  { label: 'Hold', envelopeSegmentValues: presetModLayer.holds },
  { label: 'Release', envelopeSegmentValues: presetModLayer.releases },
]

const lastMenuButtonClickedLabel = ref('Offset')

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
  <div>
    <TempoGridControls v-show="true" />

    <ActiveHarmonics @update:active-harmonics="handleActiveHarmonicsUpdate" />

    <EnvelopeSegmentMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />

    <div class="mt-4 w-full">
      <EnvelopeSegment
        v-for="(item, index) in envelopeSegments"
        v-show="lastMenuButtonClickedLabel === item.label"
        :key="index"
        :activeHarmonics
        :envelopeSegmentValues="item.envelopeSegmentValues"
        @updateEnvelopeSegmentValues="updateEnvelopeSegmentArray(index, $event)"
      />
    </div>
  </div>
</template>
