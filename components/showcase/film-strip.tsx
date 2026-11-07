'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { describeDuration, type Film, formatDuration, muxImage } from '@/lib/catalog';

/**
 * The issue's films as a row of equal stills on the page grid. The film on screen is marked "Now". Arrows page the row
 * when it overflows; it also scrolls by touch, trackpad, and Tab.
 */
export function FilmStrip({
  films,
  current,
  onSelect,
}: {
  films: Film[];
  current: Film;
  onSelect: (film: Film) => void;
}) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [measure]);

  function page(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  }

  const overflows = !(edges.start && edges.end);

  return (
    <section id="films" className="strip" aria-labelledby="films-title">
      <div className="strip-head">
        <h2 id="films-title" className="list-label">
          More films
        </h2>
        {overflows && (
          <div className="strip-arrows">
            <button type="button" className="arrow" aria-label="Previous films" disabled={edges.start} onClick={() => page(-1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M10 3.5 5.5 8l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="arrow" aria-label="Next films" disabled={edges.end} onClick={() => page(1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <ol ref={trackRef} className="strip-track">
        {films.map((film) => {
          const playing = film.slug === current.slug;
          return (
            <li key={film.slug} className="strip-item" data-current={playing || undefined}>
              <button
                type="button"
                className="strip-card"
                aria-current={playing ? 'true' : undefined}
                aria-label={`${film.title}, ${film.subtitle}, ${describeDuration(film.duration)}${playing ? ', now showing' : ''}`}
                onClick={() => onSelect(film)}
              >
                <span className="strip-still">
                  <Image src={muxImage(film, { width: 640 })} alt="" fill sizes="240px" />
                  <span className="strip-duration mono">{formatDuration(film.duration)}</span>
                  {playing && <span className="strip-badge mono">Now playing</span>}
                </span>
                <span className="strip-label mono">
                  {film.category}
                </span>
                <span className="strip-title">{film.title}</span>
                <span className="strip-sub">{film.subtitle}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
