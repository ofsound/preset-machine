<script setup lang="ts">
import PageTwoRow from '@/components/PageTwoRow.vue'
</script>

<template>
  <h1>Page Two</h1>
  <div>
    <PageTwoRow v-for="n in 36" :key="n" :index="n" />
  </div>
</template>
