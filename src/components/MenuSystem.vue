<script setup lang="ts">
import { ref } from 'vue'

import MenuItem from '@/components/MenuItem.vue'

const moduleArray = ref<string[]>([])

const addOffset = () => {
  moduleArray.value.push('offset')
}

const addFreeform = () => {
  moduleArray.value.push('freeform')
}

const addRandomize = () => {
  moduleArray.value.push('randomize')
}
</script>

<template>
  <div class="bg-slate-300 py-4">
    <div class="mb-3 flex justify-center gap-2">
      <button @click="addOffset" class="border px-2 py-1">Offset/Hold ꜜ</button>
      <button @click="addFreeform" class="border px-2 py-1">Freeform ꜜ</button>
      <button @click="addRandomize" class="border px-2 py-1">Randomize ꜜ</button>
    </div>
    <div class="flex justify-center gap-2">
      <MenuItem v-for="(item, index) in moduleArray" :key="index" :type="item" />
    </div>
  </div>
</template>
