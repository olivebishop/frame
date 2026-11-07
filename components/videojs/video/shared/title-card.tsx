import { selectMetadata, selectPlayback, selectTextTrack, selectTime, usePlayer } from '@videojs/react';

function formatTime(seconds: number) {
  const s = Math.max(0, Math.round(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}

/**
 * The cover before playback: the film's title set large, with its running time and chapter count, like the opening
 * page of a feature in a journal. It reads only player state (title, duration, chapters), and fades away for good once
 * playback starts. Decorative: the title and time are already exposed by the controls, so it is hidden from assistive
 * technology to avoid announcing them twice.
 */
export function TitleCard() {
  const metadata = usePlayer(selectMetadata);
  const playback = usePlayer(selectPlayback);
  const time = usePlayer(selectTime);
  const tracks = usePlayer(selectTextTrack);

  const title = metadata?.title ?? '';
  if (!title) return null;

  // "Big Buck Bunny — Trailer" sets as a title with a quieter subtitle.
  const [main, ...rest] = title.split(' — ');
  const subtitle = rest.join(' — ');
  const duration = time?.duration ?? 0;
  const chapters = tracks?.chaptersCues.length ?? 0;
  const visible = !playback?.started;

  return (
    <div className={'frame-title-card'} data-visible={visible || undefined} aria-hidden="true">
      <p className={'frame-title-card-title'}>
        {main}
        {subtitle && <span className={'frame-title-card-subtitle'}>{subtitle}</span>}
      </p>
      {(duration > 0 || chapters > 0) && (
        <p className={'frame-title-card-meta'}>
          {duration > 0 && <span>{formatTime(duration)}</span>}
          {chapters > 0 && <span>{chapters} chapters</span>}
        </p>
      )}
    </div>
  );
}
