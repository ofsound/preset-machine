<script setup lang="ts">
import PageTwoRow from '@/components/PageTwoRow.vue'
</script>

<template>
  <div class="bg-gray-800">
    <PageTwoRow v-for="n in 36" :key="n" :index="n" />
  </div>
</template>
