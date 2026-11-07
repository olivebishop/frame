'use client';

import { selectTime, usePlayer as useSelector } from '@videojs/react';
import { usePlayer } from '@videojs/react/video';

import { describeDuration, type Film, formatDuration } from '@/lib/catalog';

/** Chapter index. Each row seeks the real player to the chapter's start and plays; the current one is marked. */
export function ChapterList({ film }: { film: Film }) {
  const store = usePlayer();
  const time = useSelector(selectTime);
  if (!film.chapters.length) return null;

  const t = time?.currentTime ?? 0;
  const currentIndex = t > 0 ? film.chapters.findLastIndex((chapter) => t >= chapter.start) : -1;

  function jump(start: number) {
    // Start playback inside the click, while it still counts as a user gesture, then seek. Seeking first can outlast
    // the gesture on a long stream, and the browser then refuses to play.
    store.play().catch(() => {});
    store.seek(start).catch(() => {});
  }

  return (
    <section id="chapters" className="chapters" aria-labelledby="chapters-title">
      <h2 id="chapters-title" className="list-label">
        Chapters
      </h2>
      <ol>
        {film.chapters.map((chapter, i) => {
          const end = film.chapters[i + 1]?.start ?? film.duration;
          const current = i === currentIndex;
          return (
            <li key={chapter.start}>
              <button
                type="button"
                className="row"
                aria-current={current ? 'true' : undefined}
                aria-label={`Play chapter ${i + 1}, ${chapter.title}, from ${formatDuration(chapter.start)}, ${describeDuration(end - chapter.start)} long`}
                onClick={() => jump(chapter.start)}
              >
                <span className="row-index mono">{formatDuration(chapter.start)}</span>
                <span className="row-title">{chapter.title}</span>
                <span className="row-end mono">{current ? 'Now' : ''}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
