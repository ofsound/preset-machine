<script setup lang="ts">
defineProps<{
  maxSeconds: number
  numDivisions: number
}>()
</script>

<template>
  <div class="mb-2 flex h-4 bg-slate-200">
    <div class="flex flex-1 flex-row-reverse">
      <div
        v-for="(n, index) in numDivisions"
        :key="n"
        class="h-2 flex-1 text-right text-xs"
      >
        {{ index * (maxSeconds / numDivisions) }}
      </div>
    </div>
    <div class="w-6 bg-white"></div>
    <div class="flex flex-1">
      <div
        v-for="(n, index) in numDivisions"
        :key="n"
        class="h-2 flex-1 text-xs"
      >
        {{ index * (maxSeconds / numDivisions) }}
      </div>
    </div>
  </div>
</template>
