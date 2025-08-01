<script setup lang="ts">
defineProps<{
  offset: number
  hold: number
}>()
</script>

<template>
  <div class="flex">
    <div class="h-3/5 w-3/5">{{ offset }}</div>
    <div class="h-3/5 w-3/5">{{ hold }}</div>
  </div>
</template>
