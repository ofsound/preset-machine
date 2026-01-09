<script setup lang="ts">
defineProps<{
  grid: number
  bars: number
  timeScaleSeconds: number
}>()
</script>

<template>
  <div class="relative z-10 flex h-4 bg-slate-200 select-none">
    <div class="flex flex-1 flex-row-reverse shadow-sm">
      <template v-if="grid !== 0">
        <div
          v-for="n in (16 * bars) / grid"
          :key="n"
          class="relative h-full flex-1 text-xs font-semibold"
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
          class="relative h-full flex-1 text-xs font-semibold"
        >
          <div class="absolute -left-3 block w-6 text-center">
            {{ n }}
          </div>
        </div>
      </template>
    </div>
    <div class="w-6 bg-white"></div>
    <div class="flex flex-1 shadow-sm">
      <template v-if="grid !== 0">
        <div
          v-for="n in (16 * bars) / grid"
          :key="n"
          class="relative h-full flex-1 text-xs font-semibold"
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
          class="relative h-2 flex-1 text-center text-xs font-semibold"
        >
          <div class="absolute -right-3 block w-6 text-center">
            {{ n }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
