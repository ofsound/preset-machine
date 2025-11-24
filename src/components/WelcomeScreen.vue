<script setup lang="ts">
import JsonDrop from './JsonDrop.vue'
</script>
<template>
  <div class="flex h-full flex-col gap-1 *:flex-1">
    <div class="flex flex-col justify-center bg-neutral-300">
      <JsonDrop />
    </div>
    <div class="flex flex-col justify-center bg-stone-400">
      <button
        class="mx-auto flex w-max cursor-pointer flex-col justify-center rounded-sm border bg-gray-200 p-6 text-center italic"
      >
        Create New Sine Machine Preset
      </button>
    </div>
  </div>
</template>
