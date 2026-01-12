<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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

    let currentStep

    if (isPositive.value) {
      currentStep = Math.ceil((pixelValue / width) * totalSteps)
    } else {
      currentStep = Math.floor((pixelValue / width) * totalSteps)
    }

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

// const isMouseDown = ref<boolean>(false)

// const handleMouseDown = () => {
//   isMouseDown.value = true
// }

// const handleMouseUp = () => {
//   isMouseDown.value = false
// }

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

const setRatioValue = (newValue: number) => {
  const scaledWidth = newValue * positiveGridElement.value!.clientWidth

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
  setRatioValue,
})

watch(
  () => props.timeScaleSeconds,
  (newValue, oldValue) => {
    rowWidth.value *= oldValue / newValue
  },
)
</script>

<template>
  <div class="relative flex min-h-0 flex-1 cursor-pointer select-none">
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
          :class="{ 'border-zinc-400/50!': n % ((4 * bars) / grid) === 0 }"
        ></div>
      </template>
      <div
        v-show="!isPositive"
        class="absolute right-0 h-full"
        :style="valueStyle"
      ></div>
    </div>

    <div ref="resetElement" class="h-full w-6"></div>
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
          :class="{ 'border-zinc-400/50!': n % ((4 * bars) / grid) === 0 }"
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
