import React, { useRef, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Play, MapPin } from 'lucide-react';
import { MotionContext, EASE, featured, typewriterRoles } from '../constants';
import { useTypewriter } from '../hooks/useTypewriter';
import { Magnetic } from './Common';

function TypewriterRole() {
  const { displayText, blink } = useTypewriter(typewriterRoles);

  return (
    <p className="hero-role" aria-label="Professional roles">
      <span className="typewriter-text">{displayText}</span>
      <span className={`typewriter-cursor ${blink ? 'blink' : ''}`} aria-hidden="true">
        |
      </span>
    </p>
  );
}

export function Hero({ onProject }) {
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-top">
        <span>
          BCA SCHOLAR / SOFTWARE DEVELOPER
          <br />
          <span className="muted">CREATIVE TECH & IOT ENTHUSIAST</span>
        </span>
        <span className="availability">
          <i />
          OPEN FOR SOFTWARE ROLES & COLLABORATION
        </span>
      </div>
      <motion.div
        className="hero-title display"
        aria-hidden="true"
        style={enabled ? { y: titleY } : {}}
        initial={enabled ? { clipPath: 'inset(0 0 100% 0)' } : false}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        PORTFOLIO
      </motion.div>
      <motion.div
        className="hero-portrait"
        style={enabled ? { y: portraitY, scale: portraitScale } : {}}
        initial={enabled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <img
          src="./Asset/img/shikshanand-portrait.webp"
          alt="Shiksha Nand portrait with studio lighting"
          width="1024"
          height="1536"
          fetchPriority="high"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './Asset/img/shikshanand-portrait.png';
          }}
        />
      </motion.div>
      <motion.div
        className="hero-intro"
        style={enabled ? { y: copyY } : {}}
        initial={enabled ? { opacity: 0, x: -35 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      >
        <p className="handwriting">Hello, I’m</p>
        <h1 className="display">
          SHIKSHA NAND<span>.</span>
        </h1>
        <TypewriterRole />
        <p className="hero-description">
          Motivated BCA student with a strong foundation in Java, Python, Web Development, and Generative AI tools. Passionate about solving real-world challenges.
        </p>
        <Magnetic href="#portfolio" className="primary-link">
          Explore My Work <ArrowDown size={17} />
        </Magnetic>
        <span className="hero-location">
          <MapPin size={12} /> INDIA
        </span>
      </motion.div>
      <motion.div
        className="hero-side"
        initial={enabled ? { opacity: 0, x: 30 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.55, ease: EASE }}
      >
        <div className="hero-manifesto">
          <span className="crosshair" aria-hidden="true">
            ✳
          </span>
          <p>
            Code with purpose.
            <br />
            Built to make an impact.
          </p>
        </div>
        <div className="hero-stats">
          <div>
            <span className="display">
              20<span>+</span>
            </span>
            <p>
              HARDWARE & CLIENT
              <br />
              SOLUTIONS
            </p>
          </div>
          <div>
            <span className="display">
              5<span>+</span>
            </span>
            <p>
              PRODUCTION &<br />
              IOT PROJECTS
            </p>
          </div>
          <div className="hero-award-stat">
            <span className="display">
              11<span>+</span>
            </span>
            <a href="#awards" aria-label="View Shiksha Nand honors">
              VERIFIED HONORS & CERTS
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </motion.div>
      <div className="hero-bottom">
        <button className="reel-button" onClick={() => onProject(featured[0])}>
          <span className="play-circle">
            <Play size={12} fill="currentColor" />
          </span>
          VIEW FEATURED WORK
        </button>
        <span className="hero-scroll">
          SCROLL TO DISCOVER <ArrowDown size={13} />
        </span>
        <span className="edition">SHIKSHA NAND</span>
      </div>
    </section>
  );
}
