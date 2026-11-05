# Shiksha Nand — Cinematic Developer Portfolio

<div align="center">

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
- **Dual Cinema Theme Engine:** Seamless Dark / Light mode switcher with zero flash of unstyled content (FOUC), warm studio paper palette (`#f8f6f2`), pure white panels, and smooth 350ms ambient transitions.
- **Dynamic Typewriter Headline:** Interactive character-by-character typewriter effect in the hero section cycling through 5 engineering roles with an authentic terminal-style blinking cursor.
- **Swarm Rebuild Integration:** Multi-agent cursor simulation (`Swarm Build`) assembling the live DOM, calibrated to build all 11 verified certifications in full sequence.
- **Zero Heavy Framework Overhead:** Bundled via `esbuild` into high-speed static production assets (`Asset/dist/app.js` + `Asset/dist/app.css`).
- **Automated Asset Sync:** Built-in CDN download engine (`scripts/download_assets.mjs`) pulling all 28 high-res certificates, studio cutouts, and icons directly from GitHub Raw.

---

## ✦ Project Structure

```text
Cursor-portfolio/
├── Asset/
│   ├── dist/
│   │   ├── app.js                           # Bundled React + Framer app
│   │   └── app.css                          # Production styles
│   ├── img/
│   │   ├── certificates/                    # 11 authentic credential images
│   │   ├── shikshanand-portrait.png         # High-res studio cutout (fallback)
│   │   ├── shikshanand-portrait.webp        # Modern optimized WebP (278 KB)
│   │   └── favicon.svg                      # Custom vector favicon
│   └── svg/brand/                           # 12 tech stack SVGs (VS Code, Android, Java, etc.)
├── scripts/
│   ├── build.mjs                            # Fast esbuild bundle generator
│   ├── check.mjs                            # Integrity verification script
│   ├── dev.mjs                              # Local watch build
│   ├── download_assets.mjs                  # Automated GitHub Raw CDN asset puller
│   └── tools/                               # Maintenance & conversion utilities
├── src/
│   ├── app.jsx                              # Main application orchestrator
│   ├── constants.js                         # Shared data, experiences, certificates
│   ├── styles.css                           # Modular stylesheet & CSS variables
│   ├── components/                          # Modular React components
│   │   ├── Common.jsx                       # Reveal, MediaImage, Magnetic
│   │   ├── CustomCursor.jsx                 # Custom spring-loaded cursor
│   │   ├── Header.jsx                       # Navigation & toolbar
│   │   ├── Hero.jsx                         # Hero section & portrait
│   │   ├── Portfolio.jsx                    # Projects grid & brand carousel
│   │   ├── Awards.jsx                       # Verified credentials & honors
│   │   ├── Breakdown.jsx                    # Interactive comparison slider
│   │   ├── About.jsx                        # Education, toolkit & process
│   │   ├── Journey.jsx                      # Experience milestones
│   │   ├── Contact.jsx                      # Contact links & brief form
│   │   └── ProjectDialog.jsx                # Accessible modal dialog
│   ├── hooks/                               # Custom React hooks
│   │   ├── useTheme.js                      # Theme engine with localStorage sync
│   │   └── useTypewriter.js                 # Terminal typewriter effect
│   └── data/
│       ├── projects.json                    # Showcase projects & achievements
│       └── brands.json                      # Brand assets registry
├── BLUEPRINT.md                             # Complete portable prompt blueprint
├── DEPLOYMENT.md                            # Vercel & custom domain setup guide
├── index.html                               # Production entry HTML (SEO + JSON-LD)
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


---

## ✦ Tech Stack

- **Core:** [React 19](https://react.dev/)
- **Animation:** [Framer Motion 12](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Bundler:** [esbuild](https://esbuild.github.io/)
- **Hosting:** [Vercel](https://vercel.com/)

---

## ✦ Connect with Shiksha Nand

- **GitHub:** [@ShikshaNand](https://github.com/ShikshaNand)
- **Email:** [Shikshanand.in@gmail.com](mailto:Shikshanand.in@gmail.com)
- **Location:** India

---

<div align="center">
<sub>Designed & Built by Shiksha Nand</sub>
</div>
