'use client';

import { selectPlayback, usePlayer as useSelector } from '@videojs/react';
import { usePlayer } from '@videojs/react/video';
import type { RefObject } from 'react';

import { describeDuration, type Film, formatDuration } from '@/lib/catalog';

/** Title, one line of description, the primary action, and a single metadata line. */
export function FilmPanel({ film, titleRef }: { film: Film; titleRef: RefObject<HTMLHeadingElement | null> }) {
  const store = usePlayer();
  const playback = useSelector(selectPlayback);
  const playing = playback ? !playback.paused && !playback.ended : false;

  return (
    <div className="panel">
      <h2 id="film-title" ref={titleRef} tabIndex={-1} className="panel-title">
        {film.title} <span className="muted">{film.subtitle}</span>
      </h2>
      <p className="panel-description">{film.description}</p>

      <div className="panel-actions">
        <button
          type="button"
          className="button button-primary"
          onClick={() => (playing ? store.pause() : store.play())}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
            {playing ? (
              <path d="M3.5 2.5h2v9h-2zM8.5 2.5h2v9h-2z" fill="currentColor" />
            ) : (
              <path d="M4 2.2v9.6a.5.5 0 0 0 .76.43l7.6-4.8a.5.5 0 0 0 0-.86l-7.6-4.8A.5.5 0 0 0 4 2.2Z" fill="currentColor" />
            )}
          </svg>
          {playing ? 'Pause' : playback?.ended ? 'Play again' : 'Play film'}
        </button>
        <p className="panel-meta mono">
          <span>{film.year}</span>
          <span aria-hidden="true">·</span>
          <span aria-label={describeDuration(film.duration)}>{formatDuration(film.duration)}</span>
          <span aria-hidden="true">·</span>
          <span>{film.category}</span>
        </p>
      </div>
    </div>
  );
}
