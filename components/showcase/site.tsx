/** Static sections of the FRAME showcase. Server components; no player state. */

import { MobileMenu } from './mobile-menu';
import { rise, RISE } from './rise';

export function Wordmark() {
  return (
    <span className="wordmark">FRAME</span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header shell rise" style={rise(RISE.nav)}>
      <a href="#top" className="site-home" aria-label="FRAME, home">
        <Wordmark />
      </a>
      <nav aria-label="Primary" className="site-nav">
        <ul>
          <li>
            <a href="#watch">Watch</a>
          </li>
          <li>
            <a href="#films">Films</a>
          </li>
          <li>
            <a href="https://videojs.org" target="_blank" rel="noreferrer">
              Video.js
            </a>
          </li>
        </ul>
      </nav>
      <div className="header-actions">
        <a href="#watch" className="button button-primary button-small">
          Watch now
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}

export function Intro() {
  return (
    <section className="intro shell" aria-labelledby="intro-title">
      <h1 id="intro-title" className="display rise" style={rise(RISE.headline)}>
        The Art of Watching.
      </h1>
      <p className="lede rise" style={rise(RISE.description)}>
        The picture takes the page; the controls wait in the margins until you reach for them. A Video.js 10 skin, set
        like a film journal.
      </p>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <Wordmark />
      <p className="muted">
        Built with{' '}
        <a href="https://videojs.org" target="_blank" rel="noreferrer">
          Video.js 10
        </a>
        , streamed by{' '}
        <a href="https://www.mux.com" target="_blank" rel="noreferrer">
          Mux
        </a>
        .{' '}
        <a href="https://mango.blender.org" target="_blank" rel="noreferrer">
          Tears of Steel
        </a>{' '}
        and{' '}
        <a href="https://peach.blender.org" target="_blank" rel="noreferrer">
          Big Buck Bunny
        </a>{' '}
        © Blender Foundation,{' '}
        <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noreferrer">
          CC BY 3.0
        </a>
        .
      </p>
    </footer>
  );
}
