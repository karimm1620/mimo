import { create } from 'zustand';

import type { MascotReaction } from '@/types';

type MascotStore = {
  reaction: MascotReaction;
  /** Bumped on every react() call so components can key off it to replay animations. */
  reactionToken: number;
  react: (reaction: MascotReaction) => void;
  reset: () => void;
};

/**
 * Deliberately not persisted — the mascot's reaction is momentary UI state,
 * not app data. It resets to idle on next app launch.
 */
export const useMascotStore = create<MascotStore>((set) => ({
  reaction: 'idle',
  reactionToken: 0,

  react: (reaction) => set((state) => ({ reaction, reactionToken: state.reactionToken + 1 })),
  reset: () => set({ reaction: 'idle' }),
}));
