import { type Component } from 'vue'

export interface ModuleObject {
  component: Component
  id: string
}

export interface ComponentObject {
  component: Component
  label: string
}

export interface EnvelopeLabelAndSegment {
  envelopeSegment: number[]
  label: string
}

export interface Preset {
  [key: string]: number[] | string | object
  "uuid": string
  "name": string
  "author": string
  "description": string
  "version": string
  "derivedFrom": string
  "gains": number[]
  "offsets": number[]
  "attacks": number[]
  "decays": number[]
  "sustains": number[]
  "holds": number[]
  "releases": number[]
  "pitchMapping": number[]
  "glideTimesInBlocks": number[]
  "filterTable": number[]
  "tremDepths": number[]
  "tremRatesSeconds": number[]
  "tremRatesBeats": number[]
  "tremOffsets": number[]
  "tremWavetable": number[]
  "pitchDepths": number[]
  "pitchRatesSeconds": number[]
  "pitchRatesBeats": number[]
  "pitchNoiseAmounts": number[]
  "verbMix": number[]
  "parameters": {
    "volume": number
    "Attack": number
    "Attack Affects": number
    "Attack Curve": number
    "Attack Overshoot": number
    "Attack Shape": number
    "Decay": number
    "Decay Affects": number
    "Decay Curve": number
    "Decay Shape": number
    "Decay and Release Undershoot": number
    "Envelope Split": number
    "Envelope Timing": number
    "Filter Cutoff": number
    "Filter Slope": number
    "Glide Time": number
    "Glide Time Curve": number
    "Glide Time Distribution": number
    "Global Tuning": number
    "Harmonic Slew Ms": number
    "Hold": number
    "Hold Affects": number
    "Hold Curve": number
    "Hold Shape": number
    "Max Harmonics": number
    "Max Voices": number
    "Mono Mode": number
    "Offset": number
    "Offset Affects": number
    "Offset Curve": number
    "Offset Shape": number
    "Pitch Amount": number
    "Pitch Amount Affects": number
    "Pitch Amount Curve": number
    "Pitch Amount Distribution": number
    "Pitch Bend Range": number
    "Pitch Enable": number
    "Pitch Invert": number
    "Pitch LFO Shape": number
    "Pitch Noise Amount": number
    "Pitch Noise Curve": number
    "Pitch Noise Distribution": number
    "Pitch Noise Mode": number
    "Pitch Range": number
    "Pitch Rate Curve": number
    "Pitch Rate Distribution": number
    "Pitch Rate Hz": number
    "Pitch Rate Note": number
    "Pitch Stiffness": number
    "Pitch Sync Type": number
    "Randomize Phase": number
    "Release": number
    "Release Affects": number
    "Release Curve": number
    "Release Shape": number
    "Retrigger Pitch LFOs": number
    "Saturation": number
    "Sustain": number
    "Sustain Affects": number
    "Sustain Curve": number
    "Sustain Shape": number
    "Trem Amount": number
    "Trem Amount Curve": number
    "Trem Amount Distribution": number
    "Trem Enable": number
    "Trem Enable Attack": number
    "Trem Enable Decay": number
    "Trem Enable Hold": number
    "Trem Enable Release": number
    "Trem Enable Sustain": number
    "Trem Offset": number
    "Trem Offset Freq": number
    "Trem Offset Shape": number
    "Trem Rate Curve": number
    "Trem Rate Distribution": number
    "Trem Rate Hz": number
    "Trem Rate Note": number
    "Trem Sharpness": number
    "Trem Sync Type": number
    "Trem Type": number
    "Trem Type Invert": number
    "Unison Spread": number
    "Unison Stereo": number
    "Unison Voices": number
    "Velocity Sensitivity": number
    "gain01": number
    "gain02": number
    "gain03": number
    "gain04": number
    "gain05": number
    "gain06": number
    "gain07": number
    "gain08": number
    "gain09": number
    "gain10": number
    "gain11": number
    "gain12": number
    "gain13": number
    "gain14": number
    "gain15": number
    "gain16": number
    "gain17": number
    "gain18": number
    "gain19": number
    "gain20": number
    "gain21": number
    "gain22": number
    "gain23": number
    "gain24": number
    "gain25": number
    "gain26": number
    "gain27": number
    "gain28": number
    "gain29": number
    "gain30": number
    "gain31": number
    "gain32": number
    "gain33": number
    "gain34": number
    "gain35": number
    "gain36": number
    "relativeMode": number
    "One Shot": number
    "width": number
    "Env->Pitch": number
    "Env->Trem": number
    "Fine Tuning": number
    "Glide Frequency": number
    "Glide Mode": number
    "Glide Semitones": number
    "Glide Time Affects": number
    "Keyboard->ENV": number
    "Pitch Noise Affects": number
    "Reverb Affects": number
    "Reverb Mix": number
    "Reverb Time": number
    "Reverb X (Distribution)": number
    "Reverb Y (Curve)": number
    "Slop": number
    "Transpose": number
    "Trem Amount Affects": number
    "Filter Type": number
  }
}

export interface PresetModLayer {
  moduleID: string
  "offsets": number[]
  "attacks": number[]
  "decays": number[]
  "sustains": number[]
  "holds": number[]
  "releases": number[]
}
