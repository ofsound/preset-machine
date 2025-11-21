
export interface SineMachinePreset {
  uuid: string;
  name: string;
  author: string;
  description: string;
  version: string;
  // derivedFrom: string;
  gains: number[];
  offsets: number[];
  attacks: number[];
  decays: number[];
  sustains: number[];
  holds: number[];
  releases: number[];
  // glideTimesInBlocks: number[];
  // filterTable: number[];
  // tremDepths: number[];
  // tremRatesSeconds: number[];
  // tremRatesBeats: number[];
  // tremOffsets: number[];
  // tremWavetable: number[];
  // pitchDepths: number[];
  // pitchRatesSeconds: number[];
  // pitchRatesBeats: number[];
  // pitchNoiseAmounts: number[];
  // parameters: { [key: string]: number };
}
