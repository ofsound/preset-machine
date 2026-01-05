<script setup lang="ts">
import { ref, computed } from 'vue'

import { isPrime, isFibonacci } from '@/utils/math'

const selected = ref('All')

const activeHarmonicsMode: Array<{ label: string }> = [
  { label: 'All' },
  { label: 'Odd' },
  { label: 'Even' },
  { label: 'Octaves' },
  { label: 'Not Octaves' },
  { label: 'Fifths' },
  { label: 'Not Fifths' },
  { label: 'Primes' },
  { label: 'Not Primes' },
  { label: 'Fibonacci' },
  { label: 'Not Fibonacci' },
  { label: 'List' },
]

const lowestHarmonic = ref<number>(1)
const highestHarmonic = ref<number>(30)

const activeHarmonics = computed(() => {
  const allHarmonics: number[] = Array.from({ length: 511 }, (_, i) => i + 1)

  let activeHarmonicsBeforeRange: number[] = []

  switch (selected.value) {
    case 'All':
      activeHarmonicsBeforeRange = [...allHarmonics]
      break
    case 'Odd':
      activeHarmonicsBeforeRange = allHarmonics.filter((n) => n % 2 !== 0)
      break
    case 'Even':
      activeHarmonicsBeforeRange = allHarmonics.filter((n) => n % 2 === 0)
      break
    case 'Octaves':
      activeHarmonicsBeforeRange = allHarmonics.filter(
        (n) => Math.log2(n) % 1 === 0,
      )
      break
    case 'Not Octaves':
      activeHarmonicsBeforeRange = allHarmonics.filter(
        (n) => Math.log2(n) % 1 !== 0,
      )
      break
    case 'Fifths':
      activeHarmonicsBeforeRange = allHarmonics.filter(
        (n) => Math.log2(n / 3) % 1 === 0,
      )
      break
    case 'Not Fifths':
      activeHarmonicsBeforeRange = allHarmonics.filter(
        (n) => Math.log2(n / 3) % 1 !== 0,
      )
      break
    case 'Primes':
      activeHarmonicsBeforeRange = allHarmonics.filter((n) => isPrime(n))
      break
    case 'Not Primes':
      activeHarmonicsBeforeRange = allHarmonics.filter((n) => !isPrime(n))
      break
    case 'Fibonacci':
      activeHarmonicsBeforeRange = allHarmonics.filter((n) => isFibonacci(n))
      break
    case 'Not Fibonacci':
      activeHarmonicsBeforeRange = allHarmonics.filter((n) => !isFibonacci(n))
      break
  }

  const activeHarmonicsInRange: number[] = activeHarmonicsBeforeRange.filter(
    (value) => value >= lowestHarmonic.value && value <= highestHarmonic.value,
  )

  return activeHarmonicsInRange
})
</script>

<template>
  <div class="flex gap-4">
    <div>
      Lowest Harmonic:
      <input
        name="num-harmonics"
        id="num-harmonics"
        class="max-w-14 rounded-sm bg-gray-300 p-1"
        type="number"
        v-model="lowestHarmonic"
      />
    </div>
    <div>
      Highest Harmonic:
      <input
        name="num-harmonics"
        id="num-harmonics"
        class="max-w-14 rounded-sm bg-gray-300 p-1"
        type="number"
        v-model="highestHarmonic"
      />
    </div>
  </div>
  <div class="my-4">
    <label for="my-select">Filter Active Harmonics: </label>
    <select id="my-select" v-model="selected">
      <option
        v-for="option in activeHarmonicsMode"
        :value="option.label"
        :key="option.label"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
  <!-- <textarea name="list" id="list" class="bg-gray-200"></textarea> -->
  <div class="mb-4">
    {{ activeHarmonics }}
  </div>
</template>
