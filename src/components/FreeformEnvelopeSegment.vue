<script setup lang="ts">
import FreeformHarmonicRow from '@/components/FreeformHarmonicRow.vue'

import { useStore } from '@/stores/store'
const store = useStore()

const props = defineProps({
  envelopeSegment: {
    type: Array<number>,
    default: new Array(512).fill(0),
  },
})

const emit = defineEmits(['updateEnvelopeSegmentArray'])

const activeEnvSegmentValues: number[] = [...props.envelopeSegment]

const handleRowValue = (index: number, rowValue: number) => {
  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvelopeSegmentArray', activeEnvSegmentValues)
}
</script>

<template>
  <div class="mb-3 flex w-full flex-col-reverse">
    <FreeformHarmonicRow
      v-for="(item, index) in 35"
      :key="index"
      :color="store.harmonicRowColors[index]!"
      @rowValue="handleRowValue(index, $event)"
    />
  </div>
</template>
