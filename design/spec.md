# FRAME — Design spec

> **Revision 2 (user review, 2026-11-07)** — supersedes the sections below where they conflict:
> - The accent colour appears only on page buttons (header "Watch now", "Play film"). Inside the player the accent is
>   white: progress, playhead, checked items, focus ring.
> - No crop marks around the player and no centre overlay (play and ±10 removed). Play/pause lives in the bar; a
>   mouse click on the picture still toggles playback.
> - Below the player, modelled on the Linear *Conversations on Quality* episode page: title, one-line description,
>   a primary button and one metadata line, then plain row lists (Chapters; Films). Ledger, principles, keyboard
>   list, eyebrows, and the intro issue index were removed as unnecessary text.

> The Art of Watching. An editorial Video.js 10 skin and the publication that presents it.

Sources of direction: the brief (FRAME concept, blur-rise motion), the Linear
_Conversations on Quality_ episode page (editorial episode structure: breadcrumb,
title, description, date and duration, episode index), the supplied
"editorial desk" style reference (monochrome paper and ink, single-weight type,
hairlines instead of shadows, one highlighter accent), and Emil Kowalski's
design-engineering rules for motion. Nothing is copied: no logos, assets,
copy, or exact values from Linear or the style reference's brand.

Status legend: **brief** (asked for), **reference** (adapted from a reference),
**derived** (decided here, follows from the above).

## 1. Identity

| Decision | Value | Source |
| --- | --- | --- |
| Concept | A film printed in a journal: the picture sits in a mat, and **crop marks** frame it. | derived |
| Signature | Crop marks: four L-shaped corner ticks. Around the featured player on the page, on the centre play button, and in the wordmark. | derived |
| Voice | Quiet, typographic, left-aligned. Hierarchy from size and tracking, not weight. | reference |
| Avoid | SaaS cards, glass, gradients as decoration, pills, glows, shadows on the page. | brief |

## 2. Colour

Page (light editorial surface):

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#F3F1EC` | Canvas |
| `--paper-raised` | `#FAF9F6` | Thumbnails mat, hover wash |
| `--ink` | `#0D0C0A` | Text, crop marks, focus ring on paper |
| `--ink-muted` | `#5F5D58` | Secondary text (5.9:1 on paper) |
| `--hairline` | `rgb(13 12 10 / 0.14)` | Borders, rules |
| `--marker` | `#DCF23A` | The one accent: progress, active chapter, current item. Never used as text on paper. |

Player (stays dark in both colour schemes, per the Video.js UI rules):

| Token | Value | Role |
| --- | --- | --- |
| `--media-accent-color` | `--marker` | Fill, playhead, checked items, focus ring |
| `--media-accent-text-color` | `#0D0C0A` | Text on marker |
| `--frame-surface` | `rgb(18 17 15 / 0.92)` | Menus, tooltips, indicators, dialog |
| `--frame-surface-line` | `rgb(255 255 255 / 0.10)` | Hairline on surfaces |
| Scrim | Smoothstep gradient, 0.72 → 0 over the bottom 45% | Separates controls from bright frames |

Contrast targets: control icons and text ≥ 4.5:1 over the scrim on a white
frame; slider and focus ring ≥ 3:1. The focus ring is a 2px marker ring with
a 2px ink halo so it reads on both bright and dark footage.

## 3. Type

| Role | Family | Size / line-height / tracking |
| --- | --- | --- |
| Display | Geist 400 | clamp(3rem, 8.5vw, 7.5rem) / 0.94 / −0.045em |
| Heading | Geist 400 | 2rem / 1.1 / −0.025em |
| Body | Geist 400 | 1.0625rem / 1.55 / −0.005em, max 58ch |
| Label (eyebrow, metadata keys) | Geist Mono 400 | 0.6875rem / 1.4 / 0.08em, uppercase |
| Player UI | Geist 400 | 13px |
| Timecode | Geist Mono 400 | 12px, `tabular-nums` |

Geist and Geist Mono are OFL-licensed and loaded through `next/font`, so no
third-party request. Single weight (400) throughout. **reference**

## 4. Space, shape, layout

- 4px base. Rhythm 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Page max width 1240px, 24px gutters (16px under 640px).
- Radii: player 10px, buttons 6px, menus 10px, menu items 6px, thumbnails 6px. No pill shapes. **reference**
- Elevation on the page is hairlines only. In the player, surfaces are solid, near-opaque ink with a hairline, no backdrop blur. **derived**

## 5. Player layout (desktop, ≥ 42rem player width)

```
┌──────────────────────────────────────────────────────────┐
│ No. 01 · Big Buck Bunny — Trailer                        │  top: title (fades with controls)
│                                                          │
│                      ┌┐      ┐┌                          │
│               ⟲10    │   ▶    │   10⟳                    │  centre: crop-mark play, seek ±10 (fine pointer)
│                      └┘      └┘                          │
│                                                          │
│ ━━━━━━━━━━━━━━━━━━━━━━│━━━━━ ━━━━━━━━━ ━━━━━━━━━━━━━━━━  │  timeline: chapter segments, bar playhead
│ ▶  🔊  0:24 / 1:00   THREE RODENTS        CC  ⚙  ⧉  ⛶   │  bar
└──────────────────────────────────────────────────────────┘
```

Control order (source order = focus order): play · volume · time · current
chapter · captions · settings · picture-in-picture · AirPlay/Cast (when
available) · fullscreen. Screen controls move from Scaffold's top bar to the
bottom bar so every control sits in one predictable row. **derived**

Narrow (< 28rem): chapter label hides, time shows current only, centre seek
buttons hide (coarse pointer), menus fill the player height.

## 6. Components

| Part | Spec |
| --- | --- |
| Buttons | 36×36 (32×32 under 28rem), radius 6, 18px icon. Hover (fine pointer only): white 10%. Press: `scale(0.96)` 120ms. Expanded: white 12%. |
| Focus | `outline: 2px solid marker; outline-offset: 2px; box-shadow: 0 0 0 4px ink/70%`. Identical on buttons, slider thumbs, menu items, time toggle. |
| Timeline | 18px hit area. Track 3px (5px on hover/drag/focus via `scaleY`), white 22%. Buffer white 38%. Fill marker. Chapter gaps 3px. |
| Playhead | A 3×14px marker bar with an ink hairline (a cut mark, not a dot). Grows to 3×18 on hover/drag. |
| Preview | 168px storyboard frame, radius 6, hairline; under it a mono timecode and the chapter title in Geist. Clamped inside the player. |
| Centre play | 72px square, radius 12, ink 55%. Crop-mark corners in white; on hover they step out 3px. Hidden while buffering. |
| Menus | Surface `--frame-surface`, radius 10, padding 6, items 36px tall radius 6; label Geist 13, value Geist Mono 12 muted; checked item shows a marker check. Sub-menus slide; back row on top. |
| Tooltips | Surface chip, 12px Geist, 6px radius, shortcut in a hairline `kbd`. Same 10px offset everywhere. |
| Volume | Vertical slider popover, 3px track, marker fill, 12px round thumb (the one round element — it is grabbed, not read). |
| Indicators | Mono value in a surface chip, top centre (volume, captions, fullscreen); seek indicator at the side seeking towards. |
| Buffering | 28px marker arc spinner, centred, no backdrop dimming while controls are visible. |
| Error | Centred surface panel: mono eyebrow, Geist 18 title, 14 description, ghost "Close" button with hairline. |
| Captions | Native cues, Geist, ink 80% box, lifted above the bar while controls show. |

Icons: one FRAME set, 18×18 grid, 1.5px stroke, round caps and joins,
`currentColor`, no fills. Play and pause share an optical centre; volume
levels share the speaker outline; enter and exit pairs mirror each other.

## 7. Motion

| Use | Spec |
| --- | --- |
| Entrance (rare, once) | `opacity 0→1`, `filter blur(4px)→0`, `translateY(8px)→0`; 700ms `cubic-bezier(0.22, 1, 0.36, 1)`; 80ms stagger. Header, eyebrow, heading, copy, player frame, metadata. Fill mode `backwards` so no filter remains after it ends. **brief** |
| Player controls on first load | No animation. The player is usable from the first frame. **derived** (Video.js UI rule) |
| Menus, tooltips | 160ms ease-out, `scale(0.97)` + opacity from the trigger side; exit 120ms. **derived** |
| Controls hide | 240ms fade on fine pointers, 150ms on touch; show instantly. **derived** |
| Frequent actions (play, mute, seek, keyboard) | No animation beyond press feedback. **derived** (Emil: never animate keyboard actions) |
| Reduced motion | Entrance becomes a 200ms opacity fade, no blur or movement; skin motion tokens collapse (Video.js preferences sheet). **brief** |

## 8. Showcase structure

Header (wordmark, Watch / Chapters / Collection / About, issue label) →
Intro (eyebrow, "The Art of Watching.", supporting copy) → Featured player
with crop marks → Video information (title, description; duration, category,
year, delivery, credits) → Chapters (seek on click, current chapter marked)
→ More to explore (3 items, load into the featured player) → About (three
design principles) → Footer (Video.js acknowledgement, licences, links).

## 9. Media (placeholders until our own Mux assets)

| Slot | Asset | Why |
| --- | --- | --- |
| Featured | Big Buck Bunny trailer, Mux public example | 60s, real English subtitles, title cards give chapters. © Blender Foundation, CC BY 3.0 |
| Collection 1 | Big Buck Bunny, full film | Long-form timeline and storyboard |
| Collection 2 | "Rewind", the Video.js demo montage | Sunset glare and night fireworks: bright and dark contrast in one clip |

Rejected: a Mux example that resolves to commercial feature-film footage, and a Mux
promo reel with a burned-in watermark.

The featured playback ID is overridable with `NEXT_PUBLIC_FRAME_FEATURED_PLAYBACK_ID`.

## 10. Known platform limits

- Controls auto-hide delay is not configurable yet (videojs/v10#1728).
- Cue points are not implemented (videojs/v10#1442); chapters use a WebVTT `chapters` track.
