import React, { useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Plus } from 'lucide-react';
import { featured } from '../constants';
import { Reveal, MediaImage, Magnetic } from './Common';

export function Contact({ onProject }) {
  const [sent, setSent] = useState(false);

  const send = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') || '';
    const type = data.get('type') || '';
    const message = data.get('message') || '';
    const subject = encodeURIComponent(`Project Inquiry: ${type} - ${name}`);
    const body = encodeURIComponent(
      `Hello Shiksha Nand,\n\nMy name is: ${name}\nInquiry Type: ${type}\n\nProject Details / Message:\n${message}\n\n---\nSent via Portfolio`
    );
    window.location.href = `mailto:Shikshanand.in@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="contact section-wrap">
      <div className="contact-grid">
        <Reveal className="contact-intro">
          <span className="eyebrow">04 / LET’S CONNECT</span>
          <h2 className="display">
            LET’S WORK
            <br />
            TOGETHER<span className="accent">.</span>
          </h2>
          <p>
            Have an exciting software project, role opening, or technical collaboration?
            <br />
            I’m eager to contribute my skills and drive.
          </p>
          <Magnetic
            href="mailto:Shikshanand.in@gmail.com?subject=Project%20Inquiry%20-%20Shiksha%20Nand"
            className="contact-cta"
          >
            <span className="round-arrow">
              <ArrowUpRight size={21} />
            </span>
            START A CONVERSATION
          </Magnetic>
        </Reveal>
        <Reveal className="contact-links" delay={0.1}>
          <a href="mailto:Shikshanand.in@gmail.com">
            <Mail />
            <span>
              <small>EMAIL</small>Shikshanand.in@gmail.com
            </span>
            <ArrowUpRight size={16} />
          </a>
          <a href="https://www.linkedin.com/in/shikshanand" target="_blank" rel="noopener noreferrer">
            <Linkedin />
            <span>
              <small>LINKEDIN</small>linkedin.com/in/shikshanand
            </span>
            <ArrowUpRight size={16} />
          </a>
          <a href="tel:+9190506XXXXX">
            <Phone />
            <span>
              <small>PHONE / WHATSAPP</small>+91 90506-XXXXX
            </span>
            <ArrowUpRight size={16} />
          </a>
          <div>
            <MapPin />
            <span>
              <small>LOCATION</small>India
            </span>
          </div>
        </Reveal>
        <Reveal className="contact-reel" delay={0.2}>
          <button onClick={() => onProject(featured[0])} aria-label="View Shiksha Nand portfolio project">
            <div className="reel-screen">
              <span className="reel-screen-top">
                SHIKSHA NAND®<span>DEVELOPER SHOWCASE</span>
              </span>
              <MediaImage src={featured[0]?.image} alt="Personal portfolio showcase" />
              <span className="reel-screen-title display">
                CODE WITH
                <br />
                <span>PURPOSE.</span>
              </span>
              <span className="play-circle">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <span className="reel-caption">CLICK TO VIEW FEATURED PROJECT.</span>
          </button>
        </Reveal>
      </div>
      <Reveal>
        <details className="project-brief">
          <summary>
            Send a Project Brief or Message <Plus size={19} />
          </summary>
          <form onSubmit={send}>
            <label>
              Your Name
              <input name="name" required placeholder="Your name or organization" autoComplete="name" maxLength="100" />
            </label>
            <label>
              Inquiry Type
              <select name="type">
                <option>Software Development & Engineering</option>
                <option>Web Development & Design</option>
                <option>Hardware & IT Diagnostics</option>
                <option>IoT & Embedded Solutions</option>
                <option>Full-Time / Internship Opportunity</option>
                <option>General Collaboration</option>
              </select>
            </label>
            <label className="brief-message">
              Message
              <textarea
                name="message"
                required
                rows="3"
                placeholder="Tell me about your requirements, project timeline, or role..."
                maxLength="3000"
              />
            </label>
            <button className="solid-button" type="submit">
              Open in Mail <Mail size={18} />
            </button>
            <p className="form-note" role="status">
              {sent
                ? 'Email draft prepared in your mail app. Press send to reach out!'
                : 'Your message will open directly in your mail app with pre-filled details.'}
            </p>
          </form>
        </details>
      </Reveal>
    </section>
  );
}
