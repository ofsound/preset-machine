<script setup lang="ts">
import { ref, watch } from 'vue'

import { v4 as uuidv4 } from 'uuid'

const props = defineProps<{
  currentHarmonicIndex: number
  currentHarmonicValue: number
}>()

const harmonicIndex = ref(props.currentHarmonicIndex)
const harmonicValue = ref(props.currentHarmonicValue)

const emit = defineEmits(['updateRowValue'])

const handleUserInput = () => {
  emit('updateRowValue', harmonicIndex.value, harmonicValue.value)
}

watch(
  () => props.currentHarmonicIndex,
  (newValue) => {
    harmonicIndex.value = newValue
  },
)
watch(
  () => props.currentHarmonicValue,
  (newValue) => {
    harmonicValue.value = newValue
  },
)
</script>

<template>
  <div class="flex gap-2">
    <input
      type="text"
      :id="`harmonic-index${uuidv4()}`"
      name="harmonic-index"
      class="w-11 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
      v-model="harmonicIndex"
    />
    <input
      type="text"
      :id="`harmonic-value${uuidv4()}`"
      name="harmonic-value"
      class="w-16 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
      :value="currentHarmonicValue"
      @keyup.enter="handleUserInput"
    />
  </div>
</template>
