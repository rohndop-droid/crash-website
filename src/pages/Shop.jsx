import { useState } from 'react';
import { FONT_FAMILY } from '../theme';

// ---------------------------------------------------------------------
// EDIT YOUR PRODUCTS HERE — one entry per placeholder (6 total).
// `defaultSrc` shows at rest; `hoverSrc` swaps in while the cursor is
// over the image, reverting on mouse leave. `text` is the strip label.
// `ellipseText`/`ellipseColor` are optional — leave them out to use the
// defaults (ELLIPSE_TEXT / ELLIPSE_COLOR below), or set them per item to
// override just that one product's pill.
// Put the actual image files in public/shop/ and reference them like
// '/shop/1-default.jpg'.
// ---------------------------------------------------------------------
const PRODUCTS = [
  { text: 'CRASH HAT', defaultSrc: '/shop/1-default.jpg', hoverSrc: '/shop/1-hover.jpg' },
  { text: 'CRASH KEYCHAIN', defaultSrc: '/shop/2-default.jpg', hoverSrc: '/shop/2-hover.jpg' },
  { text: 'CRASH BLACK TOTE', defaultSrc: '/shop/3-default.jpg', hoverSrc: '/shop/3-hover.jpg' },
  { text: 'CRASH OFF WHITE TOTE', defaultSrc: '/shop/4-default.jpg', hoverSrc: '/shop/4-hover.jpg' },
  { text: 'CRASH HOODIE', defaultSrc: '/shop/5-default.jpg', hoverSrc: '/shop/5-hover.jpg' },
  { text: 'CRASH HAT', defaultSrc: '/shop/6-default.jpg', hoverSrc: '/shop/6-hover.jpg' },
];

// Default pill label/color — used unless a product above sets its own
const ELLIPSE_TEXT = 'Order';
const ELLIPSE_COLOR = '#7113f5';

// --- Footer links ---
const INSTAGRAM_URL = 'https://instagram.com/';
const EMAIL_URL = 'mailto:hello@example.com';

// --- Look & feel ---
const STRIP_COLOR = '#cdaefa';
const FOOTER_COLOR = '#cdaefa';
const PAGE_PADDING_X = 72;  // left/right spacing from the screen edges
const TOP_SPACE = 170;      // clears the fixed top logo at the top of the page

// Square placeholders — 3 fit per row, 2 rows for 6 total
const CARD_SIZE = 460;
const STRIP_HEIGHT = 52;

// Wide rounded "rectangular ellipse" — change these two to resize it
const ELLIPSE_WIDTH = 90;
const ELLIPSE_HEIGHT = 34;
const ELLIPSE_EDGE_SPACING = 16; // gap between the pill and the strip's right edge

function ShopCard({ product }) {
  const [imageHovered, setImageHovered] = useState(false);
  const [stripHovered, setStripHovered] = useState(false);

  const ellipseText = product.ellipseText || ELLIPSE_TEXT;
  const ellipseColor = product.ellipseColor || ELLIPSE_COLOR;

  return (
    <div style={{ width: CARD_SIZE }}>
      {/* Image — hover swaps the photo, reverts on leave */}
      <div
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
        style={{ width: CARD_SIZE, height: CARD_SIZE, overflow: 'hidden', backgroundColor: '#e5e5e5', cursor: 'pointer' }}
      >
        <img
          src={imageHovered ? product.hoverSrc : product.defaultSrc}
          alt={product.text}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Strip — boxSizing: border-box keeps padding INSIDE the 100% width,
          which is what stops it from overflowing past the placeholder. */}
      <div
        onMouseEnter={() => setStripHovered(true)}
        onMouseLeave={() => setStripHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          height: STRIP_HEIGHT,
          boxSizing: 'border-box',
          backgroundColor: STRIP_COLOR,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: ELLIPSE_WIDTH + ELLIPSE_EDGE_SPACING * 2, // reserves room so the pill never overlaps the text
          cursor: 'pointer',
        }}
      >
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 15, color: '#000000' }}>
          {product.text}
        </span>

        {/* Wide pill — pops up on the right side of the strip on hover */}
        <div
          style={{
            position: 'absolute',
            right: ELLIPSE_EDGE_SPACING,
            top: '50%',
            width: ELLIPSE_WIDTH,
            height: ELLIPSE_HEIGHT,
            borderRadius: ELLIPSE_HEIGHT, // large enough relative to height to fully round both ends into a pill/stadium shape
            backgroundColor: ellipseColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateY(-50%) scale(${stripHovered ? 1 : 0})`,
            opacity: stripHovered ? 1 : 0,
            transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease',
          }}
        >
          <span style={{ fontFamily: FONT_FAMILY, fontSize: 13, color: '#ffffff', whiteSpace: 'nowrap' }}>
            {ellipseText}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflowY: 'auto', backgroundColor: '#ffffff' }}>
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            paddingTop: TOP_SPACE,
            paddingLeft: PAGE_PADDING_X,
            paddingRight: PAGE_PADDING_X,
            paddingBottom: 48,
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr', // 3 equal columns — the middle one's center always lands on the page's horizontal center, matching TopLogo
            rowGap: 48,
          }}
        >
          {PRODUCTS.map((product, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
              <ShopCard product={product} />
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