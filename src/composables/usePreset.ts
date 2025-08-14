import { reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid'

import type { SineMachinePreset } from '@/types/SineMachinePreset.ts'

const preset = reactive<SineMachinePreset>({
  uuid: uuidv4(),
  name: 'New Preset',
  author: 'BJM',
  description: '',
  version: '',
  gains: [0],
  offsets: [0],
  attacks: [0],
  decays: [0],
  sustains: [0],
  holds: [0],
  releases: [0],
})

export function usePreset() {
  return {
    preset
  };
}
