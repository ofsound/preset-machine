<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['updateTempoGridSetting'])

const toolOptions = ref([
  { text: 'none', value: 0 },
  { text: '1/2', value: 8 },
  { text: '1/4', value: 4 },
  { text: 'Dotted 1/8', value: 3 },
  { text: '1/8', value: 2 },
  { text: '1/16', value: 1 },
])

const grid = ref<number>(0)
const bars = ref<number>(4)
const tempo = ref<number>(120)

const handleNewValue = () => {
  emit('updateTempoGridSetting', grid.value, bars.value, tempo.value)
}
</script>

<template>
  <div class="mb-6 flex gap-4 rounded-sm">
    <div>
      Grid:
      <select
        name="hold-length"
        id="hold-length"
        class="bg-gray-3 rounded-sm bg-gray-300 p-1 text-black"
        v-model="grid"
        @change="handleNewValue"
      >
        <option
          v-for="toolOption in toolOptions"
          :key="toolOption.value"
          :value="toolOption.value"
        >
          {{ toolOption.text }}
        </option>
      </select>
    </div>
    <div v-show="grid !== 0">
      Bars:
      <input
        name="bars"
        id="bars"
        class="max-w-14 rounded-sm bg-gray-300 p-1"
        type="number"
        v-model="bars"
        @input="handleNewValue"
      />
    </div>
    <div v-show="grid !== 0" class="ml-auto">
      Tempo:
      <input
        name="tempo"
        id="tempo"
        class="max-w-14 rounded-sm bg-gray-300 p-1"
        type="number"
        v-model="tempo"
        @input="handleNewValue"
      />
    </div>
  </div>
</template>
