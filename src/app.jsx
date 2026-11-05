import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail, Linkedin } from 'lucide-react';

import { MotionContext, EASE } from './constants';
import { useTheme } from './hooks/useTheme';
import { CustomCursor } from './components/CustomCursor';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Awards } from './components/Awards';
import { Breakdown } from './components/Breakdown';
import { About } from './components/About';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { ProjectDialog } from './components/ProjectDialog';
import './styles.css';

// Silence synthesized musical notes & piano melodies while keeping subtle UI sound effects intact
if (typeof window !== 'undefined') {
  const muteMusicOscillators = Ctx => {
    if (!Ctx || !Ctx.prototype) return;
    const origCreateOsc = Ctx.prototype.createOscillator;
    if (!origCreateOsc) return;
    Ctx.prototype.createOscillator = function () {
      const osc = origCreateOsc.apply(this, arguments);
      const origConnect = osc.connect;
      osc.connect = function (dest) {
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

function App() {
  const reduced = useReducedMotion();
  const { theme, toggleTheme } = useTheme();

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

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'on' : 'off';
  }, [enabled]);

  const toggleMotion = () => {
    setMotionOn(v => {
      const next = !v;
      try {
        localStorage.setItem('snm-portfolio-motion', next ? 'on' : 'off');
      } catch {}
      return next;
    });
  };

  const closeDialog = useCallback(() => setProject(null), []);

  return (
    <MotionContext.Provider value={enabled}>
      <MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ ease: EASE }}>
        <CustomCursor />
        <a className="skip-link" href="#portfolio">
          Skip to projects
        </a>
        <motion.div className="reading-progress" style={{ scaleX: enabled ? progress : scrollYProgress }} />
        <Header enabled={enabled} onToggle={toggleMotion} theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero onProject={setProject} />
          <Portfolio onProject={setProject} />
          <Awards onProject={setProject} />
          <Breakdown />
          <About />
          <Journey onProject={setProject} />
          <Contact onProject={setProject} />
        </main>
        <footer className="footer">
          <a className="wordmark" href="#home">
            SHIKSHA NAND<span>®</span>
          </a>
          <span>© {new Date().getFullYear()} SHIKSHA NAND. CODE WITH PURPOSE.</span>
          <div>
            <a
              href="https://www.linkedin.com/in/shikshanand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Shiksha Nand"
            >
              <Linkedin size={17} />
            </a>
            <a href="mailto:Shikshanand.in@gmail.com" aria-label="Email Shiksha Nand">
              <Mail size={17} />
            </a>
            <a href="#home" aria-label="Back to top">
              <ArrowUpRight size={18} />
            </a>
          </div>
        </footer>
        <AnimatePresence>
          {project && <ProjectDialog key={project.title} project={project} onClose={closeDialog} />}
        </AnimatePresence>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
