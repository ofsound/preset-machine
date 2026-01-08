<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

const props = defineProps<{
  isActive: boolean
  color: string
  maxSeconds: number
  numDivisions: number
}>()

const emit = defineEmits(['updateRowValue'])

const isPositive = ref(true)
const rowWidth = ref(0)

const positiveGridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)
const negativeGridElement = ref<HTMLElement | null>(null)

const updateRowValue = (pixelValue: number) => {
  const scaledRowValue =
    (pixelValue * props.maxSeconds) / positiveGridElement.value!.clientWidth

  emit('updateRowValue', scaledRowValue)
}

const valueStyle = computed(() => {
  return {
    width: `${rowWidth.value}px`,
    backgroundColor: props.color,
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
  const randomizeRange = maxValue - minValue
  const randomDeltaWithinRange = Math.random() * randomizeRange
  const randomValueWithinRange = randomDeltaWithinRange + minValue

  const scaledWidth =
    randomValueWithinRange *
    (positiveGridElement.value!.clientWidth / props.maxSeconds)

  rowWidth.value = Math.abs(scaledWidth)

  if (randomValueWithinRange > 0) {
    isPositive.value = true
  } else {
    isPositive.value = false
  }

  updateRowValue(scaledWidth)
}

const setManualValue = (newValue: number) => {
  const scaledWidth =
    newValue * (positiveGridElement.value!.clientWidth / props.maxSeconds)

  rowWidth.value = Math.abs(scaledWidth)

  if (newValue > 0) {
    isPositive.value = true
  } else {
    isPositive.value = false
  }

  updateRowValue(scaledWidth)
}

defineExpose({
  setRandomValueInRange,
  setManualValue,
})

const handleMousePositive = (event: MouseEvent) => {
  if (positiveGridElement.value?.clientWidth && props.isActive) {
    if (isMouseDown.value || event.type === 'mousedown') {
      isPositive.value = true

      const parentLeft = positiveGridElement.value.getBoundingClientRect().left

      const mouseXRelativeToParent = event.clientX - parentLeft

      rowWidth.value = mouseXRelativeToParent

      updateRowValue(mouseXRelativeToParent)
    }
  }
}

const handleMouseNegative = (event: MouseEvent) => {
  if (negativeGridElement.value?.clientWidth && props.isActive) {
    if (isMouseDown.value || event.type === 'mousedown') {
      isPositive.value = false

      const parentRight =
        negativeGridElement.value.getBoundingClientRect().right

      const mouseXRelativeToParent = event.clientX - parentRight

      rowWidth.value = Math.abs(mouseXRelativeToParent)

      updateRowValue(mouseXRelativeToParent)
    }
  }
}

const handleResetMouse = () => {
  if (isMouseDown.value) {
    rowWidth.value = 0
    emit('updateRowValue', 0)
  }
}

watch(
  () => props.maxSeconds,
  (newValue, oldValue) => {
    rowWidth.value *= oldValue / newValue
  },
)

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
      <div v-for="n in numDivisions" :key="n" class="h-2 flex-1 border-r"></div>
      <div
        v-show="!isPositive"
        class="absolute right-0 h-2"
        :style="valueStyle"
      ></div>
    </div>

    <div ref="resetElement" class="h-2 w-6 bg-white"></div>
    <div ref="positiveGridElement" class="flex flex-1 hover:brightness-110">
      <div v-for="n in numDivisions" :key="n" class="h-2 flex-1 border-r"></div>
      <div v-show="isPositive" class="absolute h-2" :style="valueStyle"></div>
    </div>
  </div>
</template>
