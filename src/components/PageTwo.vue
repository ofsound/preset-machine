<script setup lang="ts">
import PageTwoRow from '@/components/PageTwoRow.vue'

import { useStore } from '@/stores/store'
const store = useStore()
</script>

<template>
  <div class="bg-black">
    <PageTwoRow
      v-for="n in 34"
      :key="n"
      :index="n"
      :color="store.harmonicRowColors[n]!"
    />
  </div>
</template>
