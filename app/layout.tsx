import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FRAME — The Art of Watching',
  description:
    'FRAME is an editorial skin for Video.js 10: a quiet, typographic video player with chapter navigation and Mux streaming.',
};

export const viewport: Viewport = {
  themeColor: '#f3f1ec',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* Browser extensions often add attributes to <body> before React loads. This ignores those attribute differences
          on <body> itself only; mismatches anywhere inside are still reported. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
