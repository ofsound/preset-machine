<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const emit = defineEmits(['rowValue'])

const rowWidth = ref(0)
const divisions = ref(8)

const gridElement = ref<HTMLElement | null>(null)

const isMouseDown = ref<boolean>(false)

const handleMouseDown = () => {
  isMouseDown.value = true
}

const handleMouseUp = () => {
  isMouseDown.value = false
}
const handleMouseEnter = (event: MouseEvent) => {
  if (gridElement.value?.clientWidth) {
    if (isMouseDown.value) {
      const parentLeft = gridElement.value.getBoundingClientRect().left

      const mouseXRelativeToParent = event.clientX - parentLeft

      // const roundAmount = gridElement.value.clientWidth / 16
      // emit('roundAmount', roundAmount)
      // rowWidth.value =
      //   Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

      rowWidth.value = mouseXRelativeToParent

      emit('rowValue', mouseXRelativeToParent)
    }
  }
}

onMounted(() => {
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  gridElement.value!.addEventListener('mouseenter', handleMouseEnter)
})

const segmentStyle = computed(() => {
  return {
    width: `${rowWidth.value}px`,
  }
})

const gridChildStyle = computed(() => {
  return {
    width: `${(1 / divisions.value) * 100}%`,
  }
})
</script>

<template>
  <div class="relative cursor-pointer overflow-hidden select-none">
    <!-- <div
      ref="gridElement"
      class="border-box border-right-2 flex border border-gray-300 [&>.grid-child:nth-child(4n)]:border-r-2 [&>.grid-child:nth-child(4n)]:border-gray-300"
    > -->
    <div
      ref="gridElement"
      class="border-box border-right-2 flex border border-gray-300"
    >
      <div
        v-for="n in divisions"
        :key="n"
        class="nth-child(4n):border-2 :nth-child(4n):border-blue-400 h-4"
        :style="gridChildStyle"
      ></div>
      <div
        class="absolute h-[calc(100%-2px)] bg-amber-400"
        :style="segmentStyle"
      ></div>
    </div>
  </div>
</template>
