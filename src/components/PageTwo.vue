<script setup lang="ts">
import PageTwoRow from '@/components/PageTwoRow.vue'

const harmonicRowColors = [
  '#b82619',
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
  '#e28d18',
  '#e29b1f',
  '#e4a827',
  '#e6b12c',
  '#e3be35',
  '#c4b44b',
  '#a1a961',
  '#849f77',
  '#67978c',
  '#3d8aa6',
  '#2e7db7',
  '#376db9',
  '#415aba',
  '#5a32bf',
  '#6222c0',
  '#681fbb',
  '#721fa8',
  '#7a209f',
  '#7f2296',
  '#84218d',
  '#8b2384',
  '#8f227b',
  '#58004e',
]
</script>

<template>
  <div class="bg-black">
    <PageTwoRow
      v-for="n in 36"
      :key="n"
      :index="n"
      :color="harmonicRowColors[n]!"
    />
  </div>
</template>
