<script setup lang="ts">
import PageTwoRow from '@/components/PageTwoRow.vue'
</script>

<template>
  <div>
    <PageTwoRow v-for="n in 36" :key="n" :index="n" />
  </div>
</template>
