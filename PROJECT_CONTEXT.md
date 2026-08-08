# PROJECT_CONTEXT.md

Cross-session context for the habit tracker app. Read this before starting new
work in a fresh session — it captures decisions already made so they don't
get re-litigated or silently contradicted.

## What this is

A habit + routine tracker built from `habit_tracker_unified_design_prompt_expo57_ux_techstack.md`
(65-section design/UX spec). Mascot-driven, warm/playful visual identity
(cream backgrounds, orange primary, varied pastel accents) — distinct from
other Expo apps in this workspace (e.g. heibi/tabungan-kertas, which uses a
Material 3 Expressive Android design language). Don't cross-pollinate design
tokens between the two.

## Stack (verified against source, not memory)

- Expo SDK **57.0.11**, React Native **0.86.2**, React **19.2.3**, Node ≥22.13.
  Verified against `expo.dev/changelog/sdk-57` and `docs.expo.dev/versions/latest`
  before scaffolding — this is a non-breaking release from SDK 56.
- **NativeWind v5 preview** (`nativewind@preview` + `react-native-css`), **not**
  the stable v4 line. v5 uses `className` directly on RN components — no
  wrapper components, no babel plugin. Followed `nativewind.dev/v5` (the live
  docs), which is more current than the bundled `expo-tailwind-setup` skill —
  that skill still describes an older v5-preview API shape (explicit
  `useCssElement` wrappers) that's since been simplified. If the skill and the
  live docs disagree again in a future session, trust the live docs.
- `lightningcss` is pinned to `1.30.1` via `package.json` overrides — required
  for nativewind/tailwindcss's CSS processing to resolve consistently.
- Zustand for state, AsyncStorage for persistence (offline-first, no backend).
- React Compiler is **on** (`app.json` → `experiments.reactCompiler`, an SDK 57
  template default). This makes `eslint-config-expo`'s `react-hooks/immutability`
  rule flag Reanimated's `sharedValue.value = x` mutation as unsafe — it's a
  false positive (that mutation is the library's intended API, not React
  state). Disabled that rule + `react-hooks/set-state-in-effect` in
  `eslint.config.js` with a comment explaining why, rather than rewriting
  idiomatic Reanimated/hydration code around an overly strict linter.

## Architecture decisions

- **Navigation**: root `Stack`, not tabs. The reference screenshots don't show
  a persistent bottom tab bar on the home screen; Progress/Settings are
  reached via icon buttons, habit creation/edit/mood-check-in are modal
  routes. This is an assumption, not a hard requirement from the spec — easy
  to swap for `NativeTabs` if that turns out to be wrong.
- **Folder structure** follows spec section 55 / the `expo-project-structure`
  skill: `src/app` is routes-only (thin files that import from `src/screens`),
  actual screen bodies live in `src/screens/<area>`, shared UI in
  `src/components/ui`, domain-specific components in
  `src/components/{habits,mascot,progress,mood}`.
- **Data layer**: generic AsyncStorage JSON-collection helper
  (`src/repositories/storage.ts`) underlies all repositories. Each domain
  repository (`habit-repository.ts`, `completion-repository.ts`, etc.) is a
  thin, typed wrapper — no ORM, no schema migrations yet (not needed until
  the data shape actually changes post-launch).
- **Stores** are one per domain (`habit`, `completion`, `mood`, `mascot`,
  `settings`, `onboarding`) plus a deliberately thin `progress` store that
  only holds UI state (selected range). Streak/heatmap numbers are *derived*
  from habit + completion data via `src/utils/streak.ts`, not duplicated into
  their own store — avoids a second source of truth for the same numbers.
- **Theme**: `src/theme.ts` is the JS-side source of truth (colors, spacing,
  radius, elevation, motion timings) for anything that needs raw values
  (Reanimated, dynamic `style=` props). `src/global.css` mirrors the same
  color values as CSS variables registered under Tailwind's `@theme` so
  `className="bg-app-primary"` etc. work. **If you change a color, update
  both files** — there's no single source of truth linking them yet.
- **Mascot store is not persisted** — its reaction is momentary UI state that
  should reset to idle on every launch, unlike everything else which is
  AsyncStorage-backed.

## Status: Foundation checkpoint complete

Done: project scaffold, NativeWind/Tailwind, folder structure, theme system,
domain types, repositories, all 7 stores, UI primitives (`Screen`, `AppText`,
`AppButton`, `AppCard`, `IconButton`, `AnimatedPressable`, `BottomSheet`),
navigation shell with every route wired to a real (if placeholder) screen
component, a functional Home screen reading from real stores, a minimal
onboarding gate. Verified: `tsc --noEmit` clean, `eslint .` clean, `prettier
--check` clean, `expo export --platform android` bundles without errors
(3811 modules).

Not done: the actual designed UI for ~63 of the spec's 65 sections. Home has
real data wiring but placeholder visual polish; every other screen
(`src/screens/*`) is a literal "Coming soon" placeholder that already reads
from the correct store, so swapping in real UI shouldn't require re-plumbing
data or navigation.

## Suggested next checkpoints (unconfirmed — propose reordering freely)

1. Habit creation/edit form (bottom sheet) + icon/color picker
2. Habit detail screen, split by `HabitType` (check / amount / duration)
3. Progress screen: streaks, consistency heatmap, weekly/monthly stats
4. Mood + texture check-in screens
5. Mascot system (reactions, idle animation, celebration states)
6. Onboarding flow (multi-step, currently a single placeholder screen)
7. Settings screen (reminders, backup/export, reduced motion)
8. Notifications (per-habit reminders)
9. Home screen visual polish pass (once the above establish shared patterns)
10. Widgets (Jetpack Glance, following the pattern from the heibi project's
    `modules/expo-home-widgets` local Expo module, if a similar approach is
    wanted here)
