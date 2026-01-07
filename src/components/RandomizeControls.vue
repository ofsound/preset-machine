<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['randomize'])

const lowerLimit = ref(0)
const upperLimit = ref(0)
</script>

<template>
  <div class="mb-4 flex justify-center gap-2 border">
    <input
      class="w-16 bg-slate-200"
      type="number"
      :id="'lower-limit'"
      :name="'lower-limit'"
      v-model="lowerLimit"
    />
    <input
      class="w-16 bg-slate-200"
      type="number"
      :id="'upper-limit'"
      :name="'upper-limit'"
      v-model="upperLimit"
    />
    <button
      @click="emit('randomize', lowerLimit, upperLimit)"
      class="cursor-pointer rounded-sm border bg-sky-50 px-3 py-px text-sm font-semibold tracking-wide"
    >
      Randomize
    </button>
  </div>
</template>
