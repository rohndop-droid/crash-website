import { useEffect, useRef, useState } from 'react';
import { FONT_FAMILY } from '../theme';

// ---------------------------------------------------------------------
// EDIT YOUR WORK HERE — each { ... } line below is one row on the page.
//  • To ADD a row: copy any line and paste it at the end of the list.
//  • To REMOVE a row: delete its line.
//  • To EDIT a row: change the text between the quotes.
// `video` is the file shown when that row is hovered. Put the files in
// public/work/ and reference them like '/work/01.mp4'. MP4 autoplays
// and loops automatically — see the <video> tag below for why.
// ---------------------------------------------------------------------
const WORKS = [
  { client: 'FASTRACK', project: 'Everyones Bag', editor: 'Rohn Jose', video: '/work/01.mp4' },
  { client: 'CARPE DIEM', project: 'Quiet Dance', editor: 'Rohn Jose', video: '/work/02.mp4' },
  { client: 'KANYE', project: 'Cant Tell Me Nothing', editor: 'Rohn Jose', video: '/work/03.mp4' },
  { client: 'METROACTIV', project: 'Runners High', editor: 'Rohn Jose', video: '/work/04.mp4' },
  { client: 'DAVINCHI', project: 'Take Me Home', editor: 'Rohn Jose', video: '/work/05.mp4' },
  { client: 'ANIRUDH', project: 'Cinematography Showreel', editor: 'Rohn Jose', video: '/work/06.mp4' },
  { client: 'Client Name 07', project: 'Project Title 07', editor: 'Austin Castilino', video: '/work/07.mp4' },
  { client: 'Client Name 08', project: 'Project Title 08', editor: 'Austin Castilino', video: '/work/08.mp4' },
  { client: 'GRIFFITH', project: 'Life of Jester', editor: 'Norden Khyungba Lama', video: '/work/09.mp4' },
  { client: 'Client Name 10', project: 'Project Title 10', editor: 'Norden Khyungba Lama', video: '/work/10.mp4' },
];

// --- Footer links (edit these) ---
const INSTAGRAM_URL = 'https://instagram.com/';
const EMAIL_URL = 'mailto:hello@example.com';

// --- Look & feel ---
const HOVER_COLOR = '#cdaefa'; // row highlight + footer strip color
const LINE_COLOR = '#bdbdbd';  // grey lines between rows
const TOP_SPACE = 170;         // px of empty space above the list so the top logo doesn't cover the header row
const ROW_PADDING_X = 72;      // px of left/right spacing from the screen edges — increase for more breathing room

// Placeholder locked to a 1920x1080-style 16:9 ratio
const POPUP_WIDTH = 420;
const POPUP_HEIGHT = (POPUP_WIDTH * 9) / 16;

// Alternating fixed horizontal spots — even rows pop out on the right,
// odd rows on the left, so placement feels deliberate rather than random.
const POPUP_X_RIGHT_PERCENT = 78;
const POPUP_X_LEFT_PERCENT = 22;

// Still checks the extension rather than assuming — if you ever drop a
// .jpg/.png into the `video` field by mistake, it'll render as a plain
// image instead of a broken <video> tag.
function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

// One media placeholder. Springs in gently (no overshoot/bounce, no
// rotation) at a position tied to the hovered row, and shrinks away when
// replaced or when the mouse leaves the list.
function Popup({ x, y, src, leaving }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let id2;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setShown(true));
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, []);

  const visible = shown && !leaving;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: POPUP_WIDTH,
        height: POPUP_HEIGHT,
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.85})`,
        opacity: visible ? 1 : 0,
        // Gentle, subtle ease — no bounce/overshoot, and no rotation at all.
        transition: leaving
          ? 'transform 0.25s ease-in, opacity 0.25s ease-in'
          : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out',
        backgroundColor: '#e5e5e5', // grey block shows until a real video is added
        overflow: 'hidden',
      }}
    >
      {isVideo(src) ? (
        <video
          src={src}
          autoPlay // starts playing the instant it mounts
          loop     // restarts from the beginning every time it ends — this is what makes it loop forever
          muted    // required by every major browser for autoplay to be allowed at all
          playsInline // stops iOS Safari from forcing fullscreen playback
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <img
          src={src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </div>
  );
}

export default function Work() {
  const [hovered, setHovered] = useState(null);
  const [popups, setPopups] = useState([]);
  const idRef = useRef(0);
  const rowRefs = useRef([]);

  const clearLeaving = () => {
    setTimeout(() => setPopups((prev) => prev.filter((p) => !p.leaving)), 300);
  };

  const showPopup = (work, index) => {
    const rowEl = rowRefs.current[index];
    if (!rowEl) return;
    const rect = rowEl.getBoundingClientRect();

    // Vertical position matches the hovered row's own position on screen.
    const y = rect.top + rect.height / 2;
    // Horizontal position alternates left/right by row index — controlled,
    // not random — so it never feels like it's jumping to an arbitrary spot.
    const xPercent = index % 2 === 0 ? POPUP_X_RIGHT_PERCENT : POPUP_X_LEFT_PERCENT;
    const x = (window.innerWidth * xPercent) / 100;

    idRef.current += 1;
    const id = idRef.current;

    setPopups((prev) => [
      ...prev.map((p) => ({ ...p, leaving: true })),
      { id, x, y, src: work.video, leaving: false },
    ]);
    clearLeaving();
  };

  const hideAll = () => {
    setPopups((prev) => prev.map((p) => ({ ...p, leaving: true })));
    clearLeaving();
  };

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    padding: `18px ${ROW_PADDING_X}px`,
    borderBottom: `1px solid ${LINE_COLOR}`,
    fontFamily: FONT_FAMILY,
    color: '#000000',
  };

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', backgroundColor: '#ffffff' }}>
        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{ paddingTop: TOP_SPACE, flex: 1 }}
            onMouseLeave={() => {
              setHovered(null);
              hideAll();
            }}
          >
            {/* Column headings — Client at the far left, Project exactly centered on the page (same center as the top logo), Editor at the far right */}
            <div style={{ ...rowStyle, fontSize: 16, borderTop: `1px solid ${LINE_COLOR}`, cursor: 'default' }}>
              <span style={{ textAlign: 'left' }}>Client</span>
              <span style={{ textAlign: 'center' }}>Project</span>
              <span style={{ textAlign: 'right' }}>Editor</span>
            </div>

            {/* Work rows */}
            {WORKS.map((work, i) => (
              <div
                key={i}
                ref={(el) => { rowRefs.current[i] = el; }}
                onMouseEnter={() => {
                  setHovered(i);
                  showPopup(work, i);
                }}
                style={{
                  ...rowStyle,
                  fontSize: 16,
                  cursor: 'pointer',
                  backgroundColor: hovered === i ? HOVER_COLOR : 'transparent',
                  transition: 'background-color 0.12s ease',
                }}
              >
                <span style={{ textAlign: 'left' }}>{work.client}</span>
                <span style={{ textAlign: 'center' }}>{work.project}</span>
                <span style={{ textAlign: 'right' }}>{work.editor}</span>
              </div>
            ))}
          </div>

          {/* Footer strip */}
          <div
            style={{
              backgroundColor: HOVER_COLOR,
              color: '#000000',
              fontFamily: FONT_FAMILY,
              fontSize: 14,
              padding: `18px ${ROW_PADDING_X}px`,
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

      {/* Layer that holds the popping-out video placeholders (never blocks the mouse) */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 20, overflow: 'hidden' }}>
        {popups.map((p) => (
          <Popup key={p.id} x={p.x} y={p.y} src={p.src} leaving={p.leaving} />
        ))}
      </div>
    </>
  );
}