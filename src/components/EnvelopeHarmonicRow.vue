<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  isActive: boolean
  color: string
}>()

const emit = defineEmits(['updateRowValue'])

const rowWidth = ref(0)
const divisions = ref(8)

const positiveGridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)
const negativeGridElement = ref<HTMLElement | null>(null)

const valueStyle = computed(() => {
  return {
    width: `${rowWidth.value}px`,
    backgroundColor: props.color,
  }
})

const gridStyle = computed(() => {
  return {
    width: `${(1 / divisions.value) * 100}%`,
  }
})

const isMouseDown = ref<boolean>(false)

const handleMouseDown = () => {
  isMouseDown.value = true
}

const handleMouseUp = () => {
  isMouseDown.value = false
}

const setRandomValueInRange = (maxValue: number, minValue: number) => {
  const randomizeRange = minValue / 10 - maxValue / 10

  const randomDeltaWithinRange = Math.random() * randomizeRange

  const randomValueWithinRange = randomDeltaWithinRange + minValue / 10

  rowWidth.value = randomValueWithinRange
}

defineExpose({
  setRandomValueInRange,
})

const handleMousePositive = (event: MouseEvent) => {
  if (positiveGridElement.value?.clientWidth && props.isActive) {
    if (isMouseDown.value || event.type === 'mousedown') {
      if (negativeGridElement.value)
        negativeGridElement.value.style.opacity = '0'

      if (positiveGridElement.value)
        positiveGridElement.value.style.opacity = '1'

      const parentLeft = positiveGridElement.value.getBoundingClientRect().left

      const mouseXRelativeToParent = event.clientX - parentLeft

      // const roundAmount = positiveGridElement.value.clientWidth / 16
      // emit('roundAmount', roundAmount)
      // rowWidth.value =
      //   Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

      rowWidth.value = mouseXRelativeToParent

      emit('updateRowValue', mouseXRelativeToParent)
    }
  }
}

const handleMouseNegative = (event: MouseEvent) => {
  if (negativeGridElement.value?.clientWidth && props.isActive) {
    if (isMouseDown.value || event.type === 'mousedown') {
      const parentRight =
        negativeGridElement.value.getBoundingClientRect().right

      const mouseXRelativeToParent = parentRight - event.clientX

      if (positiveGridElement.value)
        positiveGridElement.value.style.opacity = '0'

      if (negativeGridElement.value)
        negativeGridElement.value.style.opacity = '1'
      // const roundAmount = negativeGridElement.value.clientWidth / 16
      // emit('roundAmount', roundAmount)
      // rowWidth.value =
      //   Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

      rowWidth.value = mouseXRelativeToParent

      emit('updateRowValue', -mouseXRelativeToParent)
    }
  }
}

const handleResetMouse = () => {
  if (isMouseDown.value) {
    rowWidth.value = 0
    emit('updateRowValue', 0)
  }
}

onMounted(() => {
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)

  const gridEvents = ['mousedown', 'mousemove']

  gridEvents.forEach((eventType) => {
    positiveGridElement.value!.addEventListener(
      eventType,
      handleMousePositive as EventListener,
    )
    negativeGridElement.value!.addEventListener(
      eventType,
      handleMouseNegative as EventListener,
    )
  })

  const resetEvents = ['mousedown', 'mousemove']

  resetEvents.forEach((eventType) => {
    resetElement.value!.addEventListener(
      eventType,
      handleResetMouse as EventListener,
    )
  })
})
</script>

<template>
  <div class="relative flex cursor-pointer select-none">
    <div
      ref="negativeGridElement"
      class="relative flex flex-1 hover:brightness-110"
    >
      <div
        v-for="n in divisions"
        :key="n"
        class="h-2 border-r"
        :style="gridStyle"
      ></div>
      <div class="absolute right-0 h-2" :style="valueStyle"></div>
    </div>

    <div ref="resetElement" class="h-2 w-6 bg-white"></div>
    <div ref="positiveGridElement" class="flex flex-1 hover:brightness-110">
      <div
        v-for="n in divisions"
        :key="n"
        class="h-2 border-l"
        :style="gridStyle"
      ></div>
      <div class="absolute h-2" :style="valueStyle"></div>
    </div>
  </div>
</template>
