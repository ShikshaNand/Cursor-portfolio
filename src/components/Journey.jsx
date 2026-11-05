import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { experiences, certificates, EASE } from '../constants';
import { Reveal } from './Common';

export function Journey({ onProject }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="journey section-wrap">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">03 / EXPERIENCE & MILESTONES</span>
          <h2>
            CONTINUOUS LEARNING & DELIVERY<span className="accent">.</span>
          </h2>
        </div>
      </Reveal>
      <div className="journey-grid">
        <div className="experience-list">
          {experiences.map((job, i) => (
            <Reveal className={`experience-row ${open === i ? 'is-open' : ''}`} key={job.title}>
              <button
                aria-expanded={open === i}
                aria-controls={`job-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="experience-date">{job.date}</span>
                <span>
                  <h3>{job.title}</h3>
                  <span className="experience-place">{job.place}</span>
                </span>
                {open === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`job-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <p>{job.text}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
        <Reveal className="awards-panel">
          <p className="eyebrow">CERTIFICATION HIGHLIGHTS</p>
          <h3 className="display">
            VERIFIED.
            <br />
            <span className="accent">CERTIFIED.</span>
          </h3>
          <div className="award-list">
            {certificates.map((cert, i) => (
              <button
                key={cert.title}
                className="award-item-btn"
                onClick={() =>
                  onProject({
                    ...cert,
                    type: 'image',
                    media: cert.image,
                    category: 'Certification',
                    description: `${cert.title} (${cert.year}) — Shiksha Nand.`
                  })
                }
                aria-label={`View certificate for ${cert.title}`}
              >
                <span className="award-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="award-info">
                  <span className="award-name">{cert.title}</span>
                  <small className="award-yr">{cert.year}</small>
                </span>
                <ArrowUpRight size={19} className="award-ic" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
