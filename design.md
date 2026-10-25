# Design — NichePop

A locked design system for nichepop.app (marketing site + workspace). Every page
redesign reads this file before emitting code. Do not regenerate per page — extend
or amend this file when the system needs to grow. Tokens live in `app/tokens.css`;
`app/globals.css` maps them onto the shadcn / Tailwind names the components use.

## Genre
playful — theme **Hum** (cream paper, pear / sky-cyan / coral multi-accent,
rounded sans, push buttons, one character moment per page).

## Macrostructure family
- Marketing pages: **Narrative Workflow** — the product is genuinely sequential
  (发现 → 判断 → 盯着 / Find → Judge → Watch). Stages are numbered 1.0 / 2.0 / 3.0,
  each owns an accent band, previews are real components fed by demo data.
  - Home: off-centre hero (headline left, AI box right) → three stage bands → start strip.
  - Pricing: one comparison table with prices + CTAs in the column heads (no 3-card row).
  - Trends today (`/new-keywords`): workbench list, no stage bands.
- App pages (`/trends`, `/ask`, `/monitors`, `/usage`, `/start`, `/r/*`): **Workbench**.
  Functional sidebar + canvas. No enrichment, no bands, no character moment.
  They adopt tokens, buttons, cards, radii and type only.
- Content pages (blog, legal, use cases): typography only (not yet migrated).

## Theme
- `--color-paper`    oklch(97% 0.012 95)   cream ground, never pure white
- `--color-paper-2`  oklch(94.5% 0.016 95) tinted band / sidebar
- `--color-paper-3`  oklch(91% 0.020 95)   hover on paper-2
- `--color-raised`   oklch(99% 0.006 95)   cards sitting on paper
- `--color-ink`      oklch(20% 0.012 250)  text; never pure black
- `--color-ink-2`    oklch(36% 0.012 250)  body copy
- `--color-ink-3`    oklch(48% 0.012 250)  muted
- `--color-ink-4`    oklch(60% 0.010 250)  faint / placeholder
- `--color-rule`     oklch(89% 0.016 95)   hairlines
- `--color-pear`     oklch(86% 0.18 95)    primary action (push buttons), character mark
- `--color-sky`      oklch(66% 0.18 235)   links, hover tints, illustrations
- `--color-sky-ink`  oklch(50% 0.15 240)   cyan used as text or as a filled control with paper text
- `--color-coral`    oklch(68% 0.24 18)    ONE high-energy moment per page (star-burst, the one big number)
- `--color-mint`     oklch(80% 0.16 150)   success, sparingly
- `--color-lavender` oklch(74% 0.16 305)   tag chips, sparingly
- `--color-focus`    oklch(60% 0.17 235)

Accent rules: pear = primary action, sky = link / hover / secondary fills,
coral = single pop. Accents never blend in gradients. Mint and lavender at most
once each per view. shadcn `--primary` maps to `--color-sky-ink` so existing
`text-primary` / `bg-primary` keep AA contrast; pear is reserved for `.btn`.

## Typography
- Display: Plus Jakarta Sans 600, roman, tracking -0.025em, `text-wrap: balance`
- Body:    Plus Jakarta Sans 400 (500 for inline emphasis)
- Mono:    JetBrains Mono 500 — uppercase labels, stage numerals, tabular figures
- CJK fallback: PingFang SC → Hiragino Sans GB → Noto Sans SC → Microsoft YaHei
- Display anchor: `--text-display: clamp(2.5rem, 4.2vw + 1rem, 4.5rem)`
- No serif anywhere. No italic headings — emphasis via the pear highlighter
  (`.hl`, background-image + box-decoration-break: clone) or weight.

## Radii
card 20px (`rounded-xl`) · large surface 24px (`rounded-2xl`) · input 12px
(`rounded-lg`) · pill 999px (buttons, chips). No square corners.

## Spacing
4-point named scale in `tokens.css` (`--space-3xs` … `--space-4xl`). Tailwind's
spacing utilities are already 4-point; use them, never arbitrary px.
Sections vary their padding — the hero is tight on top, stage bands airy,
the start strip compact.

## Motion
- Easings: `--ease-out` cubic-bezier(0.16,1,0.3,1) · `--ease-press` cubic-bezier(0.2,0.7,0.3,1)
  · `--ease-snap` cubic-bezier(0.22,1,0.36,1)
- Durations: micro 120ms · short 220ms · long 420ms
- One entrance on the homepage (hero only). No scroll-triggered fade on every section.
- Reduced motion: marquee stops, character stops pulsing, star-burst disabled,
  buttons keep colour feedback only.

## Microinteractions stance
- Silent success. No celebratory toasts. The star-burst fires once on the
  homepage AI-box submit only.
- Focus rings appear instantly (no transition on outline).
- Hover affordances always have a focus-visible twin.

## CTA voice
- Primary: `.btn` push — pear face, pear-deep 4px edge, pill. Lifts 2px on hover,
  presses down 3px on :active. One per screen. Short verbs: "Start free", "Ask AI".
- Secondary: `.btn--soft` — raised paper, hairline, soft shadow, no edge.
- Tertiary: `.btn--ghost` / text link in sky-ink.
- Labels never wrap (`white-space: nowrap`).

## Navigation & footer (marketing only)
- Nav **N12**: pear-tint announcement banner (dismissible, remembered) above one
  real bar; the banner retracts after 48px of scroll-down and returns on scroll-up.
- Footer **Ft8**: marquee tagline (32s, middot glyph, stops under reduced motion)
  over one wrapping row of essential links + copyright. No 4-column sitemap.

## Per-page allowances
- Marketing pages MAY use Tier-A CSS enrichment (the radar blip) — homepage only.
- App pages MUST NOT use enrichment — function carries the page.
- Content pages: typography only.

## What pages MUST share
- The wordmark (`BrandLogo` / `BrandMark`, unchanged).
- Paper / ink / accent tokens and their roles.
- Plus Jakarta Sans + JetBrains Mono.
- The `.btn` system and radii.
- Section heads: a single stacked column (mono stage numeral only where the
  content is genuinely ordinal — the homepage stages). No eyebrow on every section.

## What pages MAY differ on
- Macrostructure within the family.
- Band colour per section (pear / sky / coral tint), never accent-to-accent gradients.
