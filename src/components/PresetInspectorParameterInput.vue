<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  idName: String,
  labelText: String,
  modelValue: Number, // Used by v-model
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label :for="idName">
    <span>{{ labelText }}:</span>
    <input
      :id="idName"
      :name="idName"
      type="text"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
