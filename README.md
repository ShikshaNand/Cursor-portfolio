# Shiksha Nand — Cinematic Developer Portfolio

<div align="center">

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-snmofficial.in-e32b3c?style=for-the-badge&logo=google-chrome&logoColor=white)](https://snmofficial.in)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Cursor--portfolio-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShikshaNand/Cursor-portfolio)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br/>

**A brutalist, high-performance cinematic personal portfolio built for Shiksha Nand.**  
*BCA Scholar · Campus Ambassador @ eDC IIT Delhi · Hardware & Network Systems Specialist*

</div>

---

## ✦ Overview

This portfolio combines editorial typography, dark cinematic aesthetics, and fluid physics-based micro-interactions to showcase verified technical credentials, open-source projects, and engineering experience.

- **Design Philosophy:** Minimalist cinema dark palette (`#090909`, `#ef4151`, `#f2efeb`) with high-contrast typography (`Anton` display + `Manrope` body).
- **Physics & Motion:** 60fps buttery animations, spring-loaded magnetic cursors, and custom cubic-bezier easing `[0.22, 1, 0.36, 1]`.
- **Zero Heavy Framework Overhead:** Bundled via `esbuild` into high-speed static production assets (`Asset/dist/app.js` + `Asset/dist/app.css`).
- **Automated Asset Sync:** Built-in CDN download engine (`scripts/download_assets.mjs`) pulling all 28 high-res certificates, studio cutouts, and icons directly from GitHub Raw.

---

## ✦ Key Highlights & Verified Credentials

### 1. Leadership & Conclaves
- **Campus Ambassador — eDC IIT Delhi:** Selected campus coordinator driving outreach and student coordination for **BECon '26**, the annual entrepreneurship conclave of IIT Delhi.

### 2. 11+ Verified Certifications
| Credential / Course | Issuing Body | Year | Asset |
|---|---|---|---|
| **Campus Ambassador Recognition** | eDC IIT Delhi (BECon '26) | 2026 | `shiksha_nand_cert.png` |
| **HS-CIT (A+)** (IT Advanced) | HKCL (Haryana Knowledge Corp) | 2024 | `hkcl_logo.png` |
| **Foundations of Cybersecurity** | Google (Coursera) | 2026 | `coursera_cybersecurity_cert.png` |
| **Oracle Cloud Certified Foundation Associate** | Oracle University | 2025 | `oracle_ai_cert.png` |
| **Career Essentials in Generative AI** | Microsoft & LinkedIn | 2025 | `microsoft_genai_cert.png` |
| **What Is Generative AI?** | LinkedIn Learning | 2025 | `what_is_generative_ai_cert.png` |
| **Streamlining Work with Microsoft Copilot** | Microsoft & LinkedIn | 2025 | `streamlining_microsoft_copilot_cert.png` |
| **Generative AI: Evolution of Online Search** | LinkedIn Learning | 2025 | `generative_ai_online_search_cert.png` |
| **Learning Microsoft 365 Copilot for Work** | Microsoft & LinkedIn | 2025 | `microsoft_copilot_cert.png` |
| **Introduction to Artificial Intelligence** | LinkedIn Learning | 2025 | `intro_ai_cert.png` |
| **Ethics in the Age of Generative AI** | LinkedIn Learning | 2025 | `ethics_ai_cert.png` |

---

## ✦ Project Structure

```text
Cursor-portfolio/
├── Asset/
│   ├── cv/
│   │   └── Shiksha_Nand_Resume.pdf          # Official resume
│   ├── dist/
│   │   ├── app.js                           # Bundled React + Framer app
│   │   └── app.css                          # Production styles
│   ├── img/
│   │   ├── certificates/                    # 11 authentic credential images
│   │   ├── shikshanand-portrait.png         # Transparent studio cutout
│   │   └── favicon.svg                      # Custom vector favicon
│   └── svg/brand/                           # 12 tech stack SVGs (VS Code, Android, Java, etc.)
├── scripts/
│   ├── build.mjs                            # Fast esbuild bundle generator
│   ├── check.mjs                            # Integrity verification script
│   └── download_assets.mjs                  # Automated GitHub Raw CDN asset puller
├── src/
│   ├── app.jsx                              # Main React application & layout
│   ├── styles.css                           # Modular stylesheet & CSS variables
│   └── data/
│       ├── projects.json                    # Showcase projects & achievements
│       └── brands.json                      # Brand assets registry
├── BLUEPRINT.md                             # Complete portable prompt blueprint
├── DEPLOYMENT.md                            # Vercel & custom domain setup guide
├── index.html                               # Production entry HTML
├── live_preview.js                          # Zero-dependency local dev server
├── package.json                             # NPM scripts & dependencies
└── vercel.json                              # Vercel static build configuration
```

---

## ✦ Getting Started Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- Git

### 1. Clone the repository
```bash
git clone https://github.com/ShikshaNand/Cursor-portfolio.git
cd Cursor-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Sync all assets from GitHub CDN
If setting up in a fresh directory, download all 28 assets with one command:
```bash
npm run download
```

### 4. Run local preview
```bash
npm run dev
# or: node live_preview.js
```
Open **`http://localhost:4173`** in your browser.

### 5. Build for production
```bash
npm run build
npm run check
```

---

## ✦ 1-Click Deployment (Vercel)

This repository is pre-configured with `vercel.json` for static output:

1. Push your changes to GitHub:
   ```bash
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import **`ShikshaNand/Cursor-portfolio`**.
4. Leave settings as default:
   - **Framework Preset:** `Other`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.`
5. Click **Deploy**.

### Custom Domain (`snmofficial.in`)
In Vercel Project Settings > **Domains**, add `snmofficial.in`:
- **Type:** `A` record `76.76.21.21` or `CNAME` pointing to `cname.vercel-dns.com`.

---

## ✦ Tech Stack

- **Core:** [React 19](https://react.dev/)
- **Animation:** [Framer Motion 12](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Bundler:** [esbuild](https://esbuild.github.io/)
- **Hosting:** [Vercel](https://vercel.com/)

---

## ✦ Connect with Shiksha Nand

- **Portfolio:** [snmofficial.in](https://snmofficial.in)
- **GitHub:** [@ShikshaNand](https://github.com/ShikshaNand)
- **Email:** contact@snmofficial.in
- **Location:** Fatehabad, Haryana, India

---

<div align="center">
<sub>Designed & Built by Shiksha Nand · 2024–2026</sub>
</div>
