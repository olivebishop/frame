# FRAME — The Art of Watching

An editorial skin for [Video.js 10](https://videojs.org), and the small publication that presents it.

FRAME treats the player like a page in a well-made journal: the picture comes first and the controls stay quiet
until you need them. Inside the picture everything is white on ink; the page's one accent colour is kept for its
buttons.

## What's in it

- **A real Video.js 10 skin.** Built from the official Scaffold skin source (added with the Video.js shadcn
  registry) and restyled. Every control is a Video.js component, so keyboard shortcuts, menus, captions, gestures,
  the error dialog, and screen reader announcements are the library's, not reimplementations.
- **Custom FRAME icon set.** 18px grid, 1.5px stroke, outline only (`components/videojs/video/icons.tsx`).
- **Chapters.** A WebVTT `chapters` track generated from the catalog segments the timeline, labels the timeline
  preview, shows the current chapter in the control bar, and drives the chapter index on the page.
- **Mux streaming.** Adaptive HLS through `@videojs/mux-video`, with Mux posters and storyboard thumbnails.
- **Casting.** Chromecast through the official `@videojs/google-cast` extension (Chromium browsers), and AirPlay
  in Safari. The Cast button stays disabled until a device is reachable on the network.

## Links

- [Live site](https://frame-one-psi.vercel.app)

## Structure

```
app/
  layout.tsx, page.tsx, globals.css   Showcase page and its styles
  chapters/[slug]/route.ts            Static WebVTT chapter tracks
components/
  videojs/                            The FRAME skin (no imports from the showcase)
    styles/themes/frame.css           Theme tokens: colour, shape, motion, type
    video/skin.tsx, skin.css          Skin layout and component styles
    video/icons.tsx                   FRAME icon set
    video/shared/                     Controls, menus, tooltips, indicators
  showcase/                           Page sections and the player wiring
lib/catalog.ts                        Films, chapters, and Mux playback IDs
design/spec.md                        Design spec: tokens, layout, motion, decisions
```

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build
```

## Configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FRAME_FEATURED_PLAYBACK_ID` to use your own Mux asset for
the featured film. Playback IDs are public; never put Mux API tokens in `NEXT_PUBLIC_` variables.

## Restyling the skin

The skin keeps the public custom properties of the packaged Video.js skins:

```css
.frame-player {
  --media-accent-color: #ffffff;
  --media-accent-text-color: #0d0c0a;
  --media-border-radius: 10px;
  --media-font-family: "Geist", system-ui, sans-serif;
}
```

## Credits

- [Video.js 10](https://github.com/videojs/v10), Apache-2.0.
- Streaming and images by [Mux](https://www.mux.com).
- _Tears of Steel_ © Blender Foundation, [mango.blender.org](https://mango.blender.org),
  [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Hosted on FRAME's Mux account with the official subtitles.
- _Big Buck Bunny_ © Blender Foundation, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/),
  [peach.blender.org](https://peach.blender.org).
- "Rewind" is the Video.js demo asset, hosted on Mux.
- Geist and Geist Mono, SIL Open Font License 1.1.

## License

FRAME is licensed under the [Apache License 2.0](LICENSE). Third-party media and fonts keep their own licences,
listed under Credits.

FRAME is an independent entry and is not affiliated with Video.js, Mux, or the Blender Foundation.
