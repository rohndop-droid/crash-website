import { useEffect, useRef } from 'react';
import logo from './assets/crash_logo_black.png'; // update this path if your logo lives elsewhere

// Same tilt math as the original TiltLogo — moving the cursor right tilts
// the logo right, up tilts it down, etc. This version is small and fixed
// to the top-center of the screen, so it stays visible as a persistent
// header logo across every page (Home, Work, Editors, Shop, About, Contact).
const MAX_TILT_DEG = 25;
const MAX_SKEW_DEG = 8;

// --- Position/size tuning ---
const TOP_OFFSET = -85; // px from the top of the screen
const LOGO_WIDTH = 440; // px

export default function TopLogo() {
  const logoRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      if (logoRef.current) {
        const rotateY = nx * MAX_TILT_DEG;
        const rotateX = -ny * MAX_TILT_DEG;
        const skewX = nx * MAX_SKEW_DEG * 0.3;
        const skewY = ny * MAX_SKEW_DEG * 0.3;
        logoRef.current.style.transform =
          `translateX(-50%) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) skew(${skewX}deg, ${skewY}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <img
      ref={logoRef}
      src={logo}
      alt="Logo"
      style={{
        position: 'fixed',
        top: TOP_OFFSET,
        left: '50%',
        transform: 'translateX(-50%)',
        width: LOGO_WIDTH,
        pointerEvents: 'none',
        zIndex: 50,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
    />
  );
}