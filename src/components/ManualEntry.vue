<script setup lang="ts">
import { ref, watch } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import { selectText } from '@/utils/helpers'

const props = defineProps<{
  currentHarmonicIndex: number
  currentHarmonicValue: number
}>()

const harmonicIndex = ref(props.currentHarmonicIndex + 1)
const harmonicValue = ref(props.currentHarmonicValue)

const emit = defineEmits(['updateRowValue'])

const handleUserInput = () => {
  emit('updateRowValue', harmonicIndex.value - 1, harmonicValue.value)
}

watch(
  () => props.currentHarmonicIndex,
  (newValue) => {
    harmonicIndex.value = newValue + 1
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
  <div class="mx-auto flex w-1/3 justify-center gap-2">
    <input
      type="text"
      :id="`harmonic-index${uuidv4()}`"
      name="harmonic-index"
      v-model="harmonicIndex"
      @click="selectText"
      class="w-11 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
    />
    <input
      type="text"
      :id="`harmonic-value${uuidv4()}`"
      name="harmonic-value"
      v-model="harmonicValue"
      @keyup.enter="handleUserInput"
      @click="selectText"
      class="w-16 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
    />
  </div>
</template>
