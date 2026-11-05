import React, { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useAnimationFrame } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ExternalLink, Search, X, Plus, Minus, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import archive from '../data/projects.json';
import brands from '../data/brands.json';
import { MotionContext, EASE, categories, featured } from '../constants';
import { Reveal, MediaImage } from './Common';

function ProjectCard({ project, index, onOpen }) {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const isWeb = project.type === 'website';

  return (
    <motion.article
      ref={ref}
      className="project-card"
      layout
      initial={enabled ? { opacity: 0, y: 32 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.08 }}
      transition={{ duration: enabled ? 0.6 : 0, delay: (index % 3) * 0.06, ease: EASE }}
      exit={{ opacity: 0, scale: 0.96 }}
    >
      <button
        className="project-open"
        onClick={() => onOpen(project)}
        aria-label={`View ${project.title}`}
      >
        <motion.div className="project-picture" style={enabled ? { y } : {}}>
          <MediaImage src={project.image} alt={project.title} />
        </motion.div>
        <span className="project-type">
          {project.type === 'render' ? 'IOT ARCHITECTURE' : isWeb ? 'LIVE PLATFORM' : 'PROJECT SHOWCASE'}
        </span>
        <span className="project-hover">
          {isWeb ? <ExternalLink size={20} /> : <ArrowUpRight size={22} />}
        </span>
        <span className="project-frame" aria-hidden="true" />
      </button>
      <button className="project-caption" onClick={() => onOpen(project)}>
        <span className="project-number display">{String(index + 1).padStart(2, '0')}</span>
        <span>
          <h3>{project.title}</h3>
          <span className="project-category">
            {project.category}
            {project.year ? ` / ${project.year}` : ''}
          </span>
        </span>
        <ArrowUpRight size={20} />
      </button>
    </motion.article>
  );
}

function BrandStrip() {
  const enabled = useContext(MotionContext);
  const viewportRef = useRef(null);
  const scrollPos = useRef(0);
  const [paused, setPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useAnimationFrame((time, delta) => {
    if (!enabled || paused || isHovered || showAll || !viewportRef.current) return;
    const el = viewportRef.current;
    const set = el.querySelector('.brand-set');
    const setWidth = set ? set.scrollWidth || set.offsetWidth : 0;
    if (setWidth <= 0) return;

    const clampedDelta = Math.min(delta, 50);
    scrollPos.current += clampedDelta * 0.055;
    if (scrollPos.current >= setWidth) {
      scrollPos.current -= setWidth;
    }
    el.scrollLeft = scrollPos.current;
  });

  const handleScroll = () => {
    if (viewportRef.current && (paused || isHovered)) {
      const set = viewportRef.current.querySelector('.brand-set');
      const setWidth = set ? set.scrollWidth || set.offsetWidth : 0;
      if (setWidth > 0) {
        scrollPos.current = viewportRef.current.scrollLeft % setWidth;
      }
    }
  };

  const move = direction => {
    if (!viewportRef.current) return;
    const el = viewportRef.current;
    const set = el.querySelector('.brand-set');
    const setWidth = set ? set.scrollWidth || set.offsetWidth : 0;
    const step = 280;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
    if (setWidth > 0) {
      scrollPos.current = ((scrollPos.current + direction * step) % setWidth + setWidth) % setWidth;
    }
  };

  return (
    <Reveal className="brand-section">
      <div className="brand-heading">
        <p>
          KEY PLATFORMS, TOOLS &<br />
          <strong>INDUSTRY CERTIFICATIONS.</strong>
        </p>
        <div>
          <button
            className="brand-all"
            onClick={() => setShowAll(v => !v)}
            aria-expanded={showAll}
            aria-controls="brand-collection"
          >
            {showAll ? 'HORIZONTAL VIEW' : `SHOW ALL (${brands.length})`}
            {showAll ? <Minus size={14} /> : <Plus size={14} />}
          </button>
          {!showAll && (
            <>
              <button
                className={`icon-button brand-pause ${paused ? 'is-paused' : ''}`}
                aria-label={paused ? 'Resume logo animation' : 'Pause logo animation'}
                title={paused ? 'Play auto-scroll' : 'Pause auto-scroll'}
                aria-pressed={paused}
                onClick={() => setPaused(v => !v)}
              >
                {paused ? <Play size={13} fill="currentColor" /> : <Pause size={13} fill="currentColor" />}
              </button>
              <button
                className="icon-button"
                onClick={() => move(-1)}
                aria-label="Previous logo"
                title="Scroll backward"
              >
                <ChevronLeft size={17} />
              </button>
              <button
                className="icon-button"
                onClick={() => move(1)}
                aria-label="Next logo"
                title="Scroll forward"
              >
                <ChevronRight size={17} />
              </button>
            </>
          )}
        </div>
      </div>
      <div
        id="brand-collection"
        className={showAll ? 'brand-full-grid' : 'brand-viewport'}
        ref={viewportRef}
        onScroll={handleScroll}
        onPointerEnter={e => {
          if (e.pointerType === 'mouse') setIsHovered(true);
        }}
        onPointerLeave={() => setIsHovered(false)}
        tabIndex={showAll ? undefined : 0}
        role={showAll ? 'list' : 'region'}
        aria-label="Partner and technology brand logos"
      >
        {showAll ? (
          brands.map(b => (
            <div className="brand-logo" key={b.file} role="listitem">
              <img src={`./Asset/svg/brand/${b.file}`} alt={b.name} title={b.name} width="150" height="60" loading="lazy" />
              <span>{b.name}</span>
            </div>
          ))
        ) : (
          <div className="brand-rail">
            {[0, 1, 2].map(copy => (
              <div className="brand-set" key={copy} aria-hidden={copy > 0 ? true : undefined}>
                {brands.map(b => (
                  <div className="brand-logo" key={`${copy}-${b.file}`}>
                    <img
                      src={`./Asset/svg/brand/${b.file}`}
                      alt={copy === 0 ? b.name : ''}
                      title={b.name}
                      width="150"
                      height="60"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function Portfolio({ onProject }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(9);

  const results = archive.filter(
    p =>
      (category === 'All' || p.category === category) &&
      `${p.title} ${p.category} ${p.role}`.toLowerCase().includes(query.toLowerCase())
  );
  const projects = expanded || category !== 'All' || query ? results.slice(0, limit) : featured;

  return (
    <section id="portfolio" className="portfolio section-wrap">
      <Reveal className="section-heading">
        <div>
          <span className="eyebrow">01 / SELECTED PROJECTS</span>
          <h2>
            PROJECTS THAT DELIVER<span className="accent">.</span>
          </h2>
        </div>
        <button
          className="text-link"
          onClick={() => {
            if (expanded) {
              setExpanded(false);
              setCategory('All');
              setQuery('');
            } else {
              setExpanded(true);
              setLimit(9);
            }
          }}
        >
          {expanded ? 'FEATURED PROJECTS' : 'ALL PROJECTS'}
          <ArrowRight size={21} />
        </button>
      </Reveal>
      <Reveal className="portfolio-toolbar">
        <div className="filters" role="group" aria-label="Project categories">
          {categories.map(c => (
            <button
              key={c}
              className={category === c ? 'selected' : ''}
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
                setExpanded(true);
                setLimit(9);
              }}
            >
              {c}
              {c === category && <motion.span className="filter-line" layoutId="filter-line" />}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search size={15} />
          <span>Search</span>
          <input
            aria-label="Search projects"
            type="search"
            placeholder="Title, tech, or role…"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setExpanded(true);
              setLimit(9);
            }}
          />
        </label>
      </Reveal>
      <motion.div className="project-grid" layout>
        <AnimatePresence mode="popLayout">
          {projects.map((p, i) => (
            <ProjectCard key={p.category + p.title} project={p} index={i} onOpen={onProject} />
          ))}
        </AnimatePresence>
      </motion.div>
      {projects.length === 0 && (
        <div className="empty-state">
          <p>No projects found matching “{query}”.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
          >
            Reset Search <X size={15} />
          </button>
        </div>
      )}
      {expanded && results.length > limit && (
        <div className="load-more">
          <button className="outline-button" onClick={() => setLimit(v => v + 9)}>
            Show More Projects <Plus size={16} />
          </button>
          <span>
            {projects.length} of {results.length} projects
          </span>
        </div>
      )}
      <BrandStrip />
    </section>
  );
}
