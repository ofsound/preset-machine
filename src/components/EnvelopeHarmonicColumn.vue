<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

const props = defineProps<{
  isActive: boolean
  color: string
  timeScaleSeconds: number
  grid: number
  bars: number
  tempo: number
  isGain: boolean
  index: number
}>()

const emit = defineEmits(['updateRowValue'])

const isPositive = ref(true)
const columnHeight = ref(0)

const positiveGridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)
const negativeGridElement = ref<HTMLElement | null>(null)

const updateRowValue = (pixelValue: number) => {
  if (props.grid > 0) {
    const height = positiveGridElement.value!.clientHeight

    const totalSteps = (16 * props.bars) / props.grid

    let currentStep

    if (isPositive.value) {
      currentStep = Math.ceil((pixelValue / height) * totalSteps)
    } else {
      currentStep = Math.floor((pixelValue / height) * totalSteps)
    }

    const stepDuration = (props.grid / 4) * (60 / props.tempo)

    const snappedRowValue = currentStep * stepDuration

    emit('updateRowValue', snappedRowValue)
  } else {
    let scaledColumnValue =
      (pixelValue * 1) / positiveGridElement.value!.clientHeight

    if (props.isGain) {
      scaledColumnValue *= 1 / props.index
    }

    emit('updateRowValue', scaledColumnValue)
  }
}

const updateRowPixelHeight = (pixelValue: number) => {
  if (props.grid > 0) {
    const roundAmount =
      positiveGridElement.value!.clientHeight / ((16 * props.bars) / props.grid)

    columnHeight.value = Math.ceil(pixelValue / roundAmount) * roundAmount
  } else {
    columnHeight.value = pixelValue
  }
}

const valueStyle = computed(() => {
  return {
    height: `${columnHeight.value}px`,
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

  const scaledHeight =
    randomValueWithinRange * (positiveGridElement.value!.clientHeight / 1)

  updateRowPixelHeight(Math.abs(scaledHeight))

  if (randomValueWithinRange > 0) {
    isPositive.value = true
  } else {
    isPositive.value = false
  }

  updateRowValue(scaledHeight)
}

const setManualValue = (newValue: number) => {
  const scaledHeight = newValue * (positiveGridElement.value!.clientHeight / 1)

  updateRowPixelHeight(Math.abs(scaledHeight))

  if (newValue > 0) {
    isPositive.value = true
  } else {
    isPositive.value = false
  }

  updateRowValue(scaledHeight)
}

defineExpose({
  setRandomValueInRange,
  setManualValue,
})

const handleMousePositive = (event: MouseEvent) => {
  if (positiveGridElement.value?.clientHeight && props.isActive) {
    if (isMouseDown.value || event.type === 'mousedown') {
      isPositive.value = true

      const parentBottom =
        positiveGridElement.value.getBoundingClientRect().bottom

      const mouseYRelativeToParent = parentBottom - event.clientY

      updateRowPixelHeight(mouseYRelativeToParent)

      updateRowValue(mouseYRelativeToParent)
    }
  }
}

const handleMouseNegative = (event: MouseEvent) => {
  if (negativeGridElement.value?.clientHeight && props.isActive) {
    if (isMouseDown.value || event.type === 'mousedown') {
      isPositive.value = false

      const parentTop = negativeGridElement.value.getBoundingClientRect().top

      const mouseYRelativeToParent = parentTop - event.clientY

      updateRowPixelHeight(Math.abs(mouseYRelativeToParent))

      updateRowValue(mouseYRelativeToParent)
    }
  }
}

const handleResetMouse = () => {
  if (isMouseDown.value) {
    columnHeight.value = 0
    emit('updateRowValue', 0)
  }
}

watch(
  () => 1,
  (newValue, oldValue) => {
    columnHeight.value *= oldValue / newValue
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
    class="relative flex h-full flex-1 cursor-pointer flex-col-reverse select-none"
  >
    <div
      ref="negativeGridElement"
      class="relative flex h-full flex-1 flex-col-reverse hover:[&>*:last-child]:brightness-110"
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
          :class="{ 'border-zinc-400/50!': n % ((4 * bars) / grid) === 0 }"
        ></div>
      </template>
      <div
        v-show="!isPositive"
        class="absolute top-0 w-full"
        :style="valueStyle"
      ></div>
    </div>
    <div ref="resetElement" class="h-6 w-full"></div>
    <div
      ref="positiveGridElement"
      class="relative flex h-full flex-1 flex-col hover:[&>*:last-child]:brightness-110"
    >
      <template v-if="grid === 0">
        <div
          v-for="n in timeScaleSeconds"
          :key="n"
          class="h-full flex-1 flex-col border-r border-neutral-200 bg-neutral-50 odd:bg-zinc-100"
        ></div>
      </template>
      <template v-if="grid !== 0">
        <div
          v-for="n in (16 * bars) / grid"
          :key="n"
          class="h-full flex-1 border-r border-neutral-200 bg-neutral-50 odd:bg-zinc-100"
          :class="{ 'border-zinc-400/50!': n % ((4 * bars) / grid) === 0 }"
        ></div>
      </template>
      <div
        v-show="isPositive"
        class="absolute bottom-0 w-full"
        :style="valueStyle"
      ></div>
    </div>
  </div>
</template>
