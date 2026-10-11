import { useEffect, useRef, useState } from 'react';
import logo from './assets/crash_logo_black.png'; // pointing to src/assets

export default function TiltLogo() {
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, skewX: 0, skewY: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      frameRef.current = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;

        // Normalize cursor position to a -1 (left/top) to 1 (right/bottom) range
        const x = (e.clientX / innerWidth) * 2 - 1;
        const y = (e.clientY / innerHeight) * 2 - 1;

        const MAX_TILT_DEG = 25;  // medium intensity rotation
        const MAX_SKEW_DEG = 8;   // subtle skew so it doesn't distort too much

        setTransform({
          rotateY: x * MAX_TILT_DEG,       // moving right/left tilts the logo left/right
          rotateX: -y * MAX_TILT_DEG,      // moving up/down tilts the logo down/up
          skewX: x * MAX_SKEW_DEG * 0.3,
          skewY: y * MAX_SKEW_DEG * 0.3,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div style={styles.container}>
      <img
        src={logo}
        alt="Logo"
        style={{
          ...styles.logo,
          transform: `perspective(800px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) skew(${transform.skewX}deg, ${transform.skewY}deg)`,
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 0,
  },
  logo: {
    width: '50%',
    maxWidth: '500px',
    height: 'auto',
    transition: 'transform 0.15s ease-out',
    willChange: 'transform',
    userSelect: 'none',
    pointerEvents: 'none', // so the image itself never blocks mouse tracking
  },
};