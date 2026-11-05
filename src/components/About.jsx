import React, { useRef, useContext } from 'react';
import { motion, useScroll } from 'framer-motion';
import { MotionContext } from '../constants';
import { Reveal } from './Common';

const processSteps = [
  ['01', 'THE OBJECTIVE', 'Understanding requirements, target outcomes, real-world constraints, and user needs.'],
  ['02', 'THE ARCHITECTURE', 'Designing data flow, database schemas, and selecting the optimal technology stack.'],
  ['03', 'THE BUILD', 'Writing clean, maintainable code in Java, Python, JavaScript, or firmware flashing.'],
  ['04', 'THE OPTIMIZATION', 'Diagnostic debugging, cross-device testing, latency reduction, and reliability checks.'],
  ['05', 'THE DEPLOYMENT', 'Production release, cloud provisioning, and delivering measurable organizational value.']
];

export function About() {
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 75%'] });

  return (
    <section id="about" className="about section-wrap" ref={ref}>
      <Reveal className="about-lead">
        <div>
          <span className="eyebrow">02 / BACKGROUND & APPROACH</span>
          <h2 className="display">
            NOT JUST CODE.
            <br />
            SOLVING <span className="accent">REAL PROBLEMS.</span>
          </h2>
        </div>
        <p>
          I’m Shiksha Nand, a Bachelor of Computer Applications (BCA) student and developer from India. I combine programming fundamentals, web development, IoT hardware, and AI tools to create dependable, modern software solutions.
        </p>
      </Reveal>
      <div className="studio-grid">
        <Reveal className="education-panel">
          <h3 className="panel-heading">EDUCATION & CORE SKILLS</h3>
          <p className="eyebrow accent">ACADEMIC BACKGROUND</p>
          <div className="education-row">
            <strong>M.M. College</strong>
            <span>2024 – Present</span>
            <p>Bachelor of Computer Applications (BCA) · Affiliated to C.D.L.U, Sirsa.</p>
          </div>
          <div className="education-row">
            <strong>HKCL (Haryana Knowledge Corporation Ltd.)</strong>
            <span>2024</span>
            <p>HS-CIT (A+) · Haryana State Certificate in Information Technology (Advanced).</p>
          </div>
          <div className="education-row">
            <strong>Govt. Model Sanskriti Sr. Sec. School</strong>
            <span>2024</span>
            <p>Senior Secondary (12th), Commerce · CBSE Board.</p>
          </div>
          <div className="education-row">
            <strong>Govt. Model Sanskriti Sr. Sec. School</strong>
            <span>2022</span>
            <p>Secondary (10th) · HBSE Board.</p>
          </div>
          <p className="eyebrow accent skills-heading">TECHNICAL TOOLKIT</p>
          <div className="skill-tags">
            {[
              'Java (Core)',
              'Python (Basics)',
              'HTML5 & CSS3',
              'JavaScript',
              'WordPress',
              'Google Cloud',
              'Git & GitHub',
              'Android Studio',
              'ESP32 / IoT',
              'Network Security',
              'Creative Writing'
            ].map(s => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className="software-row">
            {[
              ['vscode', 'VS Code', './Asset/svg/brand/vscode.svg'],
              ['android', 'Android Studio', './Asset/svg/brand/android.svg'],
              ['java', 'Java', './Asset/svg/brand/java.svg'],
              ['python', 'Python', './Asset/svg/brand/python.svg'],
              ['github', 'GitHub', './Asset/svg/brand/github.svg'],
              ['google', 'Google Cloud', './Asset/svg/brand/google.svg']
            ].map(([id, name, path]) => (
              <div key={id} className="software-item" title={name}>
                <img src={path} alt={name} loading="lazy" width="110" height="32" />
              </div>
            ))}
          </div>
        </Reveal>
        <div className="process-panel">
          <Reveal>
            <h3 className="panel-heading">MY ENGINEERING PROCESS</h3>
          </Reveal>
          <div className="process-list">
            <div className="process-track">
              <motion.div style={{ scaleY: enabled ? scrollYProgress : 1 }} />
            </div>
            {processSteps.map(([num, title, text], i) => (
              <Reveal key={num} className="process-row" delay={i * 0.035}>
                <span className="process-num display">{num}</span>
                <span className="process-node" />
                <div>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="quote-panel">
          <span className="quote-mark display">“</span>
          <blockquote>
            Every line of code
            <br />
            is an opportunity
            <br />
            <em>
              to solve a real problem
              <br />
              and make an impact.
            </em>
          </blockquote>
          <span className="handwriting">Shiksha Nand</span>
          <div className="quote-bottom">
            READY TO CONTRIBUTE
            <br />
            TO ORGANIZATIONAL GROWTH.
            <span className="quote-symbol" aria-hidden="true">
              ✳
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
