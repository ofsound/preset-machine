<script setup lang="ts">
import PageTwoRow from '@/components/PageTwoRow.vue'

import { useStore } from '@/stores/store'
const store = useStore()
</script>

<template>
  <div class="flex flex-col-reverse bg-black">
    <PageTwoRow
      v-for="index in 34"
      :key="index"
      :index="index"
      :color="store.harmonicRowColorsReversed[index]!"
    />
  </div>
</template>
