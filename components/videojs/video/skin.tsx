'use client';

import '../styles/video/frame.css';
import './skin.css';
import { Container as ContainerPrimitive, Poster as PosterPrimitive, Slider as SliderPrimitive } from '@videojs/react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/resolve-class-name';

import { VideoGestures } from './behaviors/gestures';
import { VideoHotkeys } from './behaviors/hotkeys';
import { VideoControls } from './controls';
import { ErrorDialog } from './shared/error-dialog';
import { Indicators } from './shared/indicators';
import { SeekIndicator } from './shared/seek-indicator';
import { StatusAnnouncer } from './shared/status-announcer';
import { TitleCard } from './shared/title-card';
import { Poster } from './shared/video-feedback';

export interface VideoSkinProps extends Omit<ContainerPrimitive.Props, 'children'> {
  children?: ReactNode;
  renderPoster?: PosterPrimitive.ImageProps['render'];
  renderThumbnail?: SliderPrimitive.Thumbnail.ImageProps['render'];
}

export function VideoSkin({ children, className, renderPoster, renderThumbnail, ...props }: VideoSkinProps = {}) {
  return (
    <ContainerPrimitive
      className={cn('media-skin', 'media-container', 'media-video', className)}
      data-theme="frame"
      data-preset="video"
      {...props}
    >
      {children}
      <Poster renderImage={renderPoster} />
      <TitleCard />
      <ErrorDialog />
      <VideoControls renderThumbnail={renderThumbnail} />

      <VideoHotkeys />
      <VideoGestures />
      <StatusAnnouncer />
      <Indicators>
        <SeekIndicator />
      </Indicators>
    </ContainerPrimitive>
  );
}
