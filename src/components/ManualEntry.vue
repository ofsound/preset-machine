<script setup lang="ts">
defineProps<{
  currentHarmonicIndex: number
  currentHarmonicValue: number
}>()
</script>

<template>
  <div class="mb-2 flex gap-2 bg-gray-100">
    <input
      type="text"
      id="harmonicIndex"
      name="harmonicIndex"
      class="w-10 rounded-sm border bg-white px-1"
      :value="currentHarmonicIndex"
    />
    <input
      type="text"
      id="harmonicValue"
      name="harmonicValue"
      class="w-18 rounded-sm border bg-white px-1"
      :value="currentHarmonicValue"
    />
  </div>
</template>
