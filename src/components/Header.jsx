import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Pause, X, Menu, Sparkles, Sun, Moon } from 'lucide-react';

export function Header({ enabled, onToggle, theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [swarmRunning, setSwarmRunning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-15% 0px -65% 0px' }
    );
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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

  const navLinks = [
    ['portfolio', 'Projects'],
    ['awards', 'Achievements'],
    ['about', 'About'],
    ['experience', 'Experience'],
    ['contact', 'Contact']
  ];

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Shiksha Nand, Home">
        SHIKSHA NAND<span>®</span>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
        <button
          className="swarm-btn"
          onClick={triggerSwarm}
          title="Rebuild site with multi-agent cursor animation"
          aria-label="Play Swarm Rebuild animation"
        >
          <Sparkles size={13} />
          <span>{swarmRunning ? 'Swarm running…' : 'Swarm Build'}</span>
        </button>
        <button
          className="motion-toggle"
          onClick={onToggle}
          aria-label={enabled ? 'Pause animation' : 'Activate animation'}
          aria-pressed={!enabled}
        >
          {enabled ? <Pause size={13} /> : <Play size={13} />}
          <span>Motion {enabled ? 'on' : 'off'}</span>
        </button>
        <a className="header-contact" href="#contact">
          Get in Touch <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle icon-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="mobile-menu-toolbar">
              <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button className="motion-toggle" onClick={onToggle} aria-label="Toggle motion">
                {enabled ? <Pause size={14} /> : <Play size={14} />}
                <span>Motion {enabled ? 'on' : 'off'}</span>
              </button>
            </div>
            {[['home', 'Home'], ...navLinks].map(([id, label], i) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
