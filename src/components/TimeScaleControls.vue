<script setup lang="ts">
const emit = defineEmits(['updateTimeScale'])

// const timeScaleOptions = ['5s', '10s', '20s', '30s']

const timeScaleOptions = [
  { timeScale: '5s', divisions: 5 },
  { timeScale: '10s', divisions: 5 },
  { timeScale: '20s', divisions: 10 },
  { timeScale: '30s', divisions: 10 },
]
</script>

<template>
  <div class="mb-2 flex justify-end gap-2">
    <button
      v-for="timeScaleOption in timeScaleOptions"
      :key="timeScaleOption.timeScale"
      :value="parseInt(timeScaleOption.timeScale)"
      @click="
        emit(
          'updateTimeScale',
          parseInt(timeScaleOption.timeScale),
          timeScaleOption.divisions,
        )
      "
      class="cursor-pointer rounded-sm border p-1 text-sm"
    >
      {{ timeScaleOption.timeScale }}
    </button>
  </div>
</template>
