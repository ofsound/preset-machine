<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

import { v4 as uuidv4 } from 'uuid'

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
const highestHarmonic = ref<number>(36)

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

const selectText = (e: PointerEvent) => {
  const clickedInput = e.target as HTMLInputElement
  clickedInput.select()
}

watch(activeHarmonics, (newValue) => {
  emit('update:activeHarmonics', newValue)
})

onMounted(() => {
  emit('update:activeHarmonics', activeHarmonics.value)
})
</script>

<template>
  <div class="p-4">
    <div class="flex gap-8">
      <div
        class="w-34 self-center text-[15px] font-bold tracking-wider text-zinc-400 uppercase"
      >
        Harmonics
      </div>
      <div class="text-sm font-semibold text-neutral-700">
        Min:&nbsp;&nbsp;
        <input
          type="text"
          name="min-harmonics"
          :id="`min-harmonics${uuidv4()}`"
          @click="selectText"
          v-model="lowestHarmonic"
          class="w-11 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold text-black tabular-nums"
        />
      </div>
      <div class="text-sm font-semibold text-neutral-700">
        Max:&nbsp;&nbsp;
        <input
          type="text"
          name="max-harmonics"
          :id="`max-harmonics${uuidv4()}`"
          v-model="highestHarmonic"
          @click="selectText"
          class="w-11 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold text-black tabular-nums"
        />
      </div>
      <div class="text-sm font-semibold text-neutral-700">
        Filter:&nbsp;&nbsp;
        <select
          name="my-select"
          :id="`my-select${uuidv4()}`"
          v-model="selected"
          class="w-32 rounded-sm border border-neutral-300 bg-neutral-100 p-1 px-2 text-right text-sm font-semibold text-black tabular-nums"
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
      :id="`list${uuidv4()}`"
      v-model="customList"
      placeholder="Copy and Paste a list of comma separated numbers here."
      class="w-full bg-gray-200 p-2"
      v-show="selected === 'List'"
    ></textarea>
  </div>
</template>
