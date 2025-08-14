<script setup lang="ts">
import { useStore } from '@/stores/store'
const store = useStore()
</script>

<template>
  <div class="hidden">{{ store.preset }}</div>
</template>
