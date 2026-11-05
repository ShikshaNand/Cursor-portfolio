import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { certificates, awards, laurelPath } from '../constants';
import { Reveal } from './Common';

export function Awards({ onProject }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleExpandAll = () => setExpanded(true);
    window.addEventListener('snm:expand-all', handleExpandAll);
    return () => window.removeEventListener('snm:expand-all', handleExpandAll);
  }, []);

  return (
    <section id="awards" className={`recognition section-wrap ${expanded ? 'awards-expanded' : ''}`}>
      <Reveal className="recognition-intro">
        <span className="eyebrow">HONORS & CERTIFICATIONS</span>
        <h2 className="display">
          PROVEN SKILLS.
          <br />
          <span className="accent">REAL IMPACT.</span>
        </h2>
        <div className="award-total">
          <svg viewBox="0 0 60 100" aria-hidden="true">
            <path d={laurelPath} fill="currentColor" />
          </svg>
          <span className="display">
            11<span>+</span>
          </span>
          <svg viewBox="0 0 60 100" aria-hidden="true">
            <g transform="translate(60 0) scale(-1 1)">
              <path d={laurelPath} fill="currentColor" />
            </g>
          </svg>
          <span className="award-total-label">VERIFIED CREDENTIALS</span>
        </div>
        <p>
          Recognized for dedicated outreach as Campus Ambassador for BECon ’26 at eDC IIT Delhi, HS-CIT (A+) from HKCL, and certified across Oracle, Google, Microsoft, and LinkedIn pathways.
        </p>
        <button
          className="text-link award-proof"
          onClick={() =>
            onProject({
              ...certificates[0],
              type: 'image',
              media: certificates[0].image,
              category: 'Honors',
              description: 'Official Certificate of Recognition as Campus Ambassador for BECon ’26, eDC IIT Delhi.'
            })
          }
        >
          VIEW CERTIFICATE
          <ArrowUpRight size={18} />
        </button>
      </Reveal>
      <div className="recognition-list">
        <div className="recognition-list-head">
          <span>KEY RECOGNITIONS & CERTIFICATIONS</span>
        </div>
        <ol id="recognition-list">
          {awards.map((award, i) => (
            <Reveal
              as="li"
              className={`recognition-row ${i > 2 ? 'additional-award' : ''}`}
              key={award.year + award.title}
              delay={i * 0.045}
              onClick={() => {
                const cert = certificates[i];
                if (cert) {
                  onProject({
                    ...cert,
                    type: 'image',
                    media: cert.image,
                    category: 'Verified Credential',
                    description: `${award.title} — Issued by ${award.event} (${award.year}). Verified credential in Shiksha Nand's academic & professional portfolio.`
                  });
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const cert = certificates[i];
                  if (cert) {
                    onProject({
                      ...cert,
                      type: 'image',
                      media: cert.image,
                      category: 'Verified Credential',
                      description: `${award.title} — Issued by ${award.event} (${award.year}). Verified credential in Shiksha Nand's academic & professional portfolio.`
                    });
                  }
                }
              }}
              aria-label={`View certificate for ${award.title}`}
            >
              <span className="award-index">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{award.title}</h3>
                <p>{award.event}</p>
              </div>
              <span className="award-year display">{award.year}</span>
            </Reveal>
          ))}
        </ol>
        <button
          className="award-expand"
          aria-expanded={expanded}
          aria-controls="recognition-list"
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? 'Show Less' : 'Show More Recognitions'}
          {expanded ? <Minus size={16} /> : <Plus size={16} />}
        </button>
      </div>
    </section>
  );
}
