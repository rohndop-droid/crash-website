import { useState } from 'react';
import { FONT_FAMILY } from '../theme';

// ---------------------------------------------------------------------
// EDIT YOUR EDITORS HERE — one entry per placeholder (3 total).
// `defaultSrc` shows at rest; `hoverSrc` swaps in while the cursor is
// over that placeholder, and it reverts to `defaultSrc` on mouse leave.
// `name` shows in the strip at rest; `role` shows in the strip on hover
// (e.g. "Editing, SFX, Color Grade") — edit either freely.
// Put the actual image files in public/editors/ and reference them like
// '/editors/1-default.jpg'.
// ---------------------------------------------------------------------
const EDITORS = [
  { name: 'Rohn Jose', role: 'Editing, Motion Design', defaultSrc: '/editors/1-default.jpg', hoverSrc: '/editors/1-hover.jpg' },
  { name: 'Austin Castilino', role: 'Editing, Color Grade', defaultSrc: '/editors/2-default.jpg', hoverSrc: '/editors/2-hover.jpg' },
  { name: 'Norden Khyungba Lama', role: 'Editing, Color Grade', defaultSrc: '/editors/3-default.jpg', hoverSrc: '/editors/3-hover.jpg' },
];

// --- Footer links — same as the Work page ---
const INSTAGRAM_URL = 'https://instagram.com/';
const EMAIL_URL = 'mailto:hello@example.com';

// --- Look & feel ---
const STRIP_COLOR = '#cdaefa';
const STRIP_HOVER_COLOR = '#7113f5';
const FOOTER_COLOR = '#cdaefa';
const PAGE_PADDING_X = 72;  // left/right spacing from the screen edges
const TOP_SPACE = 170;      // clears the fixed top logo

// Placeholder locked to a 1080x1350 (4:5) ratio
const CARD_WIDTH = 300;
const CARD_HEIGHT = (CARD_WIDTH * 1350) / 1080;
const STRIP_HEIGHT = 44;
const FADE_DURATION = '0.3s';

function EditorCard({ editor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: CARD_WIDTH, cursor: 'pointer' }}
    >
      <div style={{ width: CARD_WIDTH, height: CARD_HEIGHT, overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
        <img
          src={hovered ? editor.hoverSrc : editor.defaultSrc}
          alt={editor.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: STRIP_HEIGHT,
          backgroundColor: hovered ? STRIP_HOVER_COLOR : STRIP_COLOR,
          transition: `background-color ${FADE_DURATION} ease`,
          overflow: 'hidden',
        }}
      >
        {/* Name — visible at rest, fades out and turns white on hover */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            color: hovered ? '#ffffff' : '#000000',
            opacity: hovered ? 0 : 1,
            transition: `opacity ${FADE_DURATION} ease, color ${FADE_DURATION} ease`,
          }}
        >
          {editor.name}
        </span>

        {/* Role — hidden at rest, fades in and turns white on hover */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            color: hovered ? '#ffffff' : '#000000',
            opacity: hovered ? 1 : 0,
            transition: `opacity ${FADE_DURATION} ease, color ${FADE_DURATION} ease`,
          }}
        >
          {editor.role}
        </span>
      </div>
    </div>
  );
}

export default function Editors() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', backgroundColor: '#ffffff' }}>
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ paddingTop: TOP_SPACE, flex: 1 }}>

          {/* Three placeholders — first at the far left, middle centered on the page (same center as the top logo), last at the far right */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              alignItems: 'start',
              padding: `48px ${PAGE_PADDING_X}px`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <EditorCard editor={EDITORS[0]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <EditorCard editor={EDITORS[1]} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <EditorCard editor={EDITORS[2]} />
            </div>
          </div>
        </div>

        {/* Footer strip — identical text, color and size to the Work page */}
        <div
          style={{
            backgroundColor: FOOTER_COLOR,
            color: '#000000',
            fontFamily: FONT_FAMILY,
            fontSize: 14,
            padding: `18px ${PAGE_PADDING_X}px`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>CRASH 2026 - ALL RIGHTS RESERVED</span>
          <span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={{ color: '#000000', textDecoration: 'none' }}>
              INSTAGRAM
            </a>
            /
            <a href={EMAIL_URL} style={{ color: '#000000', textDecoration: 'none' }}>
              EMAIL
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}