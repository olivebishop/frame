/**
 * FRAME icon set. One grid (18 × 18, rendered at 18px), one stroke (1.5px, round caps and joins), outline only.
 * Icons are decorative: the Video.js control that renders them supplies the accessible name and state.
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PlayIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 3.9v10.2a.63.63 0 0 0 .96.54l8.07-5.1a.63.63 0 0 0 0-1.07L5.96 3.36A.63.63 0 0 0 5 3.9Z" />
  </Icon>
);

export const PauseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 3.75h2.25v10.5H5zM10.75 3.75H13v10.5h-2.25z" />
  </Icon>
);

export const RestartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.9 6.4A5.5 5.5 0 1 1 3.5 9" />
    <path d="M3.5 3.25v3.5H7" />
  </Icon>
);

const Speaker = () => <path d="M2.75 7v4h2.5L9 14V4L5.25 7z" />;

export const VolumeHighIcon = (p: IconProps) => (
  <Icon {...p}>
    <Speaker />
    <path d="M11.75 6.75a3.2 3.2 0 0 1 0 4.5M13.9 4.6a6.25 6.25 0 0 1 0 8.8" />
  </Icon>
);

export const VolumeLowIcon = (p: IconProps) => (
  <Icon {...p}>
    <Speaker />
    <path d="M11.75 6.75a3.2 3.2 0 0 1 0 4.5" />
  </Icon>
);

export const VolumeOffIcon = (p: IconProps) => (
  <Icon {...p}>
    <Speaker />
    <path d="m11.75 7 4 4M15.75 7l-4 4" />
  </Icon>
);

const CaptionsFrame = () => <rect x="1.75" y="3.75" width="14.5" height="10.5" rx="2" />;

export const CaptionsOnIcon = (p: IconProps) => (
  <Icon {...p}>
    <CaptionsFrame />
    <path d="M4.75 8.25h3M9.75 8.25h3.5M4.75 11h5M11.75 11h1.5" />
  </Icon>
);

export const CaptionsOffIcon = (p: IconProps) => (
  <Icon {...p}>
    <CaptionsFrame />
    <path d="M4.75 8.25h3M4.75 11h2.5M2 16 16 2" />
  </Icon>
);

/** Crop marks — the FRAME signature — doubling as the fullscreen glyph. */
export const FullscreenEnterIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.75 6.5V3.75a1 1 0 0 1 1-1H6.5M11.5 2.75h2.75a1 1 0 0 1 1 1V6.5M15.25 11.5v2.75a1 1 0 0 1-1 1H11.5M6.5 15.25H3.75a1 1 0 0 1-1-1V11.5" />
  </Icon>
);

export const FullscreenExitIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.5 2.75V5.5a1 1 0 0 1-1 1H2.75M11.5 2.75V5.5a1 1 0 0 0 1 1h2.75M15.25 11.5H12.5a1 1 0 0 0-1 1v2.75M2.75 11.5H5.5a1 1 0 0 1 1 1v2.75" />
  </Icon>
);

const ScreenFrame = () => <path d="M15.25 8V4.75a1 1 0 0 0-1-1H3.75a1 1 0 0 0-1 1v8.5a1 1 0 0 0 1 1H7" />;

export const PipEnterIcon = (p: IconProps) => (
  <Icon {...p}>
    <ScreenFrame />
    <rect x="9.75" y="10.25" width="5.5" height="4" rx="0.75" />
  </Icon>
);

export const PipExitIcon = (p: IconProps) => (
  <Icon {...p}>
    <ScreenFrame />
    <rect x="9.75" y="10.25" width="5.5" height="4" rx="0.75" />
    <path d="M6 7.25 8.5 9.75M6 9.75v-2.5h2.5" />
  </Icon>
);

export const SettingsIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.75 6h6.5M13.25 6h2M2.75 12h2M8.75 12h6.5" />
    <circle cx="11.25" cy="6" r="1.75" />
    <circle cx="6.75" cy="12" r="1.75" />
  </Icon>
);

export const ChevronIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 4.5 11.5 9 7 13.5" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m3.75 9.5 3.25 3.25 7.25-7.5" />
  </Icon>
);

export const SeekIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14.75 9A5.75 5.75 0 1 1 9 3.25h1.25" />
    <path d="m8.75 1.5 1.75 1.75L8.75 5" />
  </Icon>
);

export const SpeedIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.1 13.5a6.5 6.5 0 1 1 11.8 0" />
    <path d="m9 10.25 2.75-3.5" />
  </Icon>
);

export const QualityIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 2.75 15.25 6 9 9.25 2.75 6z" />
    <path d="M2.75 9.25 9 12.5l6.25-3.25M2.75 12.5 9 15.75l6.25-3.25" />
  </Icon>
);

export const AudioTrackIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.25 3.25h9.5a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H8.5l-3.25 2.5v-2.5h-1a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5Z" />
    <path d="M6.25 7.75h5.5" />
  </Icon>
);

const CastBase = () => (
  <>
    <path d="M2.75 6V4.75a1 1 0 0 1 1-1h10.5a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1H10.5" />
    <path d="M2.75 9a5.25 5.25 0 0 1 5.25 5.25M2.75 11.75a2.5 2.5 0 0 1 2.5 2.5" />
  </>
);

export const CastEnterIcon = (p: IconProps) => (
  <Icon {...p}>
    <CastBase />
  </Icon>
);

export const CastExitIcon = (p: IconProps) => (
  <Icon {...p}>
    <CastBase />
    <path d="M10.5 6.5h2.25v4.25" />
  </Icon>
);

const AirPlayBase = () => (
  <path d="M5.25 13.25h-1.5a1 1 0 0 1-1-1v-8.5a1 1 0 0 1 1-1h10.5a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-1.5M9 11l3.25 4.25h-6.5Z" />
);

export const AirPlayEnterIcon = (p: IconProps) => (
  <Icon {...p}>
    <AirPlayBase />
  </Icon>
);

export const AirPlayExitIcon = (p: IconProps) => (
  <Icon {...p}>
    <AirPlayBase />
    <path d="M6.5 6.25h5" />
  </Icon>
);

/** Spins through `--media-spinner-animation`, which the skin's preferences sheet turns off under reduced motion. */
export const SpinnerIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="9" r="6.75" opacity="0.25" />
    <path
      d="M9 2.25A6.75 6.75 0 0 1 15.75 9"
      style={{
        transformBox: 'view-box',
        transformOrigin: 'center',
        animation: 'var(--media-spinner-animation, frame-spin 0.9s linear infinite)',
      }}
    />
  </Icon>
);

/* Names the skin's components import. */
export { SettingsIcon as GearIcon, QualityIcon as SwitchesIcon, AudioTrackIcon as SpeechIcon };
