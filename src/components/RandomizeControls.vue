<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['randomize'])

const lowerLimit = ref('0')
const upperLimit = ref('0')
</script>

<template>
  <div class="flex justify-center gap-1">
    <input
      class="w-14 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
      type="text"
      :id="'lower-limit'"
      :name="'lower-limit'"
      v-model="lowerLimit"
    />
    <div class="text-lg font-bold">&harr;</div>
    <input
      class="w-14 rounded-sm border border-neutral-300 bg-white p-1 px-2 text-right text-sm font-semibold tabular-nums"
      type="text"
      :id="'upper-limit'"
      :name="'upper-limit'"
      v-model="upperLimit"
    />
    <button
      @click="emit('randomize', Number(lowerLimit), Number(upperLimit))"
      class="ml-2 cursor-pointer rounded-sm text-sm font-semibold tracking-wide"
    >
      <svg width="22" height="22" viewBox="0 0 100 100">
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="15"
          fill="#FFFFFF"
          stroke="#AAAAAA"
          stroke-width="4"
        />
        <circle cx="30" cy="30" r="9" fill="#000000" />
        <circle cx="70" cy="30" r="9" fill="#000000" />
        <circle cx="30" cy="70" r="9" fill="#000000" />
        <circle cx="70" cy="70" r="9" fill="#000000" />
      </svg>
    </button>
  </div>
</template>
