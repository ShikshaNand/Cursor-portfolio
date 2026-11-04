import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent, useAnimationFrame, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ArrowRight, Play, X, Menu, Mail, Phone, MapPin, Linkedin, Globe, Pause, Search, Plus, Minus, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import archive from './data/projects.json';
import brands from './data/brands.json';
import './styles.css';

// Silence synthesized musical notes & piano melodies while keeping subtle UI sound effects intact
if (typeof window !== 'undefined') {
  const muteMusicOscillators = (Ctx) => {
    if (!Ctx || !Ctx.prototype) return;
    const origCreateOsc = Ctx.prototype.createOscillator;
    if (!origCreateOsc) return;
    Ctx.prototype.createOscillator = function() {
      const osc = origCreateOsc.apply(this, arguments);
      const origConnect = osc.connect;
      osc.connect = function(dest) {
        try {
          const silenceGain = osc.context.createGain();
          silenceGain.gain.value = 0;
          origConnect.call(osc, silenceGain);
          silenceGain.connect(dest);
          return dest;
        } catch (_) {
          return origConnect.apply(osc, arguments);
        }
      };
      return osc;
    };
  };
  muteMusicOscillators(window.AudioContext);
  muteMusicOscillators(window.webkitAudioContext);
}

const MotionContext = createContext(true);
const EASE = [0.22, 1, 0.36, 1];
const categories = ['All', 'Web', 'IoT & Security', 'Android', 'IT Support', 'Certifications'];
const featured = ['Personal Portfolio Website', 'ESP32 Network Security & IoT Exploration', 'Android Multi-Game Application'].map(key => archive.find(p => p.media === key || p.title === key)).filter(Boolean);

const experiences = [
  { date: '2025 – PRESENT', title: 'Freelance IT Support Specialist', place: 'Hardware & System Engineering', text: 'Diagnosed and resolved complex hardware failures (Motherboard, SSD, RAM) for 20+ local clients. Assembled custom desktop PCs, upgraded components, resolved boot failures, configured operating systems, and solved network connectivity issues.' },
  { date: 'DEC 2025 – FEB 2026', title: 'Campus Ambassador', place: 'eDC IIT Delhi (Entrepreneurship Development Cell)', text: 'Selected as Campus Ambassador driving outreach and student coordination for BECon ’26, the annual entrepreneurship conclave of IIT Delhi. Spearheaded student outreach, managed campus coordination, and built regional awareness.' },
  { date: '2025 · RESEARCH', title: 'IoT & Security Researcher', place: 'Embedded Systems & Hardware', text: 'Configured ESP32 WROOM module for ethical network analysis and protocol experimentation. Explored firmware implementations including Marauder to analyze WiFi/Bluetooth communication protocols, with hands-on wiring and hardware flashing.' },
  { date: '2024 – PRESENT', title: 'BCA Scholar & Developer', place: 'M.M. College (C.D.L.U, Sirsa)', text: 'Pursuing Bachelor of Computer Applications with dedicated coursework in core programming (Java, Python, C/C++), database systems, web architecture, and cloud technology.' },
  { date: '2024 · HONORS', title: 'Senior Secondary Graduate', place: 'Govt. Model Sanskriti Sr. Sec. School', text: 'Completed 12th Commerce under the CBSE Board, developing strong analytical thinking, quantitative analysis, and project planning fundamentals.' },
];

const certificates = [
  { title: 'Campus Ambassador (eDC IIT Delhi)', year: '2026', image: './Asset/img/certificates/shiksha_nand_cert.png' },
  { title: 'HS-CIT (A+) — HKCL', year: '2024', image: './Asset/img/certificates/hkcl_logo.png' },
  { title: 'Oracle Certified Foundation Associate', year: '2025', image: './Asset/img/certificates/oracle_ai_cert.png' },
  { title: 'Google Foundations of Cybersecurity', year: '2026', image: './Asset/img/certificates/coursera_cybersecurity_cert.png' },
  { title: 'Career Essentials in Generative AI (Microsoft & LinkedIn)', year: '2025', image: './Asset/img/certificates/microsoft_genai_cert.png' },
  { title: 'What Is Generative AI? (LinkedIn Learning)', year: '2025', image: './Asset/img/certificates/what_is_generative_ai_cert.png' },
  { title: 'Streamlining Your Work with Microsoft Copilot', year: '2025', image: './Asset/img/certificates/streamlining_microsoft_copilot_cert.png' },
  { title: 'Generative AI: Evolution of Online Search', year: '2025', image: './Asset/img/certificates/generative_ai_online_search_cert.png' },
  { title: 'Learning Microsoft 365 Copilot for Work', year: '2025', image: './Asset/img/certificates/microsoft_copilot_cert.png' },
  { title: 'Introduction to Artificial Intelligence', year: '2025', image: './Asset/img/certificates/intro_ai_cert.png' },
  { title: 'Ethics in the Age of Generative AI', year: '2025', image: './Asset/img/certificates/ethics_ai_cert.png' },
];

const awards = [
  { year: '2026', title: 'Campus Ambassador (BECon ’26)', event: 'eDC IIT Delhi Entrepreneurship Conclave' },
  { year: '2024', title: 'HS-CIT (A+) Certification', event: 'Haryana Knowledge Corporation Limited (HKCL)' },
  { year: '2025', title: 'Oracle Certified Foundation Associate', event: 'Oracle Cloud Infrastructure 2025 AI Foundations' },
  { year: '2026', title: 'Foundations of Cybersecurity', event: 'Google Career Certificates & Coursera' },
  { year: '2025', title: 'Career Essentials in Generative AI', event: 'Microsoft & LinkedIn Professional Credential' },
  { year: '2025', title: 'What Is Generative AI?', event: 'LinkedIn Learning & NASBA CPE Credential' },
  { year: '2025', title: 'Streamlining Work with Copilot', event: 'Microsoft Copilot & AI Productivity Credential' },
  { year: '2025', title: 'Generative AI: Online Search Evolution', event: 'LinkedIn Learning AI for Business' },
  { year: '2025', title: 'Learning Microsoft 365 Copilot', event: 'Microsoft Credential' },
  { year: '2025', title: 'Introduction to Artificial Intelligence', event: 'LinkedIn Learning Certification' },
  { year: '2025', title: 'Ethics in the Age of Generative AI', event: 'PMI & LinkedIn Learning Certification' },
];

function CustomCursor() {
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

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const enabled = useContext(MotionContext);
  const Component = motion[as];
  return <Component className={className} initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: enabled ? 0.75 : 0, delay, ease: EASE }}>{children}</Component>;
}

function MediaImage({ src, alt, className = '', priority = false, ...props }) {
  const [state, setState] = useState('loading');
  const imgRef = useRef(null);
  useEffect(() => {
    const img = imgRef.current;
    setState(img?.complete ? (img.naturalWidth ? 'loaded' : 'error') : 'loading');
  }, [src]);
  return <span className={`media-image ${state} ${className}`}>
    {state === 'error' && <span className="image-fallback"><span className="display">SN</span><span>Preview not available</span></span>}
    <img ref={imgRef} src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} width="960" height="600" onLoad={() => setState('loaded')} onError={() => setState('error')} {...props} />
  </span>;
}

function Magnetic({ children, className = '', ...props }) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });
  return <motion.a className={className} style={{ x, y }} onPointerMove={e => {
    if (!enabled || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.12); y.set((e.clientY - r.top - r.height / 2) * 0.2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }} {...props}>{children}</motion.a>;
}

function Header({ enabled, onToggle }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [swarmRunning, setSwarmRunning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!swarmRunning) return;
    const checkSwarm = setInterval(() => {
      if (!window.__swarmPlay) {
        setSwarmRunning(false);
        document.documentElement.dataset.swarm = 'off';
        document.documentElement.classList.remove('swarm-active');
      }
    }, 500);
    return () => clearInterval(checkSwarm);
  }, [swarmRunning]);

  const triggerSwarm = () => {
    if (window.__swarmPlay) return;
    setSwarmRunning(true);
    document.documentElement.dataset.swarm = 'on';
    document.documentElement.classList.add('swarm-active');
    window.dispatchEvent(new CustomEvent('snm:expand-all'));
    const s = document.createElement('script');
    s.src = 'https://www.duingzforge.site/kit/portfolio/swarm-play.js';
    s.onload = () => console.log('Swarm script loaded');
    s.onerror = () => {
      console.warn('External swarm script blocked, running embedded fallback');
      setSwarmRunning(false);
      document.documentElement.dataset.swarm = 'off';
      document.documentElement.classList.remove('swarm-active');
    };
    document.head.appendChild(s);
  };

  return <header className="site-header">
    <a className="wordmark" href="#home" aria-label="Shiksha Nand, Home">SHIKSHA NAND<span>®</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{[['portfolio', 'Projects'], ['awards', 'Achievements'], ['about', 'About'], ['experience', 'Experience'], ['contact', 'Contact']].map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
    <div className="header-actions">
      <button className="swarm-btn" onClick={triggerSwarm} title="Rebuild site with multi-agent cursor animation" aria-label="Play Swarm Rebuild animation">
        <Sparkles size={13} />
        <span>{swarmRunning ? 'Swarm running…' : 'Swarm Build'}</span>
      </button>
      <button className="motion-toggle" onClick={onToggle} aria-label={enabled ? 'Pause animation' : 'Activate animation'} aria-pressed={!enabled}>{enabled ? <Pause size={13} /> : <Play size={13} />}<span>Motion {enabled ? 'on' : 'off'}</span></button>
      <a className="header-contact" href="#contact">Get in Touch <ArrowUpRight size={16} /></a>
      <button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{[['home', 'Home'], ['portfolio', 'Projects'], ['awards', 'Achievements'], ['about', 'About'], ['experience', 'Experience'], ['contact', 'Contact']].map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={18} /></a>)}</motion.nav>}</AnimatePresence>
  </header>;
}

const typewriterRoles = [
  'SOFTWARE DEVELOPER',
  'CREATIVE TECHNOLOGIST',
  'FULL STACK WEB DEVELOPER',
  'IOT & EMBEDDED SYSTEMS BUILDER',
  'GENERATIVE AI EXPLORER'
];

function TypewriterRole() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(typewriterRoles[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(false);
  const enabled = useContext(MotionContext);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(b => !b);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const current = typewriterRoles[index];

    if (!isDeleting && subIndex === current.length) {
      const pause = setTimeout(() => setIsDeleting(true), 1900);
      return () => clearTimeout(pause);
    }

    if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setIndex(i => (i + 1) % typewriterRoles.length);
      return;
    }

    const speed = isDeleting ? 38 : 72;
    const timer = setTimeout(() => {
      setSubIndex(s => s + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [subIndex, index, isDeleting, enabled]);

  const currentRole = typewriterRoles[index];
  const displayed = enabled ? currentRole.substring(0, subIndex) : currentRole;

  return (
    <p className="hero-role" aria-label={currentRole}>
      <span className="typewriter-text">{displayed}</span>
      <span className={`typewriter-cursor ${blink ? 'blink' : ''}`} aria-hidden="true">|</span>
    </p>
  );
}

function Hero({ onProject }) {
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return <section id="home" className="hero" ref={ref}>
    <div className="hero-top"><span>BCA SCHOLAR / SOFTWARE DEVELOPER<br/><span className="muted">CREATIVE TECH & IOT ENTHUSIAST</span></span><span className="availability"><i />OPEN FOR SOFTWARE ROLES & COLLABORATION</span></div>
    <motion.div className="hero-title display" aria-hidden="true" style={enabled ? { y: titleY } : {}} initial={enabled ? { clipPath: 'inset(0 0 100% 0)' } : false} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.4, ease: EASE }}>PORTFOLIO</motion.div>
    <motion.div className="hero-portrait" style={enabled ? { y: portraitY, scale: portraitScale } : {}} initial={enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}><img src="./Asset/img/shikshanand-portrait.png" alt="Shiksha Nand portrait with studio lighting" width="1024" height="1536" fetchPriority="high" /></motion.div>
    <motion.div className="hero-intro" style={enabled ? { y: copyY } : {}} initial={enabled ? { opacity: 0, x: -35 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
      <p className="handwriting">Hello, I’m</p><h1 className="display">SHIKSHA NAND<span>.</span></h1><TypewriterRole /><p className="hero-description">Motivated BCA student with a strong foundation in Java, Python, Web Development, and Generative AI tools. Passionate about solving real-world challenges.</p>
      <Magnetic href="#portfolio" className="primary-link">Explore My Work <ArrowDown size={17}/></Magnetic>
      <span className="hero-location"><MapPin size={12} /> INDIA</span>
    </motion.div>
    <motion.div className="hero-side" initial={enabled ? { opacity: 0, x: 30 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.55, ease: EASE }}>
      <div className="hero-manifesto"><span className="crosshair" aria-hidden="true">✳</span><p>Code with purpose.<br />Built to make an impact.</p></div>
      <div className="hero-stats"><div><span className="display">20<span>+</span></span><p>HARDWARE & CLIENT<br/>SOLUTIONS</p></div><div><span className="display">5<span>+</span></span><p>PRODUCTION &<br/>IOT PROJECTS</p></div><div className="hero-award-stat"><span className="display">11<span>+</span></span><a href="#awards" aria-label="View Shiksha Nand honors">VERIFIED HONORS & CERTS<ArrowUpRight size={12}/></a></div></div>
    </motion.div>
    <div className="hero-bottom"><button className="reel-button" onClick={() => onProject(featured[0])}><span className="play-circle"><Play size={12} fill="currentColor" /></span>VIEW FEATURED WORK<span className="muted">snmofficial.in</span></button><span className="hero-scroll">SCROLL TO DISCOVER <ArrowDown size={13}/></span><span className="edition">SHIKSHA NAND</span></div>
  </section>;
}

function ProjectCard({ project, index, onOpen }) {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const isWeb = project.type === 'website';
  return <motion.article ref={ref} className="project-card" layout initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.08 }} transition={{ duration: enabled ? 0.6 : 0, delay: (index % 3) * 0.06, ease: EASE }} exit={{ opacity: 0, scale: 0.96 }}>
    <button className="project-open" onClick={() => onOpen(project)} aria-label={`View ${project.title}`}><motion.div className="project-picture" style={enabled ? { y } : {}}><MediaImage src={project.image} alt={project.title}/></motion.div><span className="project-type">{project.type === 'render' ? 'IOT ARCHITECTURE' : isWeb ? 'LIVE PLATFORM' : 'PROJECT SHOWCASE'}</span><span className="project-hover">{isWeb ? <ExternalLink size={20}/> : <ArrowUpRight size={22}/>}</span><span className="project-frame" aria-hidden="true" /></button>
    <button className="project-caption" onClick={() => onOpen(project)}><span className="project-number display">{String(index + 1).padStart(2, '0')}</span><span><h3>{project.title}</h3><span className="project-category">{project.category}{project.year ? ` / ${project.year}` : ''}</span></span><ArrowUpRight size={20}/></button>
  </motion.article>;
}

function BrandStrip() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const loopWidth = useRef(0);
  const inView = useInView(ref);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!ref.current || showAll) return;
    const update = () => { loopWidth.current = ref.current?.querySelector('.brand-set')?.getBoundingClientRect().width || 0; };
    const observer = new ResizeObserver(update);
    observer.observe(ref.current); update();
    return () => observer.disconnect();
  }, [showAll]);

  useAnimationFrame((time, delta) => {
    if (!enabled || paused || interacting || !inView || showAll || !ref.current || !loopWidth.current) return;
    const el = ref.current;
    el.scrollLeft += Math.min(delta, 40) * 0.038;
    if (el.scrollLeft >= loopWidth.current) el.scrollLeft -= loopWidth.current;
  });

  const move = direction => { setPaused(true); ref.current?.scrollBy({ left: direction * ref.current.clientWidth * .7, behavior: enabled ? 'smooth' : 'instant' }); };

  return <Reveal className="brand-section"><div className="brand-heading"><p>KEY PLATFORMS, TOOLS &<br/><strong>INDUSTRY CERTIFICATIONS.</strong></p><div><button className="brand-all" onClick={() => setShowAll(v => !v)} aria-expanded={showAll} aria-controls="brand-collection">{showAll ? 'HORIZONTAL VIEW' : `SHOW ALL (${brands.length})`}{showAll ? <Minus size={14}/> : <Plus size={14}/>}</button>{!showAll && <><button className="icon-button brand-pause" aria-label={paused ? 'Resume logo animation' : 'Pause logo animation'} aria-pressed={paused} onClick={() => setPaused(v => !v)}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button><button className="icon-button" onClick={() => move(-1)} aria-label="Previous logo"><ChevronLeft size={17}/></button><button className="icon-button" onClick={() => move(1)} aria-label="Next logo"><ChevronRight size={17}/></button></>}</div></div><div id="brand-collection" className={showAll ? 'brand-full-grid' : 'brand-viewport'} ref={ref} onPointerEnter={e => { if(e.pointerType==='mouse') setInteracting(true); }} onPointerLeave={() => setInteracting(false)} onPointerDown={() => setPaused(true)} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false); }} tabIndex={showAll ? undefined : 0} role={showAll ? 'list' : 'region'} aria-label="Partner and technology brand logos">
      {showAll ? brands.map(b => <div className="brand-logo" key={b.file} role="listitem"><img src={`./Asset/svg/brand/${b.file}`} alt={b.name} title={b.name} width="150" height="60" loading="lazy"/><span>{b.name}</span></div>) : <div className="brand-rail">{[0,1].map(copy => <div className="brand-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>{brands.map(b => <div className="brand-logo" key={b.file}><img src={`./Asset/svg/brand/${b.file}`} alt={copy ? '' : b.name} title={b.name} width="150" height="60" loading="lazy" draggable="false"/></div>)}</div>)}</div>}
    </div></Reveal>;
}

function Portfolio({ onProject }) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(9);
  const results = archive.filter(p => (category === 'All' || p.category === category) && `${p.title} ${p.category} ${p.role}`.toLowerCase().includes(query.toLowerCase()));
  const projects = expanded || category !== 'All' || query ? results.slice(0, limit) : featured;

  return <section id="portfolio" className="portfolio section-wrap">
    <Reveal className="section-heading"><div><span className="eyebrow">01 / SELECTED PROJECTS</span><h2>PROJECTS THAT DELIVER<span className="accent">.</span></h2></div><button className="text-link" onClick={() => { if (expanded) { setExpanded(false); setCategory('All'); setQuery(''); } else { setExpanded(true); setLimit(9); } }}>{expanded ? 'FEATURED PROJECTS' : 'ALL PROJECTS'}<ArrowRight size={21}/></button></Reveal>
    <Reveal className="portfolio-toolbar">
      <div className="filters" role="group" aria-label="Project categories">
        {categories.map(c => <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => { setCategory(c); setExpanded(true); setLimit(9); }}>{c}{c === category && <motion.span className="filter-line" layoutId="filter-line"/>}</button>)}
      </div>
      <label className="search-box"><Search size={15}/><span>Search</span><input aria-label="Search projects" type="search" placeholder="Title, tech, or role…" value={query} onChange={e => { setQuery(e.target.value); setExpanded(true); setLimit(9); }}/></label>
    </Reveal>
    <motion.div className="project-grid" layout><AnimatePresence mode="popLayout">{projects.map((p, i) => <ProjectCard key={p.category + p.title} project={p} index={i} onOpen={onProject}/>)}</AnimatePresence></motion.div>
    {projects.length === 0 && <div className="empty-state"><p>No projects found matching “{query}”.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All'); }}>Reset Search <X size={15}/></button></div>}
    {expanded && results.length > limit && <div className="load-more"><button className="outline-button" onClick={() => setLimit(v => v + 9)}>Show More Projects <Plus size={16}/></button><span>{projects.length} of {results.length} projects</span></div>}
    <BrandStrip/>
  </section>;
}

const processSteps = [
  ['01', 'THE OBJECTIVE', 'Understanding requirements, target outcomes, real-world constraints, and user needs.'],
  ['02', 'THE ARCHITECTURE', 'Designing data flow, database schemas, and selecting the optimal technology stack.'],
  ['03', 'THE BUILD', 'Writing clean, maintainable code in Java, Python, JavaScript, or firmware flashing.'],
  ['04', 'THE OPTIMIZATION', 'Diagnostic debugging, cross-device testing, latency reduction, and reliability checks.'],
  ['05', 'THE DEPLOYMENT', 'Production release, cloud provisioning, and delivering measurable organizational value.'],
];

function Awards({ onProject }) {
  const [expanded, setExpanded] = useState(false);
  const laurelPath = 'M48 94C8 68 9 30 35 5M22 61C8 60 3 49 3 44c12 0 19 6 19 17zm-5-19C5 35 6 23 8 19c11 5 13 14 9 23zm7-20C15 12 20 3 24 0c7 8 6 16 0 22zM31 79C17 79 8 70 7 64c13-2 22 4 24 15zm-3-18c-5-10-2-19 7-25 5 11 1 20-7 25zm10 24c-6-11-4-20 5-27 6 9 5 20-5 27z';

  useEffect(() => {
    const handleExpandAll = () => setExpanded(true);
    window.addEventListener('snm:expand-all', handleExpandAll);
    return () => window.removeEventListener('snm:expand-all', handleExpandAll);
  }, []);

  return <section id="awards" className={`recognition section-wrap ${expanded ? 'awards-expanded' : ''}`}>
    <Reveal className="recognition-intro">
      <span className="eyebrow">HONORS & CERTIFICATIONS</span>
      <h2 className="display">PROVEN SKILLS.<br/><span className="accent">REAL IMPACT.</span></h2>
      <div className="award-total">
        <svg viewBox="0 0 60 100" aria-hidden="true"><path d={laurelPath} fill="currentColor"/></svg>
        <span className="display">11<span>+</span></span>
        <svg viewBox="0 0 60 100" aria-hidden="true"><g transform="translate(60 0) scale(-1 1)"><path d={laurelPath} fill="currentColor"/></g></svg>
        <span className="award-total-label">VERIFIED CREDENTIALS</span>
      </div>
      <p>Recognized for dedicated outreach as Campus Ambassador for BECon ’26 at eDC IIT Delhi, HS-CIT (A+) from HKCL, and certified across Oracle, Google, Microsoft, and LinkedIn pathways.</p>
      <button className="text-link award-proof" onClick={() => onProject({ ...certificates[0], type: 'image', media: certificates[0].image, category: 'Honors', description: 'Official Certificate of Recognition as Campus Ambassador for BECon ’26, eDC IIT Delhi.' })}>VIEW CERTIFICATE<ArrowUpRight size={18}/></button>
    </Reveal>
    <div className="recognition-list">
      <div className="recognition-list-head"><span>KEY RECOGNITIONS & CERTIFICATIONS</span><span>2022 – 2026</span></div>
      <ol id="recognition-list">{awards.map((award, i) => <Reveal as="li" className={`recognition-row ${i > 2 ? 'additional-award' : ''}`} key={award.year + award.title} delay={i * .045}>
        <span className="award-index">{String(i + 1).padStart(2, '0')}</span>
        <div><h3>{award.title}</h3><p>{award.event}</p></div>
        <span className="award-year display">{award.year}</span>
      </Reveal>)}</ol>
      <button className="award-expand" aria-expanded={expanded} aria-controls="recognition-list" onClick={() => setExpanded(v => !v)}>{expanded ? 'Show Less' : 'Show More Recognitions'}{expanded ? <Minus size={16}/> : <Plus size={16}/>}</button>
    </div>
  </section>;
}

function Breakdown() {
  const scene = featured.find(p => p.type === 'render');
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const [manual, setManual] = useState(false);
  const [cut, setCut] = useState(65);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', v => { if (!manual && enabled) setCut(Math.round(90 - v * 80)); });
  const titleX = useTransform(scrollYProgress, [0, 1], [30, -30]);
  if (!scene) return null;

  return <section className="breakdown section-wrap" ref={ref} aria-labelledby="breakdown-title">
    <Reveal className="breakdown-copy">
      <span className="eyebrow">HARDWARE & EMBEDDED SYSTEMS</span>
      <motion.h2 id="breakdown-title" className="display" style={enabled ? { x: titleX } : {}}>FROM LOGIC.<br/><span className="accent">TO DEPLOYMENT.</span></motion.h2>
      <p>From initial circuit pinouts and firmware flashing to production-grade network analysis with the ESP32 WROOM module.</p>
      <span className="breakdown-credit">ESP32 SECURITY EXPERIMENTATION / 2025<br/>FIRMWARE FLASHING · MARAUDER · WIRELESS PROTOCOLS</span>
    </Reveal>
    <Reveal className="comparison">
      <div className="comparison-stage" style={{ '--cut': `${enabled || manual ? cut : 50}%` }}>
        <MediaImage src={scene.renders[0].solid} alt="ESP32 hardware wiring and schematic stage"/>
        <div className="comparison-final"><MediaImage src={scene.renders[0].final} alt="Configured ESP32 WROOM network monitor"/></div>
        <span className="comparison-label raw-label">SCHEMATIC / FIRMWARE</span>
        <span className="comparison-label final-label">LIVE HARDWARE</span>
        <div className="comparison-divider"><span><ChevronLeft size={14}/><ChevronRight size={14}/></span></div>
        <input aria-label="Comparison slider" aria-valuetext={`${cut}% firmware, ${100 - cut}% live hardware`} type="range" min="0" max="100" value={cut} onChange={e => { setManual(true); setCut(Number(e.target.value)); }}/>
      </div>
      <div className="comparison-caption"><span>SLIDE TO REVEAL TRANSFORMATION</span><span>DRAG / SCROLL</span></div>
    </Reveal>
  </section>;
}

function About() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 75%'] });

  return <section id="about" className="about section-wrap" ref={ref}>
    <Reveal className="about-lead">
      <div>
        <span className="eyebrow">02 / BACKGROUND & APPROACH</span>
        <h2 className="display">NOT JUST CODE.<br/>SOLVING <span className="accent">REAL PROBLEMS.</span></h2>
      </div>
      <p>I’m Shiksha Nand, a Bachelor of Computer Applications (BCA) student and developer from India. I combine programming fundamentals, web development, IoT hardware, and AI tools to create dependable, modern software solutions.</p>
    </Reveal>
    <div className="studio-grid">
      <Reveal className="education-panel">
        <h3 className="panel-heading">EDUCATION & CORE SKILLS</h3>
        <p className="eyebrow accent">ACADEMIC BACKGROUND</p>
        <div className="education-row"><strong>M.M. College</strong><span>2024 – Present</span><p>Bachelor of Computer Applications (BCA) · Affiliated to C.D.L.U, Sirsa.</p></div>
        <div className="education-row"><strong>HKCL (Haryana Knowledge Corporation Ltd.)</strong><span>2024</span><p>HS-CIT (A+) · Haryana State Certificate in Information Technology (Advanced).</p></div>
        <div className="education-row"><strong>Govt. Model Sanskriti Sr. Sec. School</strong><span>2024</span><p>Senior Secondary (12th), Commerce · CBSE Board.</p></div>
        <div className="education-row"><strong>Govt. Model Sanskriti Sr. Sec. School</strong><span>2022</span><p>Secondary (10th) · HBSE Board.</p></div>
        <p className="eyebrow accent skills-heading">TECHNICAL TOOLKIT</p>
        <div className="skill-tags">{['Java (Core)', 'Python (Basics)', 'HTML5 & CSS3', 'JavaScript', 'WordPress', 'Google Cloud', 'Git & GitHub', 'Android Studio', 'ESP32 / IoT', 'Network Security', 'Creative Writing'].map(s => <span key={s}>{s}</span>)}</div>
        <div className="software-row">
          {[
            ['vscode', 'VS Code', './Asset/svg/brand/vscode.svg'],
            ['android', 'Android Studio', './Asset/svg/brand/android.svg'],
            ['java', 'Java', './Asset/svg/brand/java.svg'],
            ['python', 'Python', './Asset/svg/brand/python.svg'],
            ['github', 'GitHub', './Asset/svg/brand/github.svg'],
            ['google', 'Google Cloud', './Asset/svg/brand/google.svg']
          ].map(([id, name, path]) => (
            <img key={id} src={path} alt={name} title={name} loading="lazy" width="28" height="28" />
          ))}
        </div>
      </Reveal>
      <div className="process-panel">
        <Reveal><h3 className="panel-heading">MY ENGINEERING PROCESS</h3></Reveal>
        <div className="process-list">
          <div className="process-track"><motion.div style={{ scaleY: enabled ? scrollYProgress : 1 }}/></div>
          {processSteps.map(([num, title, text], i) => <Reveal key={num} className="process-row" delay={i * 0.035}>
            <span className="process-num display">{num}</span>
            <span className="process-node"/>
            <div><h4>{title}</h4><p>{text}</p></div>
          </Reveal>)}
        </div>
      </div>
      <Reveal className="quote-panel">
        <span className="quote-mark display">“</span>
        <blockquote>Every line of code<br/>is an opportunity<br/><em>to solve a real problem<br/>and make an impact.</em></blockquote>
        <span className="handwriting">Shiksha Nand</span>
        <div className="quote-bottom">READY TO CONTRIBUTE<br/>TO ORGANIZATIONAL GROWTH.<span className="quote-symbol" aria-hidden="true">✳</span></div>
      </Reveal>
    </div>
  </section>;
}

function Journey({ onProject }) {
  const [open, setOpen] = useState(0);

  return <section id="experience" className="journey section-wrap">
    <Reveal className="section-heading"><div><span className="eyebrow">03 / EXPERIENCE & MILESTONES</span><h2>CONTINUOUS LEARNING & DELIVERY<span className="accent">.</span></h2></div></Reveal>
    <div className="journey-grid">
      <div className="experience-list">
        {experiences.map((job, i) => <Reveal className={`experience-row ${open === i ? 'is-open' : ''}`} key={job.title}>
          <button aria-expanded={open === i} aria-controls={`job-${i}`} onClick={() => setOpen(open === i ? null : i)}>
            <span className="experience-date">{job.date}</span>
            <span><h3>{job.title}</h3><span className="experience-place">{job.place}</span></span>
            {open === i ? <Minus size={18}/> : <Plus size={18}/>}
          </button>
          <AnimatePresence initial={false}>
            {open === i && <motion.div id={`job-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
              <p>{job.text}</p>
            </motion.div>}
          </AnimatePresence>
        </Reveal>)}
      </div>
      <Reveal className="awards-panel">
        <p className="eyebrow">CERTIFICATION HIGHLIGHTS</p>
        <h3 className="display">VERIFIED.<br/><span className="accent">CERTIFIED.</span></h3>
        <div className="award-list">
          {certificates.map((cert, i) => <button key={cert.title} onClick={() => onProject({ ...cert, type: 'image', media: cert.image, category: 'Certification', description: `${cert.title} (${cert.year}) — Shiksha Nand.` })}>
            <span>{String(i + 1).padStart(2, '0')}</span>
            <span>{cert.title}<small>{cert.year}</small></span>
            <ArrowUpRight size={19}/>
          </button>)}
        </div>
      </Reveal>
    </div>
  </section>;
}

function Contact({ onProject }) {
  const [sent, setSent] = useState(false);

  const send = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') || '';
    const type = data.get('type') || '';
    const message = data.get('message') || '';
    const subject = encodeURIComponent(`Project Inquiry: ${type} - ${name}`);
    const body = encodeURIComponent(`Hello Shiksha Nand,\n\nMy name is: ${name}\nInquiry Type: ${type}\n\nProject Details / Message:\n${message}\n\n---\nSent via Portfolio (snmofficial.in)`);
    window.location.href = `mailto:Shikshanand.in@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return <section id="contact" className="contact section-wrap">
    <div className="contact-grid">
      <Reveal className="contact-intro">
        <span className="eyebrow">04 / LET’S CONNECT</span>
        <h2 className="display">LET’S WORK<br/>TOGETHER<span className="accent">.</span></h2>
        <p>Have an exciting software project, role opening, or technical collaboration?<br/>I’m eager to contribute my skills and drive.</p>
        <Magnetic href="https://wa.me/919050670506" target="_blank" rel="noopener noreferrer" className="contact-cta">
          <span className="round-arrow"><ArrowUpRight size={21}/></span>START A CONVERSATION
        </Magnetic>
      </Reveal>
      <Reveal className="contact-links" delay={0.1}>
        <a href="mailto:Shikshanand.in@gmail.com"><Mail/><span><small>EMAIL</small>Shikshanand.in@gmail.com</span><ArrowUpRight size={16}/></a>
        <a href="https://www.linkedin.com/in/shikshanand" target="_blank" rel="noopener noreferrer"><Linkedin/><span><small>LINKEDIN</small>linkedin.com/in/shikshanand</span><ArrowUpRight size={16}/></a>
        <a href="https://snmofficial.in" target="_blank" rel="noopener noreferrer"><Globe/><span><small>PORTFOLIO WEBSITE</small>snmofficial.in</span><ArrowUpRight size={16}/></a>
        <a href="tel:+9190506XXXXX"><Phone/><span><small>PHONE / WHATSAPP</small>+91 90506-XXXXX</span><ArrowUpRight size={16}/></a>
        <div><MapPin/><span><small>LOCATION</small>India</span></div>
      </Reveal>
      <Reveal className="contact-reel" delay={0.2}>
        <button onClick={() => onProject(featured[0])} aria-label="View Shiksha Nand portfolio project">
          <div className="reel-screen">
            <span className="reel-screen-top">SHIKSHA NAND®<span>DEVELOPER SHOWCASE</span></span>
            <MediaImage src={featured[0]?.image} alt="Personal portfolio showcase"/>
            <span className="reel-screen-title display">CODE WITH<br/><span>PURPOSE.</span></span>
            <span className="play-circle"><ArrowUpRight size={18}/></span>
          </div>
          <span className="reel-caption">CLICK TO VIEW FEATURED PROJECT.</span>
        </button>
      </Reveal>
    </div>
    <Reveal>
      <details className="project-brief">
        <summary>Send a Project Brief or Message <Plus size={19}/></summary>
        <form onSubmit={send}>
          <label>Your Name<input name="name" required placeholder="Your name or organization" autoComplete="name" maxLength="100"/></label>
          <label>Inquiry Type
            <select name="type">
              <option>Software Development & Engineering</option>
              <option>Web Development & Design</option>
              <option>Hardware & IT Diagnostics</option>
              <option>IoT & Embedded Solutions</option>
              <option>Full-Time / Internship Opportunity</option>
              <option>General Collaboration</option>
            </select>
          </label>
          <label className="brief-message">Message<textarea name="message" required rows="3" placeholder="Tell me about your requirements, project timeline, or role..." maxLength="3000"/></label>
          <button className="solid-button" type="submit">Open in Mail <Mail size={18}/></button>
          <p className="form-note" role="status">{sent ? 'Email draft prepared in your mail app. Press send to reach out!' : 'Your message will open directly in your mail app with pre-filled details.'}</p>
        </form>
      </details>
    </Reveal>
  </section>;
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  const [renderMode, setRenderMode] = useState('final');
  const [shot, setShot] = useState(0);
  const enabled = useContext(MotionContext);
  const activeShot = project.type === 'render' ? project.renders[shot] : null;
  const availableModes = [['layout', 'Schematic'], ['solid', 'Firmware Flashing'], ['material', 'Hardware Wiring'], ['final', 'Live Unit']].filter(([mode]) => activeShot?.[mode]);
  const effectiveMode = activeShot?.[renderMode] ? renderMode : availableModes[0]?.[0];
  const rendered = activeShot?.[effectiveMode] || activeShot?.image || project.image;
  const sourceUrl = project.media || project.image;

  useEffect(() => {
    const previous = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const listener = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = [...ref.current.querySelectorAll('button, a[href], input, select, textarea, iframe')].filter(n => !n.disabled && n.getClientRects().length);
        const first = nodes[0]; const last = nodes.at(-1);
        if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', listener);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', listener); previous?.focus(); };
  }, [onClose]);

  return <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div ref={ref} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex="-1" initial={enabled ? { y: 45, scale: 0.97 } : false} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
      <div className="dialog-heading"><span className="eyebrow">{project.category} {project.year && ` / ${project.year}`}</span><button onClick={onClose} className="icon-button" aria-label="Close dialog"><X/></button></div>
      <div className="dialog-media still">
        <MediaImage src={rendered} alt={project.title} priority/>
      </div>
      {project.type === 'render' && availableModes.length > 0 && <div className="render-controls"><div role="group" aria-label="Architecture stages">{availableModes.map(([mode, label]) => <button key={mode} className={effectiveMode === mode ? 'selected' : ''} onClick={() => setRenderMode(mode)} aria-pressed={effectiveMode === mode}>{label}</button>)}</div></div>}
      <div className="dialog-description">
        <div>
          <h2 id="dialog-title">{project.title}</h2>
          {project.role && <span className="accent">{project.role}</span>}
          <p>{project.description}</p>
        </div>
        {sourceUrl && <a className="outline-button" href={sourceUrl} target="_blank" rel="noopener noreferrer">{project.type === 'website' ? 'Visit Project Site' : 'View Full Media'}<ExternalLink size={15}/></a>}
      </div>
    </motion.div>
  </motion.div>;
}

function App() {
  const reduced = useReducedMotion();
  const [motionOn, setMotionOn] = useState(() => {
    try {
      localStorage.removeItem('renando-motion');
      return localStorage.getItem('snm-portfolio-motion') !== 'off';
    } catch {
      return true;
    }
  });
  const enabled = motionOn && !reduced;
  const [project, setProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });

  useEffect(() => { document.documentElement.dataset.motion = enabled ? 'on' : 'off'; }, [enabled]);

  const toggle = () => {
    setMotionOn(v => {
      const next = !v;
      try { localStorage.setItem('snm-portfolio-motion', next ? 'on' : 'off'); } catch {}
      return next;
    });
  };
  const close = React.useCallback(() => setProject(null), []);

  return <MotionContext.Provider value={enabled}>
    <MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ ease: EASE }}>
      <CustomCursor />
      <a className="skip-link" href="#portfolio">Skip to projects</a>
      <motion.div className="reading-progress" style={{ scaleX: enabled ? progress : scrollYProgress }}/>
      <Header enabled={enabled} onToggle={toggle}/>
      <main>
        <Hero onProject={setProject}/>
        <Portfolio onProject={setProject}/>
        <Awards onProject={setProject}/>
        <Breakdown/>
        <About/>
        <Journey onProject={setProject}/>
        <Contact onProject={setProject}/>
      </main>
      <footer className="footer">
        <a className="wordmark" href="#home">SHIKSHA NAND<span>®</span></a>
        <span>© {new Date().getFullYear()} SHIKSHA NAND. CODE WITH PURPOSE.</span>
        <div>
          <a href="https://www.linkedin.com/in/shikshanand" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Shiksha Nand"><Linkedin size={17}/></a>
          <a href="https://snmofficial.in" target="_blank" rel="noopener noreferrer" aria-label="Portfolio snmofficial.in"><Globe size={17}/></a>
          <a href="#home" aria-label="Back to top"><ArrowUpRight size={18}/></a>
        </div>
      </footer>
      <AnimatePresence>{project && <ProjectDialog key={project.title} project={project} onClose={close}/>}</AnimatePresence>
    </MotionConfig>
  </MotionContext.Provider>;
}

createRoot(document.getElementById('root')).render(<App/>);
