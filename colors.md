# Mimo — Color System

> A warm, playful, soft color system for Mimo.
>
> The palette is intentionally muted and creamy rather than neon. Colors should feel like stationery, soft toys, fruit candy, and a sunny morning — not like a generic productivity dashboard.

---

## 01. Color Direction

Mimo's visual language is:

- warm
- cheerful
- soft
- tactile
- slightly playful
- friendly rather than corporate
- colorful without becoming loud

### Core rule

**Cream backgrounds + dark warm text + one expressive accent at a time.**

Do not turn every component into a different bright color. Color creates hierarchy, emotion, and feedback — not decoration for decoration's sake.

---

## 02. Core Palette

### Warm Paper

| Token | Hex | Use |
|---|---|---|
| `cream-50` | `#FFFDF7` | Primary application background |
| `cream-100` | `#FFF8EA` | Soft secondary sections |
| `cream-200` | `#F8EFD9` | Warm borders/dividers |

### Ink

Mimo should avoid pure black.

| Token | Hex | Use |
|---|---|---|
| `ink-900` | `#302D2A` | Headings, habit names, important numbers |
| `ink-700` | `#625C56` | Secondary text |
| `ink-500` | `#918A82` | Muted text |
| `ink-300` | `#C9C2B9` | Disabled / placeholder text |

---

## 03. Mimo Green

The primary identity color.

| Token | Hex | Use |
|---|---|---|
| `mimo-400` | `#9AD8BC` | Soft highlight / interaction surface |
| `mimo-500` | `#7FC9A8` | Primary brand, completion, positive progress |
| `mimo-600` | `#62AE8D` | Pressed state and stronger emphasis |

Mimo green should feel soft, not neon.

---

## 04. Supporting Accents

### Peach

| Token | Hex |
|---|---|
| `peach-400` | `#F7C39C` |
| `peach-500` | `#F4A978` |
| `peach-600` | `#E58C5E` |

Use for friendly highlights, illustrations, mood accents, and secondary actions.

### Butter Yellow

| Token | Hex |
|---|---|
| `butter-400` | `#F8E5A4` |
| `butter-500` | `#F5D77A` |

Use for streaks, stars, milestones, and celebrations.

### Lavender

| Token | Hex |
|---|---|
| `lavender-400` | `#D4C9F2` |
| `lavender-500` | `#B9A7E8` |

Use occasionally for mood/reflection and secondary visualizations.

### Sky Blue

| Token | Hex |
|---|---|
| `sky-400` | `#B9DFF1` |
| `sky-500` | `#91C9E8` |

Use for informational states and cool visual balance.

### Rose

| Token | Hex |
|---|---|
| `rose-400` | `#F3C1C1` |
| `rose-500` | `#E99A9A` |

Use sparingly for emotional states and soft warnings.

---

## 05. Semantic Colors

| Token | Hex | Meaning |
|---|---|---|
| `success` | `#62AE8D` | Completed / positive |
| `success-soft` | `#DDF2E7` | Positive background |
| `warning` | `#E5A85E` | Needs attention |
| `warning-soft` | `#FBE8C8` | Warning background |
| `error` | `#D97979` | Actual error |
| `error-soft` | `#F7DADA` | Error background |
| `info` | `#6FAACB` | Informational |
| `info-soft` | `#DCEEF7` | Informational background |

**Important:** a missed habit is NOT an error. Do not use aggressive red for missed habits. Use neutral/supportive styling.

---

## 06. Surface System

Keep surfaces restrained.

| Token | Hex | Use |
|---|---|---|
| `surface-background` | `#FFFDF7` | Main canvas |
| `surface` | `#FFFFFF` | Primary cards/sheets |
| `surface-warm` | `#FFF8EA` | Grouped sections |
| `surface-green` | `#EAF7EF` | Positive/completed sections |
| `surface-peach` | `#FFF0E4` | Warm sections |
| `surface-lavender` | `#F0ECFA` | Mood/reflection sections |
| `surface-blue` | `#EAF5FB` | Informational sections |

Do not give every card a different saturated background.

---

## 07. Borders & Shadows

### Borders

| Token | Hex |
|---|---|
| `border-soft` | `#EEE7DC` |
| `border-warm` | `#E5DAC9` |

Use subtle borders. Avoid thick dark outlines.

### Shadows

Use warm, low-opacity shadows.

```text
rgba(48, 45, 42, 0.08)
```

Stronger elevation:

```text
rgba(48, 45, 42, 0.12)
```

The shadow should feel like a soft object sitting above paper.

Avoid huge blur, heavy black shadows, or neon glows.

---

## 08. Habit Colors

Habits may have individual accents, but stay inside Mimo's palette.

| Habit | Color |
|---|---|
| General | `#7FC9A8` |
| Exercise | `#F4A978` |
| Reading | `#B9A7E8` |
| Water | `#91C9E8` |
| Sleep | `#AFA7D8` |
| Study | `#F5D77A` |
| Creative | `#E9A3B2` |
| Outdoor | `#8FC5A0` |

These are accents, not full-screen backgrounds.

---

## 09. Mood Colors

Mood colors are expressive, not clinical.

| Mood | Color |
|---|---|
| Great | `#F5D77A` |
| Good | `#7FC9A8` |
| Okay | `#91C9E8` |
| Low | `#B9A7E8` |
| Rough | `#E99A9A` |

Only the selected mood should receive strong emphasis. Do not recolor the entire screen.

---

## 10. Streak & Achievement Colors

Primary:

`#F5D77A`

Secondary:

`#F4A978`

Positive support:

`#7FC9A8`

Use these for streak numbers, stars, milestone badges, celebration particles, and mascot reactions.

Do not turn the entire screen yellow when a streak increases.

---

## 11. Heatmap Palette

The heatmap should clearly belong to Mimo.

| Level | Color |
|---|---|
| Empty | `#F1ECE2` |
| Level 1 | `#DDF2E7` |
| Level 2 | `#B9E4CB` |
| Level 3 | `#92D5B2` |
| Level 4 | `#62AE8D` |

The strongest green represents the highest consistency.

Do not use unrelated colors for different heatmap levels.

---

## 12. Mascot — Momo

Momo should visually belong to Mimo.

| Element | Color |
|---|---|
| Primary body | `#7FC9A8` |
| Light body/highlight | `#9AD8BC` |
| Deep detail | `#62AE8D` |
| Face/details | `#302D2A` |
| Optional blush | `#F4A978` |

Momo should not use every palette color simultaneously. Keep the character visually simple.

---

## 13. Color Usage Ratio

Starting point:

```text
60%  Cream / neutral surfaces
25%  White / warm surfaces
10%  Mimo green
 5%  Other expressive accents
```

The exact ratio can change per screen.

The principle is:

> **Let the interface breathe.**

Do not make Mimo look like a rainbow dashboard.

---

## 14. Gradient Policy

Mimo is **not gradient-dependent**.

Most UI surfaces should use flat colors.

If a gradient is genuinely useful for a hero illustration or special celebration, keep it subtle and derive it from existing palette colors.

Good examples:

```text
#FFF8EA → #FFFDF7
#EAF7EF → #FFFDF7
```

Avoid rainbow gradients, neon gradients, generic purple-blue SaaS gradients, and gradients on every card/button.

---

## 15. Dark Mode

Dark mode is a designed theme, not an inverted light mode.

| Token | Hex |
|---|---|
| Background | `#242220` |
| Surface | `#302D2A` |
| Elevated Surface | `#3A3632` |
| Primary Text | `#FFF8EA` |
| Secondary Text | `#CFC6BA` |
| Mimo Green | `#8ED5B4` |
| Peach | `#F2B28A` |
| Butter | `#F3D981` |
| Lavender | `#C7B8EA` |
| Sky | `#9DCEE7` |
| Rose | `#E9A6A6` |

Dark mode should remain warm and soft. Do not use pure black.

---

## 16. Accessibility

Color is never the only way to communicate meaning.

```text
Completed
✓ + green

Warning
! + amber

Error
× + red

Selected
background + icon/check
```

Important text must maintain sufficient contrast.

Interactive states must remain understandable without relying only on hue.

---

## 17. React Native Theme Tokens

Keep the palette centralized.

```ts
export const colors = {
  cream: {
    50: "#FFFDF7",
    100: "#FFF8EA",
    200: "#F8EFD9",
  },

  ink: {
    300: "#C9C2B9",
    500: "#918A82",
    700: "#625C56",
    900: "#302D2A",
  },

  mimo: {
    400: "#9AD8BC",
    500: "#7FC9A8",
    600: "#62AE8D",
  },

  peach: {
    400: "#F7C39C",
    500: "#F4A978",
    600: "#E58C5E",
  },

  butter: {
    400: "#F8E5A4",
    500: "#F5D77A",
  },

  lavender: {
    400: "#D4C9F2",
    500: "#B9A7E8",
  },

  sky: {
    400: "#B9DFF1",
    500: "#91C9E8",
  },

  rose: {
    400: "#F3C1C1",
    500: "#E99A9A",
  },

  border: {
    soft: "#EEE7DC",
    warm: "#E5DAC9",
  },
} as const;
```

Do not hardcode random hex values inside individual components.

All colors should come from the centralized theme unless there is a documented reason otherwise.

---

## 18. Design Intent

Mimo should feel like:

**a friendly little habit companion living inside a warm notebook.**

It should NOT look like:

- a corporate productivity dashboard
- a finance app
- a generic wellness SaaS
- a neon gamification app
- an AI-generated Dribbble concept
- a dashboard with random pastel cards

The palette exists to support the mascot, tactile interactions, habit completion, mood tracking, streaks, heatmaps, and the visual references without overwhelming them.

**Soft. Warm. Cheerful. Human. Tactile.**

That is the color identity of Mimo.
