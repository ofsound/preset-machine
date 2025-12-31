<script setup lang="ts">
import EnvelopesHarmonicRow from '@/components/EnvelopesHarmonicRow.vue'

import { useStore } from '@/stores/store'

const props = defineProps<{
  envelopeSegment: number[]
}>()

const emit = defineEmits(['updateEnvelopeSegmentArray'])

const store = useStore()

const activeEnvSegmentValues: number[] = [...props.envelopeSegment]

const handleRowValue = (index: number, rowValue: number) => {
  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvelopeSegmentArray', activeEnvSegmentValues)
}
</script>

<template>
  <div class="mb-3 flex w-full flex-col-reverse">
    <EnvelopesHarmonicRow
      v-for="(item, index) in 35"
      :key="index"
      :color="store.harmonicRowColors[index]!"
      @rowValue="handleRowValue(index, $event)"
    />
  </div>
</template>
