<script setup lang="ts">
defineProps<{
  grid: number
  bars: number
  timeScaleSeconds: number
}>()
</script>

<template>
  <div class="relative z-10 flex h-4 bg-stone-300/60 text-black select-none">
    <div
      class="flex flex-1 flex-row-reverse shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1),0_1px_2px_-2px_rgba(0,0,0,0.06)]"
    >
      <template v-if="grid !== 0">
        <div
          v-for="n in (16 * bars) / grid"
          :key="n"
          class="relative h-full flex-1 text-xs font-semibold last:opacity-0"
        >
          <div
            class="hidden text-center"
            :class="{
              'absolute -left-3 block! w-6': n % ((4 * bars) / grid) === 0,
            }"
          >
            {{ n % ((4 * bars) / grid) === 0 ? n / ((4 * bars) / grid) : '' }}
          </div>
        </div>
      </template>
      <template v-if="grid === 0">
        <div
          v-for="n in timeScaleSeconds"
          :key="n"
          class="relative h-full flex-1 text-xs font-semibold last:opacity-0"
        >
          <div class="absolute -left-3 block w-6 text-center">
            {{ n }}
          </div>
        </div>
      </template>
    </div>
    <div class="w-6 bg-white"></div>
    <div
      class="flex flex-1 shadow-[0_2px_3px_-1px_rgba(0,0,0,0.1),0_1px_2px_-2px_rgba(0,0,0,0.06)]"
    >
      <template v-if="grid !== 0">
        <div
          v-for="n in (16 * bars) / grid"
          :key="n"
          class="relative h-full flex-1 text-xs font-semibold last:opacity-0"
        >
          <div
            class="hidden text-center"
            :class="{
              'absolute -right-3 block! w-6': n % ((4 * bars) / grid) === 0,
            }"
          >
            {{ n % ((4 * bars) / grid) === 0 ? n / ((4 * bars) / grid) : '' }}
          </div>
        </div>
      </template>
      <template v-if="grid === 0">
        <div
          v-for="n in timeScaleSeconds"
          :key="n"
          class="relative h-2 flex-1 text-center text-xs font-semibold last:opacity-0"
        >
          <div class="absolute -right-3 block w-6 text-center">
            {{ n }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
