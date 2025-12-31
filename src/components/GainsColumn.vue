<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  color: string
  active: boolean
}>()

const emit = defineEmits(['columnValue'])

const columnHeight = ref(0)
const divisions = ref(8)

const gridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)

const isMouseDown = ref<boolean>(false)

const segmentStyle = computed(() => {
  return {
    height: `${columnHeight.value}px`,
    backgroundColor: props.color,
  }
})

const gridChildStyle = computed(() => {
  return {
    height: `${(1 / divisions.value) * 100}%`,
  }
})

const handleMouseDown = () => {
  if (props.active) isMouseDown.value = true
}

const handleMouseUp = () => {
  isMouseDown.value = false
}

const handleMouseClick = (event: MouseEvent) => {
  if (gridElement.value?.clientWidth) {
    const parentTop = gridElement.value.getBoundingClientRect().top

    const mouseYRelativeToParent = event.clientY - parentTop

    columnHeight.value = mouseYRelativeToParent

    emit('columnValue', mouseYRelativeToParent)
  }
}

const handleMouseMove = (event: MouseEvent) => {
  if (gridElement.value?.clientWidth) {
    if (isMouseDown.value) {
      const parentTop = gridElement.value.getBoundingClientRect().top

      const mouseYRelativeToParent = event.clientY - parentTop

      columnHeight.value = mouseYRelativeToParent

      emit('columnValue', mouseYRelativeToParent)
    }
  }
}

const handleMouseEnter = (event: MouseEvent) => {
  if (gridElement.value?.clientWidth) {
    if (isMouseDown.value) {
      const parentTop = gridElement.value.getBoundingClientRect().top

      const mouseYRelativeToParent = event.clientY - parentTop

      columnHeight.value = mouseYRelativeToParent

      emit('columnValue', mouseYRelativeToParent)
    }
  }
}

const handleResetMouseEnter = () => {
  if (isMouseDown.value) {
    columnHeight.value = 0
    emit('columnValue', 0)
  }
}

const handleResetMouseClick = () => {
  columnHeight.value = 0
  emit('columnValue', 0)
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
  <div class="relative flex h-70 w-full cursor-pointer flex-col select-none">
    <div
      ref="gridElement"
      class="border-box border-right-2 flex h-full w-full flex-col-reverse border border-gray-300 hover:brightness-110"
    >
      <div
        v-for="n in divisions"
        :key="n"
        class="nth-child(4n):border-2 :nth-child(4n):border-blue-400 w-full min-w-full bg-gray-300"
        :style="gridChildStyle"
      ></div>
      <div class="absolute w-full" :style="segmentStyle"></div>
    </div>

    <div ref="resetElement" class="absolute -left-6 h-4 w-full"></div>
  </div>
</template>
