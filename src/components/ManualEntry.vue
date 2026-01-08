<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  currentHarmonicIndex: number
  currentHarmonicValue: number
}>()

const harmonicIndex = ref(props.currentHarmonicIndex)
const harmonicValue = ref(props.currentHarmonicValue)

const emit = defineEmits(['updateRowValue'])

const handleUserInput = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value
  emit('updateRowValue', harmonicIndex.value, newValue)
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
  <div class="mb-2 flex gap-2 bg-gray-100">
    <input
      type="text"
      id="harmonicIndex"
      name="harmonicIndex"
      class="w-10 rounded-sm border bg-white px-1"
      v-model="harmonicIndex"
    />
    <input
      type="text"
      id="harmonicValue"
      name="harmonicValue"
      class="w-18 rounded-sm border bg-white px-1"
      :value="currentHarmonicValue"
      @input="handleUserInput"
    />
  </div>
</template>
