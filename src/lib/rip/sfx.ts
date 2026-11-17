"use client";

// Chiptune sound effects synthesised with Web Audio (no audio files), plus haptics. The
// AudioContext is created on the first sound, which always follows a tap or click, so browsers
// allow it. Muting is remembered.

import type { Tier } from "./types";

const KEY = "decard:rip:sound";
let ctx: AudioContext | null = null;
let muted: boolean | null = null;

export function isMuted() {
  if (muted === null) muted = typeof localStorage !== "undefined" && localStorage.getItem(KEY) === "off";
  return muted;
}

export function setMuted(m: boolean) {
  muted = m;
  try {
    localStorage.setItem(KEY, m ? "off" : "on");
  } catch {
    // private mode: keep it for this visit
  }
}

function audio(): AudioContext | null {
  if (isMuted() || typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** One note. `at` is seconds from now. */
function tone(freq: number, at: number, dur: number, type: OscillatorType = "square", vol = 0.06, to?: number) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + at;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise(at: number, dur: number, vol = 0.08, freq = 1800) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + at;
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / ch.length);
  const src = a.createBufferSource();
  const f = a.createBiquadFilter();
  const g = a.createGain();
  src.buffer = buf;
  f.type = "bandpass";
  f.frequency.setValueAtTime(freq, t);
  f.frequency.exponentialRampToValueAtTime(freq / 4, t + dur);
  g.gain.setValueAtTime(vol, t);
  src.connect(f).connect(g).connect(a.destination);
  src.start(t);
}

// Note frequencies, C4 = 261.63.
const N = (semi: number) => 261.63 * 2 ** (semi / 12);
const C5 = N(12), E5 = N(16), G5 = N(19), A5 = N(21), C6 = N(24), D6 = N(26), E6 = N(28), G6 = N(31), G4 = N(7);

export const sfx = {
  /** UI select blip. */
  tick: () => tone(1320, 0, 0.05, "square", 0.03),
  /** One wobble of the pack or ball. */
  shake: () => {
    tone(220, 0, 0.06, "triangle", 0.08, 160);
    tone(330, 0.07, 0.05, "triangle", 0.05);
  },
  /** Rising whine while the pack charges. */
  charge: (p: number) => tone(300 + p * 900, 0, 0.07, "sawtooth", 0.025),
  tear: () => {
    noise(0, 0.32, 0.12, 2600);
    tone(880, 0.02, 0.25, "square", 0.04, 220);
  },
  /** The reveal jingle: longer and brighter the rarer the pull. */
  reveal: (tier: Tier) => {
    const lines: Record<Tier, [number, number][]> = {
      common: [[C5, 0], [E5, 0.09], [G5, 0.18]],
      rare: [[G4, 0], [C5, 0.08], [E5, 0.16], [G5, 0.24], [C6, 0.32]],
      epic: [[C5, 0], [E5, 0.07], [G5, 0.14], [C6, 0.21], [E6, 0.28], [G6, 0.4]],
      legendary: [[G4, 0], [C5, 0.1], [E5, 0.2], [G5, 0.3], [E5, 0.42], [G5, 0.5], [C6, 0.62], [D6, 0.74], [E6, 0.86], [G6, 1.0]],
    };
    for (const [f, at] of lines[tier]) tone(f, at, tier === "legendary" ? 0.22 : 0.16, "square", 0.05);
    if (tier !== "common") for (const [f, at] of lines[tier]) tone(f / 2, at, 0.18, "triangle", 0.04);
    if (tier === "legendary") noise(0.95, 0.6, 0.05, 6000);
  },
  /** Coins for a sale. */
  coin: () => {
    tone(A5 * 2, 0, 0.08, "square", 0.04);
    tone(E6, 0.08, 0.22, "square", 0.04);
  },
  levelUp: () => [C5, E5, G5, C6, G5, C6].forEach((f, i) => tone(f, i * 0.07, 0.12, "square", 0.04)),
};

/** A short vibration on phones that support it (Android). */
export function haptic(pattern: number | number[]) {
  if (isMuted()) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // unsupported
  }
}
