<script setup lang="ts">
import JsonDrop from '@/components/JsonDrop.vue'

defineEmits(['closeWelcome'])
</script>
<template>
  <div
    class="flex h-full flex-col justify-center bg-linear-to-tl from-slate-300 via-rose-100 to-purple-300 px-10"
  >
    <h1
      class="mx-auto -mt-16 mb-12 text-5xl font-bold tracking-wider text-shadow-blue-800/20 text-shadow-md"
    >
      PRESET MACHINE
    </h1>
    <div
      class="mx-auto flex h-70 w-190 overflow-hidden rounded-md border border-stone-300/80 shadow-lg *:flex-1"
    >
      <div
        class="flex flex-col justify-center border-r border-slate-300 bg-gray-300/45"
      >
        <JsonDrop @jsonLoaded="$emit('closeWelcome')" />
      </div>
      <div class="flex flex-col justify-center bg-neutral-300/45">
        <button
          @click="$emit('closeWelcome')"
          class="mx-auto flex h-36 w-60 cursor-pointer flex-col justify-center rounded-sm border border-slate-300 bg-gray-50 p-6 text-center font-semibold italic inset-shadow-sm inset-shadow-slate-400/40 hover:bg-white"
        >
          <div class="mx-auto">Create New<br />Blank Preset</div>
        </button>
      </div>
    </div>
  </div>
</template>
