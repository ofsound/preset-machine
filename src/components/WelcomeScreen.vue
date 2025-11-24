<script setup lang="ts">
import JsonDrop from './JsonDrop.vue'

defineEmits(['closeWelcome'])
</script>
<template>
  <div class="flex h-full flex-col gap-1 *:flex-1">
    <div class="flex flex-col justify-center bg-neutral-300">
      <JsonDrop @jsonLoaded="$emit('closeWelcome')" />
    </div>
    <div class="flex flex-col justify-center bg-stone-400">
      <button
        @click="$emit('closeWelcome')"
        class="mx-auto flex h-30 w-110 cursor-pointer flex-col justify-center rounded-sm border bg-gray-200 p-6 text-center font-semibold italic hover:bg-white"
      >
        <div class="mx-auto">Create New Sine Machine Preset</div>
      </button>
    </div>
  </div>
</template>
