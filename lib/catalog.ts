/**
 * The FRAME collection. One source of truth for the showcase copy, the player source, and the WebVTT chapter track
 * served from `/chapters/[slug].vtt`.
 *
 * Placeholder media: until FRAME's own Mux assets are uploaded, these entries use public Mux example playback IDs.
 * Override the featured film with `NEXT_PUBLIC_FRAME_FEATURED_PLAYBACK_ID`.
 */

export interface Chapter {
  /** Start time in seconds. */
  start: number;
  title: string;
}

export interface Film {
  slug: string;
  /** Issue-style number shown as "No. 01". */
  number: number;
  title: string;
  subtitle: string;
  category: string;
  year: number;
  description: string;
  playbackId: string;
  /** Length in seconds, shown before the media loads. */
  duration: number;
  /** Second used for the poster and collection still. */
  posterTime: number;
  credit: string;
  license: string;
  licenseUrl?: string;
  /** Contrast note for the collection card: why this clip is in the set. */
  note: string;
  chapters: Chapter[];
}

const featuredOverride = process.env.NEXT_PUBLIC_FRAME_FEATURED_PLAYBACK_ID;

export const films: Film[] = [
  {
    slug: 'big-buck-bunny-trailer',
    number: 1,
    title: 'Big Buck Bunny',
    subtitle: 'Trailer',
    category: 'Animation',
    year: 2008,
    description:
      'One big rabbit, three rodents, and one giant payback. The trailer for the Peach open movie project, an early landmark of open-source filmmaking made entirely in Blender.',
    playbackId: featuredOverride || 'VcmKA6aqzIzlg3MayLJDnbF55kX00mds028Z65QxvBYaA',
    duration: 60,
    posterTime: 27.5,
    credit: 'Blender Foundation',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    note: 'English subtitles, chapters',
    chapters: [
      { start: 0, title: 'The Peach project presents' },
      { start: 6, title: 'One big rabbit' },
      { start: 10.9, title: 'Three rodents' },
      { start: 16.4, title: 'One giant payback' },
      { start: 26.7, title: 'Title and credits' },
    ],
  },
  {
    slug: 'big-buck-bunny',
    number: 2,
    title: 'Big Buck Bunny',
    subtitle: 'The complete film',
    category: 'Animation',
    year: 2008,
    description:
      'The full short: a peaceful morning in the meadow, a trio of bullies, and a rabbit who decides he has had enough. Ten minutes, no dialogue.',
    playbackId: 'uNbxnGLKJ00yfbijDO8COxTOyVKT01xpxW',
    duration: 596,
    posterTime: 60,
    credit: 'Blender Foundation',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    note: 'Long-form timeline',
    chapters: [],
  },
  {
    slug: 'rewind',
    number: 3,
    title: 'Rewind',
    subtitle: 'A summer montage',
    category: 'Montage',
    year: 2024,
    description:
      'A tape deck clicks shut, and a summer plays back: a skater into low sun, a roller rink, a bike in the street, fireworks over a crowd. Sunset glare and night skies make it our test for control contrast at both extremes.',
    playbackId: 'BV3YZtogl89mg9VcNBhhnHm02Y34zI1nlMuMQfAbl3dM',
    duration: 36,
    posterTime: 3,
    credit: 'Video.js demo library, hosted on Mux',
    license: 'Demo asset',
    note: 'Bright and dark frames',
    chapters: [],
  },
];

export const featuredFilm = films[0];

export function getFilm(slug: string): Film | undefined {
  return films.find((film) => film.slug === slug);
}

export function muxImage(film: Film, { width = 1280, time = film.posterTime } = {}): string {
  return `https://image.mux.com/${film.playbackId}/thumbnail.webp?width=${width}&time=${time}`;
}

/** 75 → "1:15", 596 → "9:56", 3725 → "1:02:05". */
export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}

/** Spoken form for screen readers: 75 → "1 minute 15 seconds". */
export function describeDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const parts = [];
  if (m) parts.push(`${m} minute${m === 1 ? '' : 's'}`);
  if (sec || !m) parts.push(`${sec} second${sec === 1 ? '' : 's'}`);
  return parts.join(' ');
}

function vttTime(seconds: number): string {
  const ms = Math.round(seconds * 1000);
  const h = String(Math.floor(ms / 3_600_000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3_600_000) / 60_000)).padStart(2, '0');
  const s = String(Math.floor((ms % 60_000) / 1000)).padStart(2, '0');
  return `${h}:${m}:${s}.${String(ms % 1000).padStart(3, '0')}`;
}

export function chaptersVtt(film: Film): string {
  const cues = film.chapters.map((chapter, i) => {
    const end = film.chapters[i + 1]?.start ?? film.duration;
    return `${i + 1}\n${vttTime(chapter.start)} --> ${vttTime(end)}\n${chapter.title}`;
  });
  return `WEBVTT\n\n${cues.join('\n\n')}\n`;
}
