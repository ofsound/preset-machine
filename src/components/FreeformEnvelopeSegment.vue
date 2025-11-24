<script setup lang="ts">
import FreeformDrawSlider from '@/components/FreeformDrawSlider.vue'

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
  <div class="mb-3 w-full">
    <FreeformDrawSlider
      v-for="(item, index) in 36"
      :key="index"
      :index="index"
      @rowValue="handleRowValue(index, $event)"
    />
  </div>
</template>
