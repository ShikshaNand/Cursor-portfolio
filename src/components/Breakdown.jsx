import React, { useState, useRef, useContext } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MotionContext, featured } from '../constants';
import { Reveal, MediaImage } from './Common';

export function Breakdown() {
  const scene = featured.find(p => p.type === 'render');
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const [manual, setManual] = useState(false);
  const [cut, setCut] = useState(65);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  useMotionValueEvent(scrollYProgress, 'change', v => {
    if (!manual && enabled) setCut(Math.round(90 - v * 80));
  });

  const titleX = useTransform(scrollYProgress, [0, 1], [30, -30]);
  if (!scene) return null;

  return (
    <section className="breakdown section-wrap" ref={ref} aria-labelledby="breakdown-title">
      <Reveal className="breakdown-copy">
        <span className="eyebrow">HARDWARE & EMBEDDED SYSTEMS</span>
        <motion.h2 id="breakdown-title" className="display" style={enabled ? { x: titleX } : {}}>
          FROM LOGIC.
          <br />
          <span className="accent">TO DEPLOYMENT.</span>
        </motion.h2>
        <p>From initial circuit pinouts and firmware flashing to production-grade network analysis with the ESP32 WROOM module.</p>
        <span className="breakdown-credit">
          ESP32 SECURITY EXPERIMENTATION / 2025
          <br />
          FIRMWARE FLASHING · MARAUDER · WIRELESS PROTOCOLS
        </span>
      </Reveal>
      <Reveal className="comparison">
        <div className="comparison-stage" style={{ '--cut': `${enabled || manual ? cut : 50}%` }}>
          <MediaImage src={scene.renders[0].solid} alt="ESP32 hardware wiring and schematic stage" />
          <div className="comparison-final">
            <MediaImage src={scene.renders[0].final} alt="Configured ESP32 WROOM network monitor" />
          </div>
          <span className="comparison-label raw-label">SCHEMATIC / FIRMWARE</span>
          <span className="comparison-label final-label">LIVE HARDWARE</span>
          <div className="comparison-divider">
            <span>
              <ChevronLeft size={14} />
              <ChevronRight size={14} />
            </span>
          </div>
          <input
            aria-label="Comparison slider"
            aria-valuetext={`${cut}% firmware, ${100 - cut}% live hardware`}
            type="range"
            min="0"
            max="100"
            value={cut}
            onChange={e => {
              setManual(true);
              setCut(Number(e.target.value));
            }}
          />
        </div>
        <div className="comparison-caption">
          <span>SLIDE TO REVEAL TRANSFORMATION</span>
          <span>DRAG / SCROLL</span>
        </div>
      </Reveal>
    </section>
  );
}
