import React, { useState, useEffect, useContext } from 'react';
import { motion, useSpring } from 'framer-motion';
import { MotionContext } from '../constants';

export function CustomCursor() {
  const enabled = useContext(MotionContext);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const ringX = useSpring(-100, { stiffness: 400, damping: 28 });
  const ringY = useSpring(-100, { stiffness: 400, damping: 28 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = e => {
      setPos({ x: e.clientX, y: e.clientY });
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      const target = e.target.closest('a, button, input, select, textarea, .project-card, .brand-logo, [data-hover]');
      setHovering(!!target);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled, ringX, ringY]);

  if (!enabled) return null;

  return (
    <>
      <div className="custom-cursor-dot" style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }} />
      <motion.div className={`custom-cursor-ring ${hovering ? 'hovering' : ''}`} style={{ x: ringX, y: ringY }} />
    </>
  );
}
