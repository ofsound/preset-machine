<script setup lang="ts">
const offset = defineModel('offset')
const hold = defineModel('hold')
</script>

<template>
  <div class="mb-4 flex">
    <input type="text" v-model="offset" />
    <input type="text" v-model="hold" />

    <div class="segment bg-amber-400"></div>
  </div>
</template>

<style scoped>
.segment {
  margin-left: v-bind(offset * 10 + 'px');
  width: v-bind(hold * 5 + 'px');
}
</style>
