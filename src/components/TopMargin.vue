<script setup lang="ts">
defineProps<{
  grid: number
  bars: number
  maxSeconds: number
  numDivisions: number
}>()
</script>

<template>
  <div class="mb-2 flex h-4 bg-slate-200 select-none">
    <div class="flex flex-1 flex-row-reverse">
      <div
        v-for="(n, index) in (16 * bars) / grid"
        :key="n"
        class="h-2 flex-1 text-right text-xs"
      >
        {{ index % 4 === 0 ? index / 4 : '' }}
      </div>

      <!-- <div
        v-for="(n, index) in numDivisions"
        :key="n"
        class="h-2 flex-1 text-right text-xs"
      >
        {{ index * (maxSeconds / numDivisions) }}
      </div> -->
    </div>
    <div class="w-6 bg-white"></div>
    <div class="flex flex-1">
      <div
        v-for="(n, index) in (16 * bars) / grid"
        :key="n"
        class="h-2 flex-1 text-xs"
      >
        {{ index % 4 === 0 ? index / 4 : '' }}
      </div>

      <!-- <div
        v-for="(n, index) in numDivisions"
        :key="n"
        class="h-2 flex-1 text-xs"
      >
        {{ index * (maxSeconds / numDivisions) }}
      </div> -->
    </div>
  </div>
</template>
