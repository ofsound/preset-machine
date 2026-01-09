<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { isPrime, isFibonacci } from '@/utils/math'

const emit = defineEmits(['update:activeHarmonics'])

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
  const checks = {
    isEven: (n: number) => n % 2 === 0,
    isOctave: (n: number) => Math.log2(n) % 1 === 0,
    isFifth: (n: number) => Math.log2(n / 3) % 1 === 0,
    isPrime: (n: number) => isPrime(n),
    isFibonacci: (n: number) => isFibonacci(n),
  }

  const filterStrategies: Record<string, (n: number) => boolean> = {
    All: () => true,
    Odd: (n) => !checks.isEven(n),
    Even: checks.isEven,
    Octaves: checks.isOctave,
    'Not Octaves': (n) => !checks.isOctave(n),
    Fifths: checks.isFifth,
    'Not Fifths': (n) => !checks.isFifth(n),
    Primes: checks.isPrime,
    'Not Primes': (n) => !checks.isPrime(n),
    Fibonacci: checks.isFibonacci,
    'Not Fibonacci': (n) => !checks.isFibonacci(n),
    List: (n) => customListArray.value.includes(n),
  }

  return Array.from({ length: 511 }, (_, i) => i + 1).filter((n) => {
    const filterStrategy = filterStrategies[selected.value]!
    const matchesType = filterStrategy(n)
    const inRange = n >= lowestHarmonic.value && n <= highestHarmonic.value

    return matchesType && inRange
  })
})

const customListArray = ref<number[]>([])

const customList = computed({
  get() {
    return customListArray.value.join(', ')
  },
  set(newValue) {
    customListArray.value = newValue
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map(Number)
  },
})

watch(activeHarmonics, (newValue) => {
  emit('update:activeHarmonics', newValue)
})
</script>

<template>
  <div class="p-4">
    <div class="flex gap-4">
      <div class="w-36 font-semibold">Active Harmonics</div>
      <div class="text-sm font-semibold">
        Min:
        <input
          name="num-harmonics"
          id="num-harmonics"
          class="w-11 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold tabular-nums"
          type="text"
          v-model="lowestHarmonic"
        />
      </div>
      <div class="text-sm font-semibold">
        Max:
        <input
          name="num-harmonics"
          id="num-harmonics"
          class="w-11 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold tabular-nums"
          type="text"
          v-model="highestHarmonic"
        />
      </div>
      <div class="text-sm font-semibold">
        <label for="my-select">Filter: </label>
        <select
          id="my-select"
          v-model="selected"
          class="w-32 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold tabular-nums"
          :title="activeHarmonics.join(', ')"
        >
          <option
            v-for="option in activeHarmonicsMode"
            :value="option.label"
            :key="option.label"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <textarea
      name="list"
      id="list"
      v-model="customList"
      placeholder="Copy and Paste a list of comma separated numbers here."
      class="w-full bg-gray-200 p-2"
      v-show="selected === 'List'"
    ></textarea>
  </div>
</template>
