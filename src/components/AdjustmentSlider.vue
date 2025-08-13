<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const emit = defineEmits(['roundAmount'])

const offset = defineModel<number>('offset', { default: 0 })
const hold = defineModel<number>('hold', { default: 0 })
const divisions = defineModel<number>('divisions', { default: 16 })
const value = defineModel<number>('value', { default: 0 })

const gridElement = ref<HTMLElement | null>(null)

const isMouseDown = ref<boolean>(false)

onMounted(() => {
  if (gridElement.value) {
    const handleMouseDown = (event: MouseEvent) => {
      if (gridElement.value?.clientWidth) {
        const parentLeft = gridElement.value.getBoundingClientRect().left
        const mouseXRelativeToParent = event.clientX - parentLeft!
        isMouseDown.value = true
        const roundAmount = gridElement.value.clientWidth / 16
        emit('roundAmount', roundAmount)
        hold.value = value.value * roundAmount
        offset.value = Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount
      }
    }

    const handleMouseUp = () => {
      if (gridElement.value?.offsetWidth) {
        isMouseDown.value = false
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (gridElement.value?.offsetWidth && isMouseDown.value && value.value == 1) {
        const parentLeft = gridElement.value.getBoundingClientRect().left
        const mouseXRelativeToParent = event.clientX - parentLeft!
        const roundAmount = gridElement.value?.offsetWidth / 16
        const dragLength = mouseXRelativeToParent - offset.value
        hold.value = Math.ceil(dragLength / roundAmount) * roundAmount
      }
    }

    gridElement.value.addEventListener('mousedown', handleMouseDown)
    gridElement.value.addEventListener('mousemove', handleMouseMove)
    gridElement.value.addEventListener('mouseup', handleMouseUp)
    gridElement.value.addEventListener('mouseleave', handleMouseUp)
  }
})

const segmentStyle = computed(() => {
  return {
    marginLeft: `${offset.value}px`,
    width: `${hold.value}px`,
  }
})

const gridChildStyle = computed(() => {
  return {
    width: `${(1 / divisions.value) * 100}%`,
  }
})
</script>

<template>
  <div class="relative max-w-200 cursor-pointer overflow-hidden select-none">
    <div
      ref="gridElement"
      class="border-box border-right-2 flex border-1 border-gray-300 [&>.grid-child:nth-child(4n)]:border-r-2 [&>.grid-child:nth-child(4n)]:border-gray-300"
    >
      <div
        v-for="n in divisions"
        :key="n"
        class="nth-child(4n):border-2 :nth-child(4n):border-blue-400 aspect-square h-auto even:bg-gray-100"
        :style="gridChildStyle"
      ></div>
      <div class="absolute h-[calc(100%-2px)] bg-amber-400" :style="segmentStyle"></div>
    </div>
  </div>
</template>
