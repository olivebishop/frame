'use client';

import { useEffect, useId, useRef, useState } from 'react';

const links = [
  { href: '#watch', label: 'Watch' },
  { href: '#chapters', label: 'Chapters' },
  { href: '#films', label: 'Films' },
  { href: 'https://videojs.org', label: 'Video.js', external: true },
];

/**
 * Phone navigation: a disclosure button that opens the links as a full-width list under the header. Closes on a link,
 * Escape, or a tap outside; Escape returns focus to the button.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector('a')?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        ref={buttonRef}
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
          {open ? (
            <path d="m4.5 4.5 9 9M13.5 4.5l-9 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M3 6.5h12M3 11.5h12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <div ref={panelRef} id={id} className="menu-panel" hidden={!open}>
        <nav aria-label="Primary">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
