<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const emit = defineEmits(['rowValue'])

const offset = defineModel<number>('offset', { default: 0 })
const divisions = defineModel<number>('divisions', { default: 8 })
// const value = defineModel<number>('value', { default: 0 })

const gridElement = ref<HTMLElement | null>(null)
// const isMouseDown = ref<boolean>(false)

onMounted(() => {
  if (gridElement.value) {
    const handleMouseEnter = (event: MouseEvent) => {
      if (gridElement.value?.clientWidth) {
        const parentLeft = gridElement.value.getBoundingClientRect().left
        const mouseXRelativeToParent = event.clientX - parentLeft!
        const roundAmount = gridElement.value.clientWidth / 16
        // emit('roundAmount', roundAmount)
        offset.value =
          Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount
        emit('rowValue', offset.value)
      }
    }
    gridElement.value.addEventListener('mouseenter', handleMouseEnter)
    // gridElement.value.addEventListener('mouseup', handleMouseUp)
    // gridElement.value.addEventListener('mouseleave', handleMouseUp)
  }
})

const segmentStyle = computed(() => {
  return {
    marginLeft: `${offset.value}px`,
    width: `${10}px`,
  }
})

const gridChildStyle = computed(() => {
  return {
    width: `${(1 / divisions.value) * 100}%`,
  }
})
</script>

<template>
  <div class="relative max-w-60 cursor-pointer overflow-hidden select-none">
    <div
      ref="gridElement"
      class="border-box border-right-2 flex border border-gray-300 [&>.grid-child:nth-child(4n)]:border-r-2 [&>.grid-child:nth-child(4n)]:border-gray-300"
    >
      <div
        v-for="n in divisions"
        :key="n"
        class="nth-child(4n):border-2 :nth-child(4n):border-blue-400 aspect-square h-auto even:bg-gray-100"
        :style="gridChildStyle"
      ></div>
      <div
        class="absolute h-[calc(100%-2px)] bg-amber-400"
        :style="segmentStyle"
      ></div>
    </div>
  </div>
</template>
