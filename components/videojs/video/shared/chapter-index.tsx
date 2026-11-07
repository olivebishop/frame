import { selectTextTrack, selectTime, usePlayer } from '@videojs/react';

/**
 * Chapter numbers printed above the timeline, like page numbers in a contents list. They appear while the timeline is
 * pointed at, dragged, or focused; the chapter under the playhead is marked. Decorative: the slider's preview and the
 * bar's chapter label carry the same information for assistive technology.
 */
export function ChapterIndex() {
  const tracks = usePlayer(selectTextTrack);
  const time = usePlayer(selectTime);
  const cues = tracks?.chaptersCues ?? [];
  const duration = time?.duration ?? 0;
  if (cues.length < 2 || !duration) return null;

  const t = time?.currentTime ?? 0;

  return (
    <div className={'frame-chapter-index'} aria-hidden="true">
      {cues.map((cue, i) => (
        <span
          key={`${cue.startTime}-${i}`}
          className={'frame-chapter-index-mark'}
          data-active={(t >= cue.startTime && t < cue.endTime) || undefined}
          style={{ insetInlineStart: `${(cue.startTime / duration) * 100}%` }}
        >
          {String(i + 1).padStart(2, '0')}
        </span>
      ))}
    </div>
  );
}
