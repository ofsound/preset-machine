<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const emit = defineEmits(['rowValue'])

const rowWidth = ref(0)
const divisions = ref(8)

const gridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)

const isMouseDown = ref<boolean>(false)

const handleMouseDown = () => {
  isMouseDown.value = true
}

const handleMouseUp = () => {
  isMouseDown.value = false
}

const handleMouseClick = (event: MouseEvent) => {
  if (gridElement.value?.clientWidth) {
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

const handleMouseMove = (event: MouseEvent) => {
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

const handleResetMouseEnter = () => {
  if (isMouseDown.value) {
    rowWidth.value = 0
    emit('rowValue', 0)
  }
}

const handleResetMouseClick = () => {
  rowWidth.value = 0
  emit('rowValue', 0)
}

onMounted(() => {
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  gridElement.value!.addEventListener('mouseenter', handleMouseEnter)
  gridElement.value!.addEventListener('click', handleMouseClick)
  gridElement.value!.addEventListener('mousemove', handleMouseMove)

  resetElement.value!.addEventListener('mouseenter', handleResetMouseEnter)
  resetElement.value!.addEventListener('click', handleResetMouseClick)
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
  <div class="relative cursor-pointer select-none">
    <!-- <div
      ref="gridElement"
      class="border-box border-right-2 flex border border-gray-300 [&>.grid-child:nth-child(4n)]:border-r-2 [&>.grid-child:nth-child(4n)]:border-gray-300"
    > -->
    <div ref="resetElement" class="absolute -left-6 h-full w-6"></div>
    <div
      ref="gridElement"
      class="border-box border-right-2 flex border border-gray-300 hover:brightness-110"
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
