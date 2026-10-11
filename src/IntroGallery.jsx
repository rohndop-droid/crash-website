import { useEffect, useRef } from 'react';
import logo from './assets/crash_logo_black.png'; // update this path if your logo lives elsewhere

// 12 placeholders, scattered at random-feeling positions rather than any
// arc or grid, kept fully within the visible frame at rest so nothing
// gets clipped at the edges. One sits just above the logo, one just below
// it. No rotation on any of them. skewX and skewY are both set to 0 for
// now — adjust these two per item to control the lean on each axis, and
// transformOrigin controls which edge stays fixed while skewing (e.g.
// '100% 50%' keeps the right edge still and only the left edge moves).
const PLACEHOLDERS = [
  { id: 1,  top: '82%', left: '50%', width: 300, skewX: 0, skewY: 0, transformOrigin: '50% 100%', speed: 90,  ease: 0.03,  src: '/placeholders/1.gif' },
  { id: 2,  top: '15%', left: '6%', width: 340, skewX: 0, skewY: 0, transformOrigin: '0% 50%', speed: 150, ease: 0.025, src: '/placeholders/2.gif' },
  { id: 3,  top: '58%', left: '4%', width: 320, skewX: 0, skewY: 0, transformOrigin: '0% 50%', speed: 70,  ease: 0.04,  src: '/placeholders/3.gif' },
  { id: 4,  top: '48%', left: '30%', width: 360, skewX: 0, skewY: 0, transformOrigin: '0% 50%', speed: 180, ease: 0.02,  src: '/placeholders/4.gif' },
  { id: 5,  top: '88%', left: '25%', width: 300, skewX: 0, skewY: 0, transformOrigin: '0% 50%', speed: 110, ease: 0.035, src: '/placeholders/5.gif' },
  { id: 6,  top: '16%', left: '38%', width: 380, skewX: 0, skewY: 0, transformOrigin: '0% 50%', speed: 130, ease: 0.03,  src: '/placeholders/6.gif' },
  { id: 7,  top: '13%', left: '98%', width: 300, skewX: 0, skewY: 0, transformOrigin: '50% 0%', speed: 100, ease: 0.03,  src: '/placeholders/7.gif' },
  { id: 8,  top: '42%', left: '78%', width: 340, skewX: 0, skewY: 0, transformOrigin: '100% 50%', speed: 160, ease: 0.025, src: '/placeholders/8.gif' },
  { id: 9,  top: '52%', left: '102%', width: 320, skewX: 0, skewY: 0, transformOrigin: '100% 50%', speed: 80,  ease: 0.04,  src: '/placeholders/9.gif' },
  { id: 10, top: '70%', left: '86%', width: 360, skewX: 0, skewY: 0, transformOrigin: '100% 50%', speed: 200, ease: 0.02,  src: '/placeholders/10.gif' },
  { id: 11, top: '10%', left: '70%', width: 300, skewX: 0, skewY: 0, transformOrigin: '100% 50%', speed: 120, ease: 0.035, src: '/placeholders/11.gif' },
  { id: 12, top: '104%', left: '80%', width: 380, skewX: 0, skewY: 0, transformOrigin: '100% 50%', speed: 140, ease: 0.03,  src: '/placeholders/12.gif' },
];

function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

// --- Logo tilt tuning (same feel as the original TiltLogo) ---
const MAX_TILT_DEG = 25;
const MAX_SKEW_DEG = 8;

export default function IntroGallery() {
  const itemRefs = useRef([]);
  const logoRef = useRef(null);
  const current = useRef(PLACEHOLDERS.map(() => ({ x: 0, y: 0 })));
  const target = useRef(PLACEHOLDERS.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    let raf = 0;

    const handleMouseMove = (e) => {
      // Normalize cursor position to -1 (left/top) .. 1 (right/bottom)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      PLACEHOLDERS.forEach((p, i) => {
        // The minus sign inverts direction: cursor left (negative nx) ->
        // content moves right (positive offset), same for up/down.
        target.current[i] = { x: -nx * p.speed, y: -ny * p.speed };
      });

      // Logo tilts exactly like the original TiltLogo component
      if (logoRef.current) {
        const rotateY = nx * MAX_TILT_DEG;
        const rotateX = -ny * MAX_TILT_DEG;
        const skewX = nx * MAX_SKEW_DEG * 0.3;
        const skewY = ny * MAX_SKEW_DEG * 0.3;
        logoRef.current.style.transform =
          `translate(-50%, -50%) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) skew(${skewX}deg, ${skewY}deg)`;
      }
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      PLACEHOLDERS.forEach((p, i) => {
        const c = current.current[i];
        const t = target.current[i];
        // Lerp toward the target — p.ease controls how fast THIS item
        // catches up, which keeps a slight natural stagger even though
        // every item now shares the same overall speed.
        c.x += (t.x - c.x) * p.ease;
        c.y += (t.y - c.y) * p.ease;

        const el = itemRefs.current[i];
        if (el) {
          // Movement (translate3d) works exactly as before — only the
          // static shape transform changed, from rotate() to skew().
          el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) skew(${p.skewX}deg, ${p.skewY}deg)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', backgroundColor: '#ffffff' }}>
      {/* Center logo — tilts toward the cursor, always stays above placeholders */}
      <img
        ref={logoRef}
        src={logo}
        alt="Logo"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '76%',
          maxWidth: 920,
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      />

      {PLACEHOLDERS.map((p, i) => {
        const height = (p.width * 9) / 16; // locks every placeholder to a 1920x1080-style 16:9 ratio
        return (
          <div
            key={p.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              top: `calc(${p.top} - ${height / 2}px)`,
              left: `calc(${p.left} - ${p.width / 2}px)`,
              width: p.width,
              height,
              transformOrigin: p.transformOrigin, // pivots the skew from the far edge, so only the near edge (facing the logo) moves
              zIndex: 1, // always stays below the logo (zIndex 2) when they overlap
              willChange: 'transform',
              backgroundColor: '#e5e5e5', // visible fallback block until a real gif is dropped in
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            {isVideo(p.src) ? (
              <video
                src={p.src}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <img
                src={p.src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; }} // keeps the gray box visible if the file isn't there yet
              />
            )}
          </div>
        );
      })}
    </div>
  );
}