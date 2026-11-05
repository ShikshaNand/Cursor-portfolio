# RECREATE THIS SITE AS A STATIC PROJECT: SHIKSHA NAND CINEMATIC PORTFOLIO

> **AI REPRODUCTION DIRECTIVE:**
> When executing or generating from this blueprint, create **ONLY the strictly necessary files** listed in Section 2.
> - **DO NOT** create redundant helper scripts, test files, temporary converters, or duplicate styling.
> - **DO NOT** include any resume PDF files.
> - All media assets (transparent cutout portrait in WebP/PNG, 11 verified certificate PNGs, and tech stack SVGs) are automated via `npm run download` directly from GitHub Raw CDN.

---

## 1. Project Specifications

- **Palette:** Dual Cinema Theme Engine — Dark Theme (`#090909` background, `#101010` panels, `#f2efeb` ink, `#ef4151` red accent, `#a09c9a` muted text) and Warm Editorial Light Theme (`#f8f6f2` canvas, `#ffffff` panels, `#111010` ink, `#d82335` red, `#645f5b` muted text).
- **Typography:** **Anton** (display font for headers & metrics), **Manrope** (body font 400-800), **Caveat** (handwritten accent). Loaded via Google Fonts in `index.html`.
- **Motion:** Framer Motion 12 with custom cubic-bezier easing `[0.22, 1, 0.36, 1]`.
- **Interactions:**
  - **Dual Cinema Theme Engine:** Interactive theme toggle with persistent `localStorage` cache, zero-flicker pre-render detection, and smooth 350ms ambient transitions.
  - **Dynamic Typewriter Hero Role:** Character-by-character typewriter animation cycling through 5 technical identities with a blinking red cursor (`SOFTWARE DEVELOPER`, `CREATIVE TECHNOLOGIST`, `FULL STACK WEB DEVELOPER`, `IOT & EMBEDDED SYSTEMS BUILDER`, `GENERATIVE AI EXPLORER`).
  - **Swarm Rebuild Automation:** Multi-agent cursor simulation (`Swarm Build`) assembling the live DOM, calibrated to build all 11 verified certifications in full sequence.
  - **Magnetic Custom Cursor:** Custom spring-loaded cursor ring & dot (`CustomCursor`).
  - **High-Performance Portrait:** Dual-layer transparent studio portrait with `<picture>` element serving high-speed WebP (`278 KB`) with PNG fallback.
  - **Interactive Brand Strip:** Smooth auto-scrolling brand logo rail (`BrandStrip`) with pause/play toggle, arrow controls, and grid expander. In light mode, logos automatically adapt with dynamic filter inversion for high clarity.
  - **Filterable Portfolio:** Category filter pills and instant search over software projects, IoT firmware architectures, and Android applications.
  - **Honors & Recognitions (`Awards`):** Laurel wreath badge: `11+ VERIFIED CREDENTIALS`, responsive click-to-view certificate dialogs, and smooth card elevation.
  - **Verified Certifications List (`Journey`):** Interactive certificates list with text enlargement and signature red color transition on hover without card box expansion.
  - **Featured Showcase Card (`Contact`):** Tilted photo card with cinematic dark hover transition, increased photo contrast, vignette depth, and glowing red accent border.
  - **Direct Mailto Contact:** "START A CONVERSATION" button and message brief form opening directly in the default mail app with pre-filled details.
  - **Accessible Project Dialog Modal:** Focus trapping, `aria-modal="true"`, and keyboard `Escape` dismissal.
  - Synthesized background music muted while subtle UI click/typing sound effects are preserved.
  - Location: India.

---

## 2. Minimal Strict Directory Layout

```text
Cursor-portfolio/
├── Asset/
│   ├── dist/
│   │   ├── app.js                           # Compiled by npm run build
│   │   └── app.css                          # Compiled by npm run build
│   ├── img/
│   │   ├── certificates/                    # 11 verified credentials (automated via npm run download)
│   │   ├── shikshanand-portrait.png         # Studio cutout fallback (automated)
│   │   ├── shikshanand-portrait.webp        # Modern optimized WebP (278 KB)
│   │   └── favicon.svg                      # Custom vector favicon (automated)
│   └── svg/brand/                           # 12 tech stack SVGs (automated)
├── scripts/
│   ├── build.mjs                            # esbuild compiler for app.js & app.css
│   ├── check.mjs                            # Verification script
│   ├── dev.mjs                              # Development watch mode
│   ├── download_assets.mjs                  # Automated GitHub Raw CDN asset puller
│   └── tools/                               # Maintenance & conversion utilities
├── src/
│   ├── app.jsx                              # Concise main application orchestrator
│   ├── constants.js                         # Shared data, experiences, certificates
│   ├── styles.css                           # Production CSS styles & theme engine
│   ├── components/                          # Modular React components
│   │   ├── Common.jsx                       # Reveal, MediaImage, Magnetic
│   │   ├── CustomCursor.jsx                 # Spring-loaded custom cursor
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
├── .gitignore                               # Git ignore rules
├── DEPLOYMENT.md                            # Vercel & custom domain setup guide
├── index.html                               # HTML entry point (SEO + JSON-LD)
├── live_preview.js                          # Lightweight local dev server
├── package.json                             # Dependencies & scripts
└── vercel.json                              # Vercel deployment config
```

---

## 3. Quick Start & Execution Workflow

```bash
# 1. Install dependencies
npm install

# 2. Automatically download all assets from GitHub Raw CDN
npm run download

# 3. Compile React & CSS bundle into Asset/dist/
npm run build

# 4. Verify all files and build health
npm run check

# 5. Launch local preview server (http://localhost:4173)
npm run start
# or watch mode: npm run dev
```

---

## 4. Configuration & Core Files

### `package.json`
```json
{
  "name": "shiksha-nand-portfolio",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "node scripts/build.mjs",
    "dev": "node scripts/dev.mjs",
    "start": "node live_preview.js",
    "check": "node scripts/check.mjs",
    "download": "node scripts/download_assets.mjs"
  },
  "dependencies": {
    "framer-motion": "^12.23.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "lucide-react": "^0.468.0"
  },
  "devDependencies": {
    "esbuild": "^0.25.0"
  }
}
```

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".",
  "cleanUrls": true
}
```

### `.gitignore`
```gitignore
node_modules/
package-lock.json
.DS_Store
Thumbs.db
*.log
*.pdf
Asset/cv/
```

### `index.html`
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#090909" />
  <script>
    (function(){
      try {
        var t = localStorage.getItem('snm-portfolio-theme');
        if (t === 'light' || (!t && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)) {
          document.documentElement.dataset.theme = 'light';
          var m = document.querySelector('meta[name="theme-color"]');
          if (m) m.setAttribute('content', '#f8f6f2');
        } else {
          document.documentElement.dataset.theme = 'dark';
        }
      } catch(e){}
    })();
  </script>
  <meta name="description" content="Shiksha Nand (S.N.M.) — Bachelor of Computer Applications (BCA) Student, Software Developer & Creative Technologist based in India. Core Java, Python, Web Development, Generative AI & IoT." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="SHIKSHA NAND | Software Developer & Creative Technologist" />
  <meta property="og:description" content="Motivated BCA student with a strong foundation in programming, web development, cloud basics, and Generative AI tools." />
  <meta property="og:image" content="./Asset/img/shikshanand-portrait.webp" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SHIKSHA NAND | Software Developer & Creative Technologist" />
  <meta name="twitter:description" content="Bachelor of Computer Applications (BCA) Student, Software Developer & Creative Technologist based in India. Core Java, Python, Web Development, Generative AI & IoT." />
  <meta name="twitter:image" content="./Asset/img/shikshanand-portrait.webp" />
  <title>SHIKSHA NAND | Software Developer & Creative Technologist</title>
  <link rel="icon" href="./Asset/img/favicon.svg" type="image/svg+xml" />
  <link rel="preload" href="./Asset/img/shikshanand-portrait.webp" as="image" type="image/webp" fetchpriority="high" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./Asset/dist/app.css" />
  <script src="./Asset/dist/app.js" defer></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shiksha Nand",
    "alternateName": "S.N.M.",
    "jobTitle": "Software Developer & Creative Technologist",
    "sameAs": [
      "https://www.linkedin.com/in/shikshanand",
      "https://github.com/ShikshaNand"
    ],
    "knowsAbout": [
      "Java",
      "Python",
      "React",
      "Web Development",
      "Cybersecurity",
      "Generative AI",
      "IoT",
      "ESP32"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "M.M. College, Fatehabad (CDLU)"
    }
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <noscript><main style="background:#090909;color:#eee;padding:40px;font-family:sans-serif"><h1>Shiksha Nand, Software Developer</h1><p>Please enable JavaScript to view the interactive portfolio.</p><a style="color:#ff5d65" href="mailto:Shikshanand.in@gmail.com">Shikshanand.in@gmail.com</a></main></noscript>
</body>
</html>
```

### `scripts/build.mjs`
```javascript
import { build } from 'esbuild';

await Promise.all([
  build({
    entryPoints: ['src/app.jsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: 'Asset/dist/app.js',
    loader: { '.jsx': 'jsx' },
    jsx: 'automatic',
    target: ['es2020'],
    define: { 'process.env.NODE_ENV': '"production"' }
  }),
  build({
    entryPoints: ['src/styles.css'],
    minify: true,
    sourcemap: true,
    outfile: 'Asset/dist/app.css'
  })
]);

console.log('Portfolio built: index.html + Asset/dist/app.js + Asset/dist/app.css');
```

### `scripts/check.mjs`
```javascript
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

console.log('Running build check...');
execSync('node scripts/build.mjs', { stdio: 'inherit' });

const requiredFiles = [
  'index.html',
  'Asset/dist/app.js',
  'Asset/dist/app.css',
  'Asset/img/shikshanand-portrait.png',
  'Asset/img/shikshanand-portrait.webp',
  'Asset/img/favicon.svg',
  'Asset/img/certificates/shiksha_nand_cert.png',
  'Asset/img/certificates/hkcl_logo.png',
  'Asset/img/certificates/oracle_ai_cert.png',
  'Asset/img/certificates/coursera_cybersecurity_cert.png',
  'Asset/img/certificates/microsoft_genai_cert.png',
  'src/data/projects.json',
  'src/data/brands.json'
];

let allOk = true;
for (const file of requiredFiles) {
  const p = path.resolve(file);
  if (!fs.existsSync(p)) {
    console.error(`Missing file: ${file}`);
    allOk = false;
  } else {
    const stat = fs.statSync(p);
    if (stat.size === 0) {
      console.error(`Empty file: ${file}`);
      allOk = false;
    } else {
      console.log(`✓ ${file} (${stat.size} bytes)`);
    }
  }
}

if (!allOk) process.exit(1);
console.log('\nAll checks passed!');
```

---

## 5. Clean Environment Guarantee

To ensure **zero bloat**, any AI creating this repository must only create the above files. Do not create:
- Temporary image conversion scripts in the root
- Test scripts (`test_*.mjs`, `inspect_*.mjs`)
- Unused stylesheets or build caches
- Duplicate asset directories
