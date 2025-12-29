<script setup lang="ts">
import { ref } from 'vue'

import FreeformModuleMenu from '@/components/FreeformModuleMenu.vue'
import BipolarEnvelopeSegment from '@/components/BipolarEnvelopeSegment.vue'

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
  envelopeSegments[index]!.envelopeSegment.splice(
    0,
    updatedArray.length,
    ...updatedArray,
  )
}

const lastMenuButtonClickedLabel = ref('Offset')

const menuButtonClicked = (item: EnvelopeLabelAndSegment) => {
  lastMenuButtonClickedLabel.value = item.label
}
</script>

<template>
  <div>
    <FreeformModuleMenu
      :envelopeSegments="envelopeSegments"
      @menuButtonClicked="menuButtonClicked"
      :lastMenuButtonClickedLabel="lastMenuButtonClickedLabel"
    />
    <div class="flex">
      <div class="mt-4 flex flex-1 -scale-x-100">
        <BipolarEnvelopeSegment
          v-for="(item, index) in envelopeSegments"
          v-show="lastMenuButtonClickedLabel === item.label"
          :key="index"
          :envelopeSegment="item.envelopeSegment"
          @updateEnvelopeSegmentArray="
            updateEnvelopeSegmentArray(index, $event)
          "
        />
      </div>
      <div class="mt-4 flex flex-1">
        <BipolarEnvelopeSegment
          v-for="(item, index) in envelopeSegments"
          v-show="lastMenuButtonClickedLabel === item.label"
          :key="index"
          :envelopeSegment="item.envelopeSegment"
          @updateEnvelopeSegmentArray="
            updateEnvelopeSegmentArray(index, $event)
          "
        />
      </div>
    </div>
  </div>
</template>
