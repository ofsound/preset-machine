<script setup lang="ts">
import FreeformGainColumn from '@/components/FreeformGainColumn.vue'

import { useStore } from '@/stores/store'

const props = defineProps<{
  envelopeSegment: number[]
}>()

const emit = defineEmits(['updateEnvelopeSegmentArray'])

const store = useStore()

const activeEnvSegmentValues: number[] = [...props.envelopeSegment]

const handleColumnValue = (index: number, columnValue: number) => {
  activeEnvSegmentValues[index] = columnValue
  emit('updateEnvelopeSegmentArray', activeEnvSegmentValues)
}

function isPrime(n: number) {
  if (n <= 1) return false
  if (n <= 3) return true

  if (n % 2 === 0 || n % 3 === 0) return false

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false
  }

  return true
}
</script>

<template>
  <div class="mb-3 flex h-full w-full">
    <FreeformGainColumn
      v-for="(item, index) in 200"
      :active="isPrime(index)"
      :key="index"
      :color="store.harmonicRowColors[index]!"
      @columnValue="handleColumnValue(index, $event)"
    />
  </div>
</template>
