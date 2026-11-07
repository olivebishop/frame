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
    'The picture takes the page; the controls wait in the margins until you reach for them. FRAME is a Video.js 10 skin, set like a film journal.',
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
