<script setup lang="ts">
const offset = defineModel<number>('offset', { default: 0 })
const hold = defineModel<number>('hold', { default: 0 })

const handleMouseDown = (event: MouseEvent) => {
  const parentElement = document.getElementById('grid')!
  const parentRect = parentElement.getBoundingClientRect()
  const mouseXRelativeToParent = event.clientX - parentRect.left
  offset.value = Math.floor(mouseXRelativeToParent / 50) * 10
}

const handleMouseUp = (event: MouseEvent) => {
  const parentElement = document.getElementById('grid')!
  const parentRect = parentElement.getBoundingClientRect()
  const mouseXRelativeToParent = event.clientX - parentRect.left
  hold.value = Math.floor((mouseXRelativeToParent / 10 - offset.value) / 10) * 10
}
</script>

<template>
  <div class="relative">
    <div
      id="grid"
      class="border-box flex border-1 border-gray-400"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <div v-for="n in 16" :key="n" class="h-[50px] w-[50px] even:bg-gray-300"></div>
    </div>
    <div class="segment h-[50px] bg-amber-400"></div>

    <!-- <input type="text" v-model="offset" />
    <input type="text" v-model="hold" /> -->
  </div>
</template>

<style scoped>
.segment {
  margin-left: v-bind(offset * 10 + 'px');
  width: v-bind(hold * 10 + 'px');
  position: relative;
  top: -51px;
}
</style>
