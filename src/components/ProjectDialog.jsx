import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { MotionContext, EASE } from '../constants';
import { MediaImage } from './Common';

export function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const [renderMode, setRenderMode] = useState('final');
  const [shot] = useState(0);
  const enabled = useContext(MotionContext);

  const activeShot = project.type === 'render' ? project.renders[shot] : null;
  const availableModes = [
    ['layout', 'Schematic'],
    ['solid', 'Firmware Flashing'],
    ['material', 'Hardware Wiring'],
    ['final', 'Live Unit']
  ].filter(([mode]) => activeShot?.[mode]);

  const effectiveMode = activeShot?.[renderMode] ? renderMode : availableModes[0]?.[0];
  const rendered = activeShot?.[effectiveMode] || activeShot?.image || project.image;
  const sourceUrl = project.media || project.image;

  useEffect(() => {
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();

    const listener = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = [...ref.current.querySelectorAll('button, a[href], input, select, textarea, iframe')].filter(
          n => !n.disabled && n.getClientRects().length
        );
        const first = nodes[0];
        const last = nodes.at(-1);
        if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', listener);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener('keydown', listener);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={ref}
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex="-1"
        initial={enabled ? { y: 45, scale: 0.97 } : false}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="dialog-heading">
          <span className="eyebrow">
            {project.category} {project.year && ` / ${project.year}`}
          </span>
          <button onClick={onClose} className="icon-button" aria-label="Close dialog">
            <X />
          </button>
        </div>
        <div className="dialog-media still">
          <MediaImage src={rendered} alt={project.title} priority />
        </div>
        {project.type === 'render' && availableModes.length > 0 && (
          <div className="render-controls">
            <div role="group" aria-label="Architecture stages">
              {availableModes.map(([mode, label]) => (
                <button
                  key={mode}
                  className={effectiveMode === mode ? 'selected' : ''}
                  onClick={() => setRenderMode(mode)}
                  aria-pressed={effectiveMode === mode}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="dialog-description">
          <div>
            <h2 id="dialog-title">{project.title}</h2>
            {project.role && <span className="accent">{project.role}</span>}
            <p>{project.description}</p>
          </div>
          {sourceUrl && (
            <a className="outline-button" href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {project.type === 'website' ? 'Visit Project Site' : 'View Full Media'}
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
