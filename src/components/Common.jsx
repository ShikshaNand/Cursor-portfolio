import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, useSpring } from 'framer-motion';
import { MotionContext, EASE } from '../constants';

export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const enabled = useContext(MotionContext);
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={enabled ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: enabled ? 0.75 : 0, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

export function MediaImage({ src, alt, className = '', priority = false, ...props }) {
  const [state, setState] = useState('loading');
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    setState(img?.complete ? (img.naturalWidth ? 'loaded' : 'error') : 'loading');
  }, [src]);

  return (
    <span className={`media-image ${state} ${className}`}>
      {state === 'error' && (
        <span className="image-fallback">
          <span className="display">SN</span>
          <span>Preview not available</span>
        </span>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        width="960"
        height="600"
        onLoad={() => setState('loaded')}
        onError={() => setState('error')}
        {...props}
      />
    </span>
  );
}

export function Magnetic({ children, className = '', ...props }) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });

  return (
    <motion.a
      className={className}
      style={{ x, y }}
      onPointerMove={e => {
        if (!enabled || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.12);
        y.set((e.clientY - r.top - r.height / 2) * 0.2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
