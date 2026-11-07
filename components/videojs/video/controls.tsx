import { Controls } from '@videojs/react';

import { SettingsMenu } from './shared/settings-menu';
import type { ThumbnailSlot } from './shared/time-slider';
import { VideoControlsContent } from './shared/video-controls';

/** One control bar along the bottom; no centre overlay. Tapping the picture still toggles playback (see gestures). */
export function VideoControls({ renderThumbnail }: ThumbnailSlot = {}) {
  return (
    <Controls.Root>
      <VideoControlsContent menu={<SettingsMenu />} renderThumbnail={renderThumbnail} />
    </Controls.Root>
  );
}
