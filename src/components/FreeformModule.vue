<script setup lang="ts">
import { usePreset } from '@/composable/usePreset.ts'
const { preset } = usePreset()

// import FreeformDraw from '@/components/FreeformDraw.vue'
import FreeformEnvelope from '@/components/FreeformEnvelope.vue'

const envSegments = [
  { label: 'Offset', envSegment: preset.offsets },
  { label: 'Attack', envSegment: preset.attacks },
  { label: 'Decay', envSegment: preset.decays },
  { label: 'Hold', envSegment: preset.holds },
  { label: 'Release', envSegment: preset.releases },
]

const updateEnvSegmentArray = (index: number, updatedArray: number[]) => {
  console.log('*')

  if (envSegments[index]) {
    envSegments[index].envSegment.forEach((element, i) => {
      envSegments[index]!.envSegment[i] = updatedArray[i]
    })
  }
}
</script>

<template>
  <div class="flex">
    <FreeformEnvelope
      v-for="(item, index) in envSegments"
      :key="index"
      :index="index"
      :envSegment="item.envSegment"
      :label="item.label"
      @updateEnvSegmentArray="updateEnvSegmentArray(index, $event)"
    />
    <!-- <FreeformDraw
      v-for="(item, index) in envSegments"
      :key="index"
      :index="index"
      :envSegment="item.envSegment"
      :label="item.label"
      :updateEnvSegmentArray="updateEnvSegmentArray"
    /> -->
  </div>
</template>
