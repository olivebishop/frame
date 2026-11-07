'use client';

import { GoogleCast } from '@videojs/react/extensions/google-cast';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { VideoPlayer } from '@videojs/react/video';
import { useRef, useState, useSyncExternalStore } from 'react';

import { VideoSkin } from '@/components/videojs/video/skin';
import { type Film, films, muxImage } from '@/lib/catalog';

import { ChapterList } from './chapter-list';
import { FilmStrip } from './film-strip';
import { FilmPanel } from './film-panel';
import { rise, RISE } from './rise';

/** A store that never changes: `useSyncExternalStore` then reads false while hydrating and true afterwards. */
const noop = () => () => {};

/**
 * The featured player and everything that drives it. One Video.js `Player` provides state to the skin, the play
 * button, the chapters, and the film list, so the page acts on the real player store rather than a parallel copy.
 */
export function FrameExperience() {
  const [film, setFilm] = useState<Film>(films[0]);
  const [autoPlay, setAutoPlay] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Hand the stream to the media only after hydration, once the player has attached. A startup failure then reaches
  // the player's error state and shows the error dialog, instead of being lost before the player was listening. The
  // poster is set on the player, so the picture still appears immediately.
  const attached = useSyncExternalStore(noop, () => true, () => false);
  const watchRef = useRef<HTMLElement>(null);

  function selectFilm(next: Film) {
    setFilm(next);
    setAutoPlay(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    watchRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    // Move focus to the new title so keyboard and screen reader users land on what they chose.
    requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
  }

  return (
    <VideoPlayer title={`${film.title} — ${film.subtitle}`} poster={muxImage(film, { width: 1920 })}>
      <section id="watch" ref={watchRef} className="watch shell" aria-labelledby="film-title">
        <div className="mount rise" style={rise(RISE.player)}>
          <VideoSkin
            className="frame-player"
            style={{ '--film-aspect': film.aspect ?? '16 / 9' } as React.CSSProperties}
          >
            <MuxVideo
              key={film.slug}
              source={attached ? { playbackId: film.playbackId, poster: { time: film.posterTime } } : undefined}
              crossOrigin="anonymous"
              playsInline
              autoPlay={autoPlay}
            >
              {film.chapters.length > 0 && (
                <track kind="chapters" src={`/chapters/${film.slug}`} srcLang="en" label="Chapters" default />
              )}
            </MuxVideo>
          </VideoSkin>
        </div>

        {/* Chromecast: send the HLS manifest itself, since the browser plays it through hls.js from a blob URL. */}
        <GoogleCast src={`https://stream.mux.com/${film.playbackId}.m3u8`} contentType="application/x-mpegURL" />

        <div className="below">
          <div className="below-main rise" style={rise(RISE.details)}>
            <FilmPanel film={film} titleRef={titleRef} />
          </div>
          <div className="below-side rise" style={rise(RISE.chapters)}>
            <ChapterList film={film} />
          </div>
        </div>

        <div className="rise" style={rise(RISE.films)}>
          <FilmStrip films={films} current={film} onSelect={selectFilm} />
        </div>
      </section>
    </VideoPlayer>
  );
}
