<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

const props = defineProps<{
  isActive: boolean
  color: string
  rowPixelHeight: string
  timeScaleSeconds: number
  grid: number
  bars: number
  tempo: number
}>()

const emit = defineEmits(['updateRowValue'])

const isPositive = ref(true)
const rowWidth = ref(0)

const positiveGridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)
const negativeGridElement = ref<HTMLElement | null>(null)

const updateRowValue = (pixelValue: number) => {
  if (props.grid > 0) {
    const width = positiveGridElement.value!.clientWidth

    const totalSteps = (16 * props.bars) / props.grid

    const currentStep = Math.ceil((pixelValue / width) * totalSteps)

    const stepDuration = (props.grid / 4) * (60 / props.tempo)

    const snappedRowValue = currentStep * stepDuration

    emit('updateRowValue', snappedRowValue)
  } else {
    const scaledRowValue =
      (pixelValue * props.timeScaleSeconds) /
      positiveGridElement.value!.clientWidth
    emit('updateRowValue', scaledRowValue)
  }
}

const updateRowPixelWidth = (pixelValue: number) => {
  if (props.grid > 0) {
    const roundAmount =
      positiveGridElement.value!.clientWidth / ((16 * props.bars) / props.grid)

    rowWidth.value = Math.ceil(pixelValue / roundAmount) * roundAmount
  } else {
    rowWidth.value = pixelValue
  }
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
    (positiveGridElement.value!.clientWidth / props.timeScaleSeconds)

  updateRowPixelWidth(Math.abs(scaledWidth))

  if (randomValueWithinRange > 0) {
    isPositive.value = true
  } else {
    isPositive.value = false
  }

  updateRowValue(scaledWidth)
}

const setManualValue = (newValue: number) => {
  const scaledWidth =
    newValue * (positiveGridElement.value!.clientWidth / props.timeScaleSeconds)

  updateRowPixelWidth(Math.abs(scaledWidth))

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

      updateRowPixelWidth(mouseXRelativeToParent)

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

      updateRowPixelWidth(Math.abs(mouseXRelativeToParent))

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
  () => props.timeScaleSeconds,
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
  <div
    class="relative flex h-3 cursor-pointer select-none"
    :style="{ height: `${rowPixelHeight}px` }"
  >
    <div
      ref="negativeGridElement"
      class="relative flex h-full flex-1 flex-row-reverse hover:[&>*:last-child]:brightness-110"
    >
      <template v-if="grid === 0">
        <div
          v-for="n in timeScaleSeconds"
          :key="n"
          class="h-full flex-1 border-r border-neutral-200 bg-neutral-50 odd:bg-zinc-100"
        ></div>
      </template>
      <template v-if="grid !== 0">
        <div
          v-for="n in (16 * bars) / grid"
          :key="n"
          class="h-full flex-1 border-l border-neutral-200 bg-neutral-50 odd:bg-zinc-100"
          :class="{ 'border-zinc-400!': n % ((4 * bars) / grid) === 0 }"
        ></div>
      </template>
      <div
        v-show="!isPositive"
        class="absolute right-0 h-full"
        :style="valueStyle"
      ></div>
    </div>

    <div ref="resetElement" class="h-2 w-6 bg-neutral-50"></div>
    <div
      ref="positiveGridElement"
      class="flex h-full flex-1 hover:[&>*:last-child]:brightness-110"
    >
      <template v-if="grid === 0">
        <div
          v-for="n in timeScaleSeconds"
          :key="n"
          class="h-full flex-1 border-r border-neutral-200 bg-neutral-50 odd:bg-zinc-100"
        ></div>
      </template>
      <template v-if="grid !== 0">
        <div
          v-for="n in (16 * bars) / grid"
          :key="n"
          class="h-full flex-1 border-r border-neutral-200 bg-neutral-50 odd:bg-zinc-100"
          :class="{ 'border-zinc-400!': n % ((4 * bars) / grid) === 0 }"
        ></div>
      </template>
      <div
        v-show="isPositive"
        class="absolute h-full"
        :style="valueStyle"
      ></div>
    </div>
  </div>
</template>
