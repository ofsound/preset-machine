<script setup lang="ts">
import { ref } from 'vue'

const toolOptionValue = ref<number>(1)

const toolOptions = ref([
  { text: 'none', value: 0 },
  { text: '1/2', value: 8 },
  { text: '1/4', value: 4 },
  { text: 'Dotted 1/8', value: 3 },
  { text: '1/8', value: 2 },
  { text: '1/16', value: 1 },
])

const tempo = ref<number>(120)
</script>

<template>
  <div class="flex rounded-sm bg-gray-200 p-4">
    <div class="">
      Tempo:
      <input
        name="tempo"
        id="tempo"
        class="max-w-14 rounded-sm bg-gray-300 p-1"
        type="number"
        v-model="tempo"
      />
    </div>
    <div class>
      Grid:
      <select
        name="hold-length"
        id="hold-length"
        class="bg-gray-3 rounded-sm bg-gray-300 p-1 text-black"
        v-model="toolOptionValue"
      >
        <option value="-1" disabled>Hold note value</option>
        <option
          v-for="toolOption in toolOptions"
          :key="toolOption.value"
          :value="toolOption.value"
        >
          {{ toolOption.text }}
        </option>
      </select>
    </div>
  </div>
</template>
