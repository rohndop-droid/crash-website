import { FONT_FAMILY } from '../theme';

// ---------------------------------------------------------------------
// EDIT YOUR CONTACT DETAILS HERE — one entry per row (4 total).
// col1 = single line. col2 and col3 each take TWO lines (label/value
// pairs like "Email" + "Phone"). Add, remove, or edit rows freely.
// ---------------------------------------------------------------------
const ROWS = [
  {
    col1: 'Founder/Editor',
    col2: ['Email', 'Phone'],
    col3: ['rohn@crash.edit', '+61 0485683695'],
  },
  {
    col1: 'Producer/Editor',
    col2: ['Email', 'Phone'],
    col3: ['austin@crash.edit', '+61 410980690'],
  },
  {
    col1: 'Producer/Editor',
    col2: ['Email', 'Phone'],
    col3: ['norden@crash.edit', '+61 452019957'],
  },
  {
    col1: 'Queries',
    col2: ['Email', 'Address'],
    col3: ['hello@crash.edit', '14 Quinn Street, Toowong, QLD 4066'],
  },
];

// --- Text styling — change these anytime ---
const TEXT_COLOR = '#000000';
const TEXT_SIZE = 14;

// --- Page background — change anytime ---
const PAGE_BACKGROUND_COLOR = '#ffffff';

// --- Footer links ---
const INSTAGRAM_URL = 'https://instagram.com/';
const EMAIL_URL = 'mailto:hello@example.com';
const FOOTER_COLOR = '#cdaefa';

// --- Layout ---
const LINE_COLOR = '#bdbdbd';
const TOP_SPACE = 230;     // clears the fixed top logo
const PAGE_PADDING_X = 72; // left/right spacing from the screen edges

export default function Contact() {
  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr', // 3 equal columns — column 2's center always lands on the page's horizontal center, matching TopLogo
    padding: `28px ${PAGE_PADDING_X}px`,
    borderBottom: `1px solid ${LINE_COLOR}`,
    fontFamily: FONT_FAMILY,
    fontSize: TEXT_SIZE,
    color: TEXT_COLOR,
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        backgroundColor: PAGE_BACKGROUND_COLOR,
      }}
    >
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ paddingTop: TOP_SPACE, flex: 1 }}>
          {/* Top border for the first row */}
          <div style={{ borderTop: `1px solid ${LINE_COLOR}` }} />

          {ROWS.map((row, i) => (
            <div key={i} style={rowStyle}>
              <span style={{ textAlign: 'left' }}>{row.col1}</span>

              <span style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <span>{row.col2[0]}</span>
                <span>{row.col2[1]}</span>
              </span>

              <span style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                <span>{row.col3[0]}</span>
                <span>{row.col3[1]}</span>
              </span>
            </div>
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
    </div>
  );
}