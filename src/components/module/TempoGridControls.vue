<script setup lang="ts">
import { ref } from 'vue'

import { v4 as uuidv4 } from 'uuid'

import { selectText } from '@/utils/helpers'

const emit = defineEmits(['updateTempoGridSetting'])

const toolOptions = ref([
  { text: 'none', value: 0 },
  { text: '1/2', value: 8 },
  { text: '1/4', value: 4 },
  { text: '1/8D', value: 3 },
  { text: '1/8', value: 2 },
  { text: '1/16', value: 1 },
])

const grid = ref<number>(0)
const bars = ref<string>('4')
const tempo = ref<string>('120')

const handleNewValue = () => {
  emit(
    'updateTempoGridSetting',
    grid.value,
    Math.min(Number(bars.value), 1),
    Number(tempo.value),
  )
}
</script>

<template>
  <div class="flex gap-8 p-4">
    <div
      class="w-34 self-center text-[15px] font-bold tracking-wider text-zinc-400 uppercase"
    >
      Tempo Sync
    </div>
    <div class="text-sm font-semibold text-neutral-700">
      Grid:&nbsp;&nbsp;
      <select
        name="grid"
        :id="`grid${uuidv4()}`"
        class="w-18 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold text-black tabular-nums"
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
    <div
      :class="{ 'pointer-events-none opacity-20': grid! === 0 }"
      class="text-sm font-semibold text-neutral-700"
    >
      Bars:&nbsp;&nbsp;
      <input
        type="text"
        name="bars"
        :id="`bars${uuidv4()}`"
        v-model="bars"
        @input="handleNewValue"
        @click="selectText"
        class="w-9 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold text-black tabular-nums"
      />
    </div>
    <div
      :class="{ 'pointer-events-none opacity-20': grid! === 0 }"
      class="text-sm font-semibold text-neutral-700"
    >
      Tempo:&nbsp;&nbsp;
      <input
        type="text"
        name="tempo"
        :id="`tempo${uuidv4()}`"
        v-model="tempo"
        @input="handleNewValue"
        @click="selectText"
        class="w-11 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold text-black tabular-nums"
      />
    </div>
  </div>
</template>
