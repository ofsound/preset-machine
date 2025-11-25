<script setup lang="ts">
import PageTwoRow from '@/components/PageTwoRow.vue'

const harmonicRowColors = [
  '#b82619',
  '#bd2c1b',
  '#ce4a24',
  '#ce5125',
  '#cf5927',
  '#cf6228',
  '#d06a2a',
  '#d0732c',
  '#d17e30',
  '#d38834',
  '#d59339',
  '#d89e3f',
  '#daa844',
  '#dcb44a',
  '#dfbf50',
  '#bfb35c',
  '#9da66e',
  '#7c9984',
  '#5d8d9a',
  '#4480b2',
  '#4471b2',
  '#4561b2',
  '#4852b4',
  '#4e42b4',
  '#5434b6',
  '#5a25b7',
  '#6124b1',
  '#6525a9',
  '#6a26a1',
  '#6e2799',
  '#732892',
  '#782989',
  '#7d2a82',
  '#822b7a',
  '#872d73',
]
</script>

<template>
  <div class="bg-black">
    <PageTwoRow
      v-for="n in 34"
      :key="n"
      :index="n"
      :color="harmonicRowColors[n]!"
    />
  </div>
</template>
