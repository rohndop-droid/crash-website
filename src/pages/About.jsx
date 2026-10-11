import { FONT_FAMILY } from '../theme';

// ---------------------------------------------------------------------
// EDIT YOUR TEXT HERE — each line in this array is one line on screen.
// Add more lines, remove one, or edit the wording freely.
// ---------------------------------------------------------------------
const TEXT_LINES = [
  'Crash is a congregation of globally-minded film editors',
  'who seek to bring creative visions to life.',
];

// --- Colors — change these anytime ---
const TEXT_COLOR = '#000000';
const PAGE_BACKGROUND_COLOR = '#ffffff';

// --- Footer links ---
const INSTAGRAM_URL = 'https://instagram.com/';
const EMAIL_URL = 'mailto:hello@example.com';
const FOOTER_COLOR = '#cdaefa';
const PAGE_PADDING_X = 72;

export default function About() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: PAGE_BACKGROUND_COLOR,
      }}
    >
      {/* Centered text */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: `0 ${PAGE_PADDING_X}px`,
        }}
      >
        {TEXT_LINES.map((line, i) => (
          <span
            key={i}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 17,
              color: TEXT_COLOR,
              lineHeight: 1.5,
            }}
          >
            {line}
          </span>
        ))}
      </div>

      {/* Footer strip */}
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
  );
}