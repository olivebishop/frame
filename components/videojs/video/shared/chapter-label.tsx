import { selectTextTrack, selectTime, usePlayer } from '@videojs/react';

/**
 * The chapter the playhead is in, read from the media's default `kind="chapters"` track.
 * Renders nothing when the media has no chapters.
 */
export function ChapterLabel() {
  const tracks = usePlayer(selectTextTrack);
  const time = usePlayer(selectTime);
  const cues = tracks?.chaptersCues ?? [];
  if (!cues.length || !time) return null;

  const t = time.currentTime;
  const index = cues.findIndex((cue) => t >= cue.startTime && t < cue.endTime);
  const cue = cues[index === -1 ? 0 : index];

  return (
    <span className={'frame-chapter-label'}>
      <span className={'frame-chapter-label-index'}>{String((index === -1 ? 0 : index) + 1).padStart(2, '0')}</span>
      <span className={'frame-chapter-label-text'}>{cue?.text}</span>
    </span>
  );
}
