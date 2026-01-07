<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  color: string
  isActive: boolean
}>()

const emit = defineEmits(['rowValue'])

const rowWidth = ref(0)
const divisions = ref(8)

const positiveGridElement = ref<HTMLElement | null>(null)
const negativeGridElement = ref<HTMLElement | null>(null)
const resetElement = ref<HTMLElement | null>(null)

const isMouseDown = ref<boolean>(false)

const segmentStyle = computed(() => {
  return {
    width: `${rowWidth.value}px`,
    backgroundColor: props.color,
  }
})

const gridChildStyle = computed(() => {
  return {
    width: `${(1 / divisions.value) * 100}%`,
  }
})

const handleMouseDown = () => {
  isMouseDown.value = true
}

const handleMouseUp = () => {
  isMouseDown.value = false
}

const setRandomValueInRange = (maxValue: number, minValue: number) => {
  // console.log('go!')

  const randomizeRange = minValue / 10 - maxValue / 10

  const randomDeltaWithinRange = Math.random() * randomizeRange

  const randomValueWithinRange = randomDeltaWithinRange + minValue / 10

  // const thisValue = array[index]

  // const newValue = thisValue! + randomValueWithinRange

  // if (newValue < 0) {
  //   array[index] = 0
  // } else {
  // array[index] = newValue

  // console.log(newValue)

  rowWidth.value = randomValueWithinRange

  console.log(rowWidth.value)
}

defineExpose({
  setRandomValueInRange, // The method is also exposed
})

const handleMouseClickPositive = (event: MouseEvent) => {
  if (positiveGridElement.value?.clientWidth && props.isActive) {
    if (negativeGridElement.value) negativeGridElement.value.style.opacity = '0'
    if (positiveGridElement.value) positiveGridElement.value.style.opacity = '1'

    const parentLeft = positiveGridElement.value.getBoundingClientRect().left

    const mouseXRelativeToParent = event.clientX - parentLeft

    // const roundAmount = positiveGridElement.value.clientWidth / 16
    // emit('roundAmount', roundAmount)
    // rowWidth.value =
    //   Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

    rowWidth.value = mouseXRelativeToParent

    emit('rowValue', mouseXRelativeToParent)
  }
}

const handleMouseMovePositive = (event: MouseEvent) => {
  if (positiveGridElement.value?.clientWidth && props.isActive) {
    if (isMouseDown.value) {
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

      emit('rowValue', mouseXRelativeToParent)
    }
  }
}

const handleMouseEnterPositive = (event: MouseEvent) => {
  if (positiveGridElement.value?.clientWidth && props.isActive) {
    if (isMouseDown.value) {
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

      emit('rowValue', mouseXRelativeToParent)
    }
  }
}

const handleMouseClickNegative = (event: MouseEvent) => {
  if (negativeGridElement.value?.clientWidth && props.isActive) {
    const parentRight = negativeGridElement.value.getBoundingClientRect().right

    if (positiveGridElement.value) positiveGridElement.value.style.opacity = '0'

    const mouseXRelativeToParent = parentRight - event.clientX

    if (negativeGridElement.value) negativeGridElement.value.style.opacity = '1'

    // const roundAmount = negativeGridElement.value.clientWidth / 16
    // emit('roundAmount', roundAmount)
    // rowWidth.value =
    //   Math.floor(mouseXRelativeToParent / roundAmount) * roundAmount

    rowWidth.value = mouseXRelativeToParent

    emit('rowValue', mouseXRelativeToParent)
  }
}

const handleMouseMoveNegative = (event: MouseEvent) => {
  if (negativeGridElement.value?.clientWidth && props.isActive) {
    if (isMouseDown.value) {
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

      emit('rowValue', mouseXRelativeToParent)
    }
  }
}

const handleMouseEnterNegative = (event: MouseEvent) => {
  if (negativeGridElement.value?.clientWidth && props.isActive) {
    if (isMouseDown.value) {
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

  positiveGridElement.value!.addEventListener(
    'mouseenter',
    handleMouseEnterPositive,
  )
  positiveGridElement.value!.addEventListener('click', handleMouseClickPositive)
  positiveGridElement.value!.addEventListener(
    'mousemove',
    handleMouseMovePositive,
  )

  negativeGridElement.value!.addEventListener(
    'mouseenter',
    handleMouseEnterNegative,
  )
  negativeGridElement.value!.addEventListener('click', handleMouseClickNegative)
  negativeGridElement.value!.addEventListener(
    'mousemove',
    handleMouseMoveNegative,
  )

  resetElement.value!.addEventListener('mouseenter', handleResetMouseEnter)
  resetElement.value!.addEventListener('click', handleResetMouseClick)
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
        :style="gridChildStyle"
      ></div>
      <div class="absolute right-0 h-2" :style="segmentStyle"></div>
    </div>

    <div ref="resetElement" class="h-2 w-6 bg-white"></div>
    <div ref="positiveGridElement" class="flex flex-1 hover:brightness-110">
      <div
        v-for="n in divisions"
        :key="n"
        class="h-2 border-l"
        :style="gridChildStyle"
      ></div>
      <div class="absolute h-2" :style="segmentStyle"></div>
    </div>
  </div>
</template>
