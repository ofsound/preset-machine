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
  <div class="flex gap-4 rounded-sm p-4">
    <div class="w-36 font-bold">Tempo Sync</div>
    <div class="text-sm font-semibold">
      Grid:
      <select
        name="hold-length"
        id="hold-length"
        class="w-20 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold tabular-nums"
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
    <div v-show="grid !== 0" class="text-sm font-semibold">
      Bars:
      <input
        name="bars"
        id="bars"
        class="w-14 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold tabular-nums"
        type="text"
        v-model="bars"
        @input="handleNewValue"
      />
    </div>
    <div v-show="grid !== 0" class="text-sm font-semibold">
      Tempo:
      <input
        name="tempo"
        id="tempo"
        class="w-14 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold tabular-nums"
        type="text"
        v-model="tempo"
        @input="handleNewValue"
      />
    </div>
  </div>
</template>
