<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  color: string
}>()

const emit = defineEmits(['rowValue'])

const rowHeight = ref(0)
const divisions = ref(8)

const gridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)

const isMouseDown = ref<boolean>(false)

const segmentStyle = computed(() => {
  return {
    height: `${rowHeight.value}px`,
    backgroundColor: props.color,
  }
})

const gridChildStyle = computed(() => {
  return {
    height: `${(1 / divisions.value) * 100}%`,
  }
})

const handleMouseDown = () => {
  isMouseDown.value = true
}

const handleMouseUp = () => {
  isMouseDown.value = false
}

const handleMouseClick = (event: MouseEvent) => {
  if (gridElement.value?.clientWidth) {
    const parentTop = gridElement.value.getBoundingClientRect().top

    const mouseYRelativeToParent = event.clientY - parentTop

    // const roundAmount = gridElement.value.clientWidth / 16
    // emit('roundAmount', roundAmount)
    // rowWidth.value =
    //   Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

    rowHeight.value = mouseYRelativeToParent

    emit('rowValue', mouseYRelativeToParent)
  }
}

const handleMouseMove = (event: MouseEvent) => {
  if (gridElement.value?.clientWidth) {
    if (isMouseDown.value) {
      const parentTop = gridElement.value.getBoundingClientRect().top

      const mouseYRelativeToParent = event.clientY - parentTop

      // const roundAmount = gridElement.value.clientWidth / 16
      // emit('roundAmount', roundAmount)
      // rowWidth.value =
      //   Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

      rowHeight.value = mouseYRelativeToParent

      emit('rowValue', mouseYRelativeToParent)
    }
  }
}

const handleMouseEnter = (event: MouseEvent) => {
  if (gridElement.value?.clientWidth) {
    if (isMouseDown.value) {
      const parentTop = gridElement.value.getBoundingClientRect().top

      const mouseYRelativeToParent = event.clientY - parentTop

      // const roundAmount = gridElement.value.clientWidth / 16
      // emit('roundAmount', roundAmount)
      // rowWidth.value =
      //   Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

      rowHeight.value = mouseYRelativeToParent

      emit('rowValue', mouseYRelativeToParent)
    }
  }
}

const handleResetMouseEnter = () => {
  if (isMouseDown.value) {
    rowHeight.value = 0
    emit('rowValue', 0)
  }
}

const handleResetMouseClick = () => {
  rowHeight.value = 0
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
</script>

<template>
  <div class="relative flex h-30 w-10 cursor-pointer flex-col select-none">
    <div
      ref="gridElement"
      class="border-box border-right-2 flex border border-gray-300 hover:brightness-110"
    ></div>
    <div
      v-for="n in divisions"
      :key="n"
      class="nth-child(4n):border-2 :nth-child(4n):border-blue-400 w-4"
      :style="gridChildStyle"
    ></div>
    <div class="absolute w-4" :style="segmentStyle"></div>

    <div ref="resetElement" class="absolute -left-6 h-full w-6"></div>
  </div>
</template>
