<script setup lang="ts">
import FreeformDrawSlider from '@/components/FreeformDrawSlider.vue'

const props = defineProps({
  envSegment: {
    type: Array<number>,
    default: new Array(512).fill(0),
  },
  label: {
    type: String,
  },
})

const emit = defineEmits(['updateEnvSegmentArray'])

const activeEnvSegmentValues: number[] = [...props.envSegment]

const handleRowValue = (index: number, rowValue: number) => {
  activeEnvSegmentValues[index] = rowValue
  emit('updateEnvSegmentArray', activeEnvSegmentValues)
}
</script>

<template>
  <div class="mb-3 w-full">
    <div class="mb-1 font-semibold">{{ label }}</div>
    <FreeformDrawSlider
      v-for="(item, index) in 36"
      :key="index"
      :index="index"
      @rowValue="handleRowValue(index, $event)"
    />
  </div>
</template>
