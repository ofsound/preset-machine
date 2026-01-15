<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps<{
  isActive: boolean
  color: string
  timeScaleSeconds: number
  grid: number
  bars: number
  tempo: number
  isGain: boolean
  index: number
  startingValue: number
}>()

const emit = defineEmits(['updateRowValue'])

const isPositive = ref(true)
const columnHeight = ref(0)

const positiveGridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)
const negativeGridElement = ref<HTMLElement | null>(null)

const updateRowValue = (pixelValue: number) => {
  let scaledColumnValue =
    (pixelValue * 1) / positiveGridElement.value!.clientHeight

  if (props.isGain) {
    scaledColumnValue *= 1 / (props.index + 1)
  }

  emit('updateRowValue', scaledColumnValue)
}

const updateRowPixelHeight = (pixelValue: number) => {
  columnHeight.value = pixelValue
}

const valueStyle = computed(() => {
  return {
    height: `${columnHeight.value}px`,
    backgroundColor: props.color,
  }
})

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

const setRatioValue = (newValue: number) => {
  const scaledWidth = newValue * positiveGridElement.value!.clientHeight

  updateRowPixelHeight(Math.abs(scaledWidth))

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
  () => 1,
  (newValue, oldValue) => {
    columnHeight.value *= oldValue / newValue
  },
)

onMounted(() => {
  if (positiveGridElement.value) {
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(positiveGridElement.value)
  }
})

let resizeObserver: ResizeObserver | null = null

const handleResize = () => {
  if (positiveGridElement.value) {
    const height = positiveGridElement.value.clientHeight

    if (height > 0) {
      const scaledHeight =
        props.startingValue * positiveGridElement.value!.clientHeight

      columnHeight.value = Math.abs(scaledHeight)

      if (props.isGain) {
        columnHeight.value /= 1 / (props.index + 1)
      }

      resizeObserver!.disconnect()
    }
  }
}
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
          v-for="n in 16"
          :key="n"
          class="h-full flex-1 border-l border-neutral-200 bg-neutral-50 odd:bg-zinc-100"
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
          v-for="n in 16"
          :key="n"
          class="h-full flex-1 border-r border-neutral-200 bg-neutral-50 odd:bg-zinc-100"
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
