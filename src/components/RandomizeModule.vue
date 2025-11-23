<script setup lang="ts">
import { useStore } from '@/stores/store'

import RandomizeEnv from '@/components/RandomizeEnv.vue'

const store = useStore()

const envSegments = [
  { label: 'Offset', envSegment: store.preset.offsets },
  { label: 'Attack', envSegment: store.preset.attacks },
  { label: 'Decay', envSegment: store.preset.decays },
  { label: 'Hold', envSegment: store.preset.holds },
  { label: 'Release', envSegment: store.preset.releases },
]

const updateEnvSegmentArray = (index: number, updatedArray: number[]) => {
  if (envSegments[index]) {
    envSegments[index].envSegment = updatedArray
  }
}
</script>

<template>
  <div>
    <RandomizeEnv
      v-for="(item, index) in envSegments"
      :key="index"
      :index="index"
      :envSegment="item.envSegment"
      :label="item.label"
      :updateEnvSegmentArray="updateEnvSegmentArray"
    />
  </div>
</template>

<!-- Maybe that should be an array here rather than listing out RandomizeEnv -->
