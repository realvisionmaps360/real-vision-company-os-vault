# Handoff: Sunbite — Opening Invitation (mobile interactive)

## Overview
A premium, mobile-first **interactive invitation** for the opening of **Sunbite**, a Swiss food bike in Aarau (fresh strawberries dipped in chocolate, served in cups by the Aare river). It is **not** a flat flyer — it's a four-card "unwrap a gift" experience. The guest taps through collectible cards that reveal the event little by little: a wrapped gift → the announcement → the experience → the location with a 360° view and map.

Target feel: retro European summer, vintage gelateria, Swiss minimalism, premium packaging. Tactile, warm, joyful.

## About the Design Files
The file in this bundle (`Sunbite Invitation.dc.html`) is a **design reference created in HTML** — a working prototype showing the intended look, motion, and flow. It is **not production code to ship as-is** (it relies on a proprietary preview runtime: `<x-dc>`, `<x-import>`, `<sc-if>`, `support.js`). 

Your task is to **recreate this experience in the project's real environment**. It maps cleanly to **React + Framer Motion** (or plain React + CSS transitions), **Vue**, or **SwiftUI**. If no framework exists yet, React + Framer Motion (or GSAP) on a Vite PWA is the recommended choice — it's mobile-first and the brief calls for PWA-friendly, 60fps motion. Use the codebase's existing patterns; treat the HTML purely as the visual + behavioral spec.

## Fidelity
**High-fidelity (hifi).** Final colors, type, spacing, copy, and interactions. Recreate pixel-faithfully. All exact values are in **Design Tokens** below.

---

## Global Layout & Frame
- **Portrait phone canvas.** On mobile: full viewport (`100vw × 100dvh`). On desktop (≥480px): a centered device frame `418 × 858px`, `border-radius: 46px`, with a dark bezel ring (`box-shadow: 0 0 0 11px #160c08, 0 0 0 13px #3a2218`) and a deep drop shadow, floating on a near-black warm backdrop (`#1c0f0a`).
- **Deck mechanic.** Four full-height panels stacked vertically inside one track. Advancing animates the track `transform: translateY(-step * 100%)` with `transition: 1.05s cubic-bezier(.62,.04,.16,1)` (a spring-like slide — the current card slides up and the next rises from underneath).
- **Per-card scroll.** Each panel has an inner scroll container (`position:absolute; inset:0; overflow-y:auto`); cards taller than the frame scroll internally. (Card 1 is non-scrolling.)
- **Persistent overlays (above the deck):**
  - **Progress dots** — top center, 4 pills inside a translucent blurred capsule (`rgba(28,15,10,.22)`, `backdrop-filter: blur(8px)`, `padding:8px 13px`, `border-radius:30px`). Active dot is `22px` wide, inactive `7px`, height `7px`, `border-radius:5px`, `transition: all .4s`. Dots are **clickable** to jump to any card. Dot color adapts to the card background: cream `#f4e6c4` on red cards, red `#9e1a1a` on cream cards (idle dots are the same hue at low alpha).
  - **Grain** — full-bleed SVG `feTurbulence` noise (`baseFrequency 0.85`), `mix-blend-mode: soft-light`, `opacity 0.07`, `pointer-events:none`.

## Ambient Motion (all cards)
- **Floating strawberries** — small CSS strawberries (see Assets → "CSS strawberry"). Drift via `@keyframes floatY` (translateY 0 → −15px and a slight rotate, `7–8.5s ease-in-out infinite`, varied delays, opacity ~0.5–0.92).
- **Sparkles** — 4-point star glints, `@keyframes sparkleA` (scale .3→1, opacity 0→.95, `3–4.2s`).
- **Sun glow** — soft radial-gradient circle, `@keyframes sunPulse` (opacity .55→.85, scale 1→1.05, `6–7s`).
- **Sunburst rays** (Card 1 back) — `repeating-conic-gradient` disc rotating `spinSlow 90s linear infinite`, opacity .16.
- **Chocolate drip trim** (Cards 1 back & 2) — a chocolate band (`linear-gradient(#3a1c12,#4a2418)`) with a scalloped bottom edge via CSS mask: `radial-gradient(12px at 12px 100%, #0000 96%, #000) 0 0/24px 100% repeat-x`. A couple of teardrop drips bob (`dripBob 4–5s`).
- **Parallax tilt** — the active card's content wrapper rotates toward the pointer/finger: on pointer move, `rotateX(-ny * S) rotateY(nx * S)` where `nx,ny ∈ [-1,1]` are normalized cursor offset from card center and `S` = tilt strength (default **3.2°**, configurable 0–8). Smoothed with `transition: transform .5s cubic-bezier(.2,.7,.2,1)`. Resets on leave and on card change.
- **Entrance reveals** — when a card becomes active, its content items fade + rise in: each `.rv` item starts `opacity:0; translateY(20px)`, animates to rest over `.8s cubic-bezier(.2,.75,.2,1)`, staggered by class `d1…d7` (delays `.10s` → `.70s`).
- Respect `prefers-reduced-motion` in production (the prototype does not).

---

## Screens / Views

### Card 1 — The Gift  (`step 0`)
**Purpose:** The wrapped gift. A 3D flip card; the only card with whole-card tap.

**Two faces** (3D flip): a `perspective: 1600px` container with an inner that rotates `rotateY`. Inner at rest = `rotateY(0.001deg) translateZ(0)` (NOT `0deg` — keep it a 3D matrix so `backface-visibility:hidden` culls the back face); flipped = `rotateY(180deg)`. Transition `1.05s cubic-bezier(.6,.02,.2,1)`. Both faces `position:absolute; inset:0; backface-visibility:hidden`; front face pre-rotated `rotateY(180deg)`.

- **BACK (shown first) — vintage red packaging:**
  - Background: `radial-gradient(130% 100% at 50% 8%, #b22420 0%, #9e1a1a 46%, #7c1414 100%)`.
  - Rotating sunburst disc + pulsing sun glow behind center.
  - Chocolate drip band across the top; 2 bobbing drips.
  - Double vintage frame: inset `20px` border `2px solid rgba(244,230,196,.5)` radius `30px`, plus inset `27px` border `1px solid rgba(244,230,196,.28)` radius `24px`.
  - 2 sparkles, 2 floating strawberries.
  - Center stack (gap 18px): eyebrow `A LITTLE GIFT FOR YOU` (Fredoka 500, 11px, letter-spacing .42em, `rgba(244,230,196,.78)`); the **Sunbite.ch wordmark** image (`assets/sunbite-wordmark.png`, width 248px / max 74%, drop-shadow); a hairline-flanked label `EST. 2026 · AARAU`.
  - Bottom **tap hint**: a 50px circle with a pulsing ring (`ringPulse 2.2s`: scale .8→1.7, opacity .7→0) around a finger glyph `☝︎`, plus `TAP TO OPEN` (Fredoka 500, 11px, letter-spacing .28em).
- **FRONT (after flip) — welcome message** (cream):
  - Background `radial-gradient(120% 90% at 50% 0%, #fbf3de, #f1e1ba)`; corner sun glow; 1 faint strawberry; 1 sparkle.
  - `Welcome ☀️` — Fredoka 600, 34px, `#9e1a1a`.
  - Body (Spectral 18.5px, line-height 1.62, `#6a3326`, max 300px): *"I've been keeping a little secret… After months of work… I'm finally ready to share it with you."* (three lines via `<br>`).
  - Divider: 42×2px `#c9683e` rounded.
  - Italic line (Spectral italic 16.5px, `#8a4733`, max 280px): *"I would love for you to be part of the very beginning of this adventure."*
  - Bottom hint `TAP TO CONTINUE ⌄` bobbing (`hintPulse 2s`).

**Interaction:** Tap anywhere on the card. 1st tap → flip to front. 2nd tap (while flipped) → advance to Card 2 (deck slides up).

### Card 2 — The Reveal  (`step 1`)
**Purpose:** The announcement + key facts. Background: `radial-gradient(130% 100% at 50% 0%, #b42420, #9e1a1a 50%, #7c1414)` (red). Centered column, top padding `74px` (clears dots). Chocolate drip band at top; sun glow; 2 strawberries; 2 sparkles.
- Eyebrow `THE SECRET IS OUT` (Fredoka 500, 11px, .4em, `rgba(244,230,196,.72)`).
- **H1** `SUNBITE / IS OPENING` — Fredoka **700, 50px**, line-height .96, color `#f4e6c4`, `text-shadow: 0 4px 0 #6e1414, 0 6px 16px rgba(0,0,0,.35)` (two lines).
- Body (Spectral 16px, 1.62, `rgba(247,234,208,.92)`, max 320px): *"After months of building this dream, I'm incredibly happy to finally invite you to celebrate with me. Join us for an unforgettable summer evening by the Aare River."*
- Accent italic (Spectral italic 15.5px, `rgba(242,200,75,.95)`): *"This is only the beginning — and I'd love for you to be part of it."*
- **Info group** — rounded card (max 312px, `border-radius:18px`, hairline gaps `rgba(244,230,196,.22)`), 3 rows (`background: rgba(126,20,20,.55)`, padding `16px 20px`, gap 15px). Each row: emoji 21px + title (Fredoka 600, 18px, `#f4e6c4`) + sublabel (Fredoka 400, 11px, .18em, `rgba(244,230,196,.6)`):
  - 📅 **18 July 2026** · SAVE THE DATE
  - 🕗 **20:00 – Midnight** · GOLDEN HOUR ONWARDS
  - 📍 **Aarau – Aare River** · RIVERSIDE · SWITZERLAND
- **Continue** button → Card 3.

### Card 3 — The Experience  (`step 2`)
**Purpose:** Lifestyle/menu card. Background cream `radial-gradient(120% 90% at 50% 0%, #fbf3de, #f0e0b8)`. Top padding 70px; corner sun glow; 1 faint strawberry.
- Eyebrow `AN EVENING OF` (Fredoka 500, 11px, .4em, `#b5563a`).
- **H2** `Sun, Strawberries / & Slow Moments` — Fredoka 700, 33px, `#9e1a1a`.
- **Feature list** (max 320px, gap 13px) — each row: emoji (18px, 30px-wide column) + label (Fredoka 500, 16.5px, `#5a2a1e`) + dotted leader line (`border-bottom: 1.5px dotted rgba(158,26,26,.4)`, flex-grow). Items:
  - 🍓 Strawberry Chocolate Cups
  - 🎵 Music by the water
  - 🌅 Sunset over the Aare
  - ☀️ Summer atmosphere
  - 🤍 Good friends
  - **(NOTE: "🥤 Fresh Lemonade" was REMOVED — no longer offered. Do not include it.)**
- **Opening-special ticket** — red card (`#9e1a1a`, radius 18px, padding `22px 24px`, shadow), with two cream notches punched on the left/right edges (18px circles, `#f3e1b6`, vertically centered). Left: `OPENING SPECIAL` (Fredoka 500, 9.5px, .26em) over `Chocolate Cups` (Fredoka 600, 21px, `#f4e6c4`). Right (divided by dashed border): big `5` (Fredoka 700, 30px, `#f2c84b`) over `CHF` (Fredoka 600, 11px, `#f4e6c4`).
- **`assets/made-for-sunny.png`** — the "Made for Sunny Days" script mark, width 230px / max 72%.
- **Continue** button → Card 4.

### Card 4 — See You There  (`step 3`)
**Purpose:** Location, 360°, map, thank-you, QR placeholder. Background cream (same as Card 3). Top padding 66px.
- Eyebrow `THE PLACE` (Fredoka 500, 11px, .4em, `#b5563a`).
- **Hero photo** — full-width, `border-radius:24px`, height 220px, drop shadow, with a bottom gradient scrim (`linear-gradient(to top, rgba(126,20,20,.42), transparent 46%)`) and an overlaid caption `📍 Aarau · Aare Riverside` (Fredoka 500, 13px, `#fbf3de`, bottom-left). **This is a user-supplied image placeholder** — in production, an `<img>` with the real riverside photo (see Assets).
- **H2** `See you there` (Fredoka 700, 34px, `#9e1a1a`) + italic subline (Spectral italic 15.5px, `#8a4733`): *"Come find us where the river bends and the sun stays late."*
- **Buttons** (stacked, max 320px, gap 12px, radius 40px, padding 16px):
  - **Explore in 360°** — `🌅` + label. Filled red (`bg #9e1a1a`, text `#f4e6c4`). Opens the **360° panorama overlay** (see Interactions).
  - **Open in Google Maps** — `📍` + label. Outline (`bg #fbf3de`, text `#9e1a1a`, `border:2px solid #9e1a1a`). Anchor to `https://www.google.com/maps/search/?api=1&query=Aarau+Aare+Flussbad`, `target=_blank`. **Replace with the exact pin when the address is final.**
- **QR placeholder (reserved)** — 118×118px, `border:2px dashed rgba(158,26,26,.45)`, `bg rgba(158,26,26,.05)`, radius 16px, glyph `▣` + monospace `QR · COMING SOON`, with caption *"Scan to RSVP — added shortly"*. To be filled with a real QR later.
- Divider 46×2px `#c9683e`.
- Thank-you (Spectral 16px, `#6a3326`, max 290px): *"Thank you for being part of the beginning of Sunbite."* + bold/red *"See you on July 18."* + `❤️`.
- Footer: **Sunbite wordmark** (the cream PNG re-tinted dark via filter; in production just use a red/dark wordmark asset), width 150px.

---

## Interactions & Behavior
- **Navigation:** Card 1 advances by tap (flip, then slide-away). Cards 2 & 3 advance via the **Continue** button. Progress dots jump to any card. (Optional nicety: add a back affordance.)
- **Card transition:** track `translateY(-step*100%)`, `1.05s cubic-bezier(.62,.04,.16,1)`.
- **3D flip (Card 1):** `1.05s cubic-bezier(.6,.02,.2,1)`; keep a 3D matrix at rest (`rotateY(0.001deg) translateZ(0)`) so backface culling works — a plain `0deg` collapses to a 2D matrix and the back face shows through mirrored.
- **Parallax tilt:** pointer/touch move over a card tilts its content (`±S°`, default 3.2). Smooth `.5s`. Reset on leave / card change.
- **Buttons:** `transform: scale(.96)` on `:active`; transition `.25s cubic-bezier(.2,.8,.3,1.4)`.
- **360° panorama overlay:** full-screen layer (`z-index:30`), fades in (`fadeUp .4s`). Contains a wide pannable scene (3× width). **Drag** (mouse or touch) to look around horizontally (`translateX`, clamped to `[-150%, 0]`, drag delta × 0.08). **Auto-rotate** when idle: target drifts at ~0.10%/frame and ping-pongs at the clamp ends; rendered each frame with easing `x += (target - x) * 0.10` via `requestAnimationFrame`. Chrome: top `🧭 DRAG TO LOOK AROUND` chip + a circular `✕` close button (top-right); bottom `📍 Sunbite · Aarau Riverside` chip. The scene is a CSS placeholder — **replace with a real equirectangular panorama** (e.g. Pannellum / `<model-viewer>` / three.js for a true 360 sphere; the prototype only pans horizontally).
- **Reduced motion:** disable parallax, ambient drift, and auto-rotate when `prefers-reduced-motion: reduce`.

## State Management
- `step: 0–3` — active card.
- `flipped: boolean` — Card 1 face.
- `pano: boolean` — 360° overlay open.
- Pan internals (refs, not React state, to avoid re-render): `panoX`, `panoTarget`, `panoDir`, `dragging`, `lastX`.
- Tap logic for Card 1: `if (!flipped) flipped = true; else step = 1`.
- **Tweakable settings** (were component props; expose as config/feature-flags if useful): `tiltStrength` (range 0–8, default 3.2), `grain` (boolean, default true), `autoRotate` (boolean, default true, for the 360° view).

## Design Tokens

**Colors**
| Token | Hex |
|---|---|
| Strawberry red (primary) | `#9e1a1a` |
| Red bright (gradient top) | `#b22420` / `#b42420` |
| Red deep (gradient base) | `#7c1414` |
| Red shadow (text shadow) | `#6e1414` |
| Cream (logo / on-red text) | `#f4e6c4` |
| Cream light (card bg top) | `#fbf3de` |
| Cream mid (card bg base) | `#f0e0b8` / `#f1e1ba` |
| Stage default bg | `#F4E6C4` |
| Ink / body on cream | `#5a2a1e` |
| Body brown (paragraphs) | `#6a3326` |
| Warm brown (italic) | `#8a4733` |
| Terracotta accent | `#c9683e` |
| Coral / eyebrow on cream | `#b5563a` |
| Chocolate (drips) | `#4a2418` → `#3a1c12` |
| Lemon / gold highlight | `#f2c84b` |
| Leaf green (strawberry) | `#7fa04a` |
| River blue (pano) | `#6e9bb0` / `#5d8aa0` |
| Page backdrop (behind frame) | `#1c0f0a` |
| Bezel ring | `#160c08`, `#3a2218` |

**Typography** — Google Fonts: **Fredoka** (400/500/600/700) for display/headings/UI labels; **Spectral** (400/500/600 + italics) for body. 
- H1 (Reveal): Fredoka 700, 50px / .96. 
- H2 (Experience/See you): Fredoka 700, 33–34px. 
- Welcome: Fredoka 600, 34px. 
- Row titles / buttons: Fredoka 600, 16–18px. 
- Eyebrows: Fredoka 500, 9.5–11px, letter-spacing .26–.42em, UPPERCASE. 
- Body: Spectral 16–18.5px / 1.6. 
- Italic accents: Spectral italic 15.5–16.5px. 
- Monospace (placeholders): system `ui-monospace, Menlo`.

**Radii:** buttons 40px; cards/tickets 18px; info group 18px; hero 24px; QR 16px; device frame 46px; vintage frame 30/24px.

**Shadows:** buttons `0 12px 26px -10px rgba(126,20,20,.6)` (red) / `0 10px 24px -8px rgba(0,0,0,.5)` (cream); hero `0 22px 40px -18px rgba(90,30,20,.55)`; ticket `0 16px 30px -14px rgba(126,20,20,.6)`; device frame `0 50px 100px -24px rgba(0,0,0,.7)`.

**Easing:** deck slide `cubic-bezier(.62,.04,.16,1)`; flip `cubic-bezier(.6,.02,.2,1)`; reveals/tilt `cubic-bezier(.2,.75,.2,1)`; button press `cubic-bezier(.2,.8,.3,1.4)`.

## Assets
In `assets/` (PNG, transparent — keyed out of the supplied brand JPEGs, drop shadows removed for clean placement on any background):
- `sunbite-wordmark.png` — cream cursive "Sunbite.ch" logo. **Do not redesign the logo.** Provide a dark/red variant for use on cream (Card 4 footer currently fakes it with a CSS filter — prefer a real asset).
- `cups-text.png` — chunky "STRAWBERRY CHOCOLATE CUPS" lettering (cream). Not currently placed; available if needed.
- `cups-badge.png` — full red badge (strawberry + chocolate icon, "Strawberry Chocolate Cups", "Fresh Lemonade", "Made for Sunny Days"). *Note the badge art still contains "Fresh Lemonade"; the live experience text dropped it. Use a re-rendered badge without lemonade if brand-accurate art is required.*
- `made-for-sunny.png` — "Made for Sunny Days" script (red).

**To be supplied by the client:**
- **Riverside location photo** (Card 4 hero, ~16:9, fills 220px-tall rounded frame).
- **Equirectangular 360° panorama** of the location (for a real 360° viewer).
- **QR code** image (RSVP), drops into the reserved 118px slot.

**CSS strawberry** (ambient decoration, no asset): a `radius 46% 46% 48% 48% / 36% 36% 66% 66%` body with `radial-gradient(34% 30%, #db4129, #a81d1a 74%)` fill, ~6 cream seed dots layered as tiny radial-gradients, inner shadows for volume, and a green leaf via `clip-path: polygon(...)`. Reusable at any scale/opacity.

## Files
- `Sunbite Invitation.dc.html` — the full prototype (reference for exact markup, inline styles, keyframes, and the interaction logic class). Open it to read precise values; everything above is derived from it.
- `assets/` — brand art described above.
