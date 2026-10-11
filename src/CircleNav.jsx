import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FONT_FAMILY } from './theme';

// --- Position tuning — change these anytime to move the circle/menu ---
const NAV_TOP_PERCENT = 90;   // % from the top of the screen
const NAV_LEFT_PERCENT = 50;  // % from the left of the screen (50 = centered under the logo)

// --- Size tuning ---
const CLOSED_SIZE = 62;  // diameter of the circle, in px, when closed
const OPEN_WIDTH = 540;  // width of the expanded pill, in px, when open
const BAR_HEIGHT = 60;   // height stays the same whether open or closed

// Each item now carries its route path alongside the label shown on screen.
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Editors', path: '/editors' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function CircleNav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false); // collapses back to the circle right after navigating — this is the "close" animation
  };

  return (
    <div
      onClick={() => setOpen((v) => !v)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        top: `${NAV_TOP_PERCENT}%`,
        left: `${NAV_LEFT_PERCENT}%`,
        // Scale-on-hover only applies while closed, so it doesn't fight
        // with the expand animation once the menu is open.
        transform: `translate(-50%, -50%) scale(${hovered && !open ? 1.12 : 1})`,
        width: open ? OPEN_WIDTH : CLOSED_SIZE,
        height: BAR_HEIGHT,
        borderRadius: 9999, // stays fully rounded at both the small-circle and expanded-pill sizes
        backgroundColor: 'rgba(0, 0, 0, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: open ? 'space-around' : 'center',
        cursor: 'pointer',
        transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease-out',
        zIndex: 9999, // pushed very high as a safety margin, now that it renders outside IntroGallery entirely
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {open ? (
        NAV_ITEMS.map((item) => (
          <span
            key={item.label}
            onClick={(e) => {
              e.stopPropagation(); // stops the click from also re-toggling the menu open/closed
              handleNavigate(item.path);
            }}
            style={{
              color: '#ffffff',
              fontFamily: FONT_FAMILY,
              fontSize: 16,
              padding: '0 12px',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </span>
        ))
      ) : (
        // Three white lines, shown only while closed
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 22,
                height: 2,
                backgroundColor: '#ffffff',
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}