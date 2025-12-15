import { get, writable } from 'svelte/store';
import { activityLog } from './activityLog';

export type GameClockState = {
  // Current game time in ms since epoch (Earth-like calendar, accelerated)
  nowMs: number;
  // Running state
  running: boolean;
  // Speed multiplier (e.g., 1x, 60x, 360x)
  speed: number;
};

function createGameClock() {
  // Base game time epoch; start from real time by default
  let baseGameMs = Date.now();
  // Real time when the current run started
  let realStartMs = Date.now();

  // Internal timer id
  let timer: ReturnType<typeof setInterval> | null = null;

  const state = writable<GameClockState>({
    nowMs: baseGameMs,
    running: true,
    speed: 60, // default: 60x (1 real second = 1 game minute)
  });

  const startTicker = () => {
    if (timer) return;
    realStartMs = Date.now();
    timer = setInterval(() => {
      state.update((s) => {
        if (!s.running) return s;
        const realElapsed = Date.now() - realStartMs;
        const gameElapsed = realElapsed * s.speed;
        return { ...s, nowMs: baseGameMs + gameElapsed };
      });
    }, 250); // update ~4 times per second for smoothness
  };

  const stopTicker = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  // Initialize ticker
  startTicker();

  const formatClockLabel = (ms: number) => {
    const d = new Date(ms);
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const day = d.toLocaleDateString([], { month: 'short', day: '2-digit' });
    return `${day} ${time}`;
  };

  return {
    subscribe: state.subscribe,
    // Set absolute game time
    setGameTime(date: Date) {
      baseGameMs = date.getTime();
      realStartMs = Date.now();
      state.update((s) => ({ ...s, nowMs: baseGameMs }));
    },
    // Set speed multiplier
    setSpeed(multiplier: number) {
      state.update((s) => ({ ...s, speed: Math.max(0, multiplier) }));
      // reset realStart baseline so drift is minimized when changing speed
      realStartMs = Date.now();
      // Rebase baseGameMs to current displayed time to keep continuity
      let current: GameClockState;
      state.subscribe((s) => (current = s))();
      baseGameMs = current!.nowMs;
    },
    // Pause progression
    pause() {
      const current = get(state);
      if (!current.running) return;
      state.update((s) => ({ ...s, running: false }));
      activityLog.addEvent('time', `Time paused @ ${formatClockLabel(current.nowMs)}`, '⏸️');
    },
    // Resume progression
    resume() {
      // Rebase baselines for seamless continuation
      const current = get(state);
      if (current.running) return;
      baseGameMs = current.nowMs;
      realStartMs = Date.now();
      state.update((s) => ({ ...s, running: true }));
      activityLog.addEvent('time', `Time resumed (×${current.speed})`, '⏵️');
      startTicker();
    },
    // Reset to real current wall-clock time
    resetToNow() {
      baseGameMs = Date.now();
      realStartMs = Date.now();
      state.update((s) => ({ ...s, nowMs: baseGameMs }));
    },
    // Cleanup (for SSR or navigation)
    stop() {
      stopTicker();
    },
  };
}

export const gameClock = createGameClock();
