
import type { ModuleObject } from '@/types.ts'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('store', () => {

  const modules = ref<ModuleObject[]>([])

  const visibleModuleID = ref<string>('')

  return { modules, visibleModuleID }
})
