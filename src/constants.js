import { createContext } from 'react';
import archive from './data/projects.json';

export const MotionContext = createContext(true);

export const EASE = [0.22, 1, 0.36, 1];

export const categories = ['All', 'Web', 'IoT & Security', 'Android', 'IT Support', 'Certifications'];

export const featured = [
  'Personal Portfolio Website',
  'ESP32 Network Security & IoT Exploration',
  'Android Multi-Game Application'
].map(key => archive.find(p => p.media === key || p.title === key)).filter(Boolean);

export const experiences = [
  {
    date: '2025 – PRESENT',
    title: 'Freelance IT Support Specialist',
    place: 'Hardware & System Engineering',
    text: 'Diagnosed and resolved complex hardware failures (Motherboard, SSD, RAM) for 20+ local clients. Assembled custom desktop PCs, upgraded components, resolved boot failures, configured operating systems, and solved network connectivity issues.'
  },
  {
    date: 'DEC 2025 – FEB 2026',
    title: 'Campus Ambassador',
    place: 'eDC, IIT Delhi (Entrepreneurship Development Cell)',
    text: 'Selected as Campus Ambassador driving outreach and student coordination for BECon ’26, the annual entrepreneurship conclave of IIT Delhi. Spearheaded student outreach, managed campus coordination, and built regional awareness.'
  },
  {
    date: '2025 · RESEARCH',
    title: 'IoT & Security Researcher',
    place: 'Embedded Systems & Hardware',
    text: 'Configured ESP32 WROOM module for ethical network analysis and protocol experimentation. Explored firmware implementations including Marauder to analyze WiFi/Bluetooth communication protocols, with hands-on wiring and hardware flashing.'
  },
  {
    date: '2024 – PRESENT',
    title: 'BCA Scholar & Developer',
    place: 'M.M. College (C.D.L.U, Sirsa)',
    text: 'Pursuing Bachelor of Computer Applications with dedicated coursework in core programming (Java, Python, C/C++), database systems, web architecture, and cloud technology.'
  },
  {
    date: '2024 · HONORS',
    title: 'Senior Secondary Graduate',
    place: 'Govt. Model Sanskriti Sr. Sec. School',
    text: 'Completed 12th Commerce under the CBSE Board, developing strong analytical thinking, quantitative analysis, and project planning fundamentals.'
  }
];

export const certificates = [
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
  { title: 'Ethics in the Age of Generative AI', year: '2025', image: './Asset/img/certificates/ethics_ai_cert.png' }
];

export const awards = [
  { year: '2026', title: 'Campus Ambassador (BECon ’26)', event: 'eDC, IIT Delhi (Entrepreneurship Development Cell)' },
  { year: '2024', title: 'HS-CIT (A+) Certification', event: 'Haryana Knowledge Corporation Limited (HKCL)' },
  { year: '2025', title: 'Oracle Certified Foundation Associate', event: 'Oracle Cloud Infrastructure 2025 AI Foundations' },
  { year: '2026', title: 'Foundations of Cybersecurity', event: 'Google Career Certificates & Coursera' },
  { year: '2025', title: 'Career Essentials in Generative AI', event: 'Microsoft & LinkedIn Professional Credential' },
  { year: '2025', title: 'What Is Generative AI?', event: 'LinkedIn Learning & NASBA CPE Credential' },
  { year: '2025', title: 'Streamlining Work with Copilot', event: 'Microsoft Copilot & AI Productivity Credential' },
  { year: '2025', title: 'Generative AI: Online Search Evolution', event: 'LinkedIn Learning AI for Business' },
  { year: '2025', title: 'Learning Microsoft 365 Copilot', event: 'Microsoft Credential' },
  { year: '2025', title: 'Introduction to Artificial Intelligence', event: 'LinkedIn Learning Certification' },
  { year: '2025', title: 'Ethics in the Age of Generative AI', event: 'PMI & LinkedIn Learning Certification' }
];

export const typewriterRoles = [
  'SOFTWARE DEVELOPER',
  'CREATIVE TECHNOLOGIST',
  'FULL STACK WEB DEVELOPER',
  'IOT & EMBEDDED SYSTEMS BUILDER',
  'GENERATIVE AI EXPLORER'
];

export const laurelPath = 'M48 94C8 68 9 30 35 5M22 61C8 60 3 49 3 44c12 0 19 6 19 17zm-5-19C5 35 6 23 8 19c11 5 13 14 9 23zm7-20C15 12 20 3 24 0c7 8 6 16 0 22zM31 79C17 79 8 70 7 64c13-2 22 4 24 15zm-3-18c-5-10-2-19 7-25 5 11 1 20-7 25zm10 24c-6-11-4-20 5-27 6 9 5 20-5 27z';
