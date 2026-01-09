<script setup lang="ts">
import { ref } from 'vue'

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
const bars = ref<number>(4)
const tempo = ref<number>(120)

const handleNewValue = () => {
  emit('updateTempoGridSetting', grid.value, bars.value, tempo.value)
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
        name="hold-length"
        id="hold-length"
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
        name="bars"
        id="bars"
        class="w-9 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold text-black tabular-nums"
        type="text"
        v-model="bars"
        @input="handleNewValue"
      />
    </div>
    <div
      :class="{ 'pointer-events-none opacity-20': grid! === 0 }"
      class="text-sm font-semibold text-neutral-700"
    >
      Tempo:&nbsp;&nbsp;
      <input
        name="tempo"
        id="tempo"
        class="w-11 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold text-black tabular-nums"
        type="text"
        v-model="tempo"
        @input="handleNewValue"
      />
    </div>
  </div>
</template>
