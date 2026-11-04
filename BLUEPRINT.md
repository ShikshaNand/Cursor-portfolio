# RECREATE THIS SITE AS A STATIC PROJECT: SHIKSHA NAND CINEMATIC PORTFOLIO

You are an expert creative front-end developer. Produce a working project that reproduces the site below **exactly**: same layout, copy, visuals, motion, and interaction. React 19 + Framer Motion 12 bundled by esbuild into a plain static site (`index.html` + `Asset/`). No framework, router, or CSS library beyond what is listed.

---

## 1. Project Specifications

- **Palette:** Cinematic Dark Theme (`#090909` background, `#101010` panels, `#f2efeb` ink, `#ef4151` red accent, `#a09c9a` muted text).
- **Typography:** **Anton** (display font for headers & metrics), **Manrope** (body font 400-800), **Caveat** (handwritten accent). Loaded via Google Fonts in `index.html`.
- **Motion:** Framer Motion 12 with custom cubic-bezier easing `[0.22, 1, 0.36, 1]`.
- **Interactions:**
  - Magnetic custom cursor ring & dot (`CustomCursor`).
  - Dual-layer transparent studio portrait with scroll parallax.
  - Infinite auto-scrolling brand logo rail (`BrandStrip`).
  - Filterable project gallery with category pills & instant search.
  - Interactive Project Dialog modal with stage transitions.
  - Laurel wreath badge: `11+ VERIFIED CREDENTIALS` linking to verified eDC IIT Delhi certificate modal.
  - Interactive Experience accordion with smooth open/close.
  - Contact brief form with direct `mailto:` draft generation (`Open in Mail`).
  - Synthesized background music muted while subtle UI click/typing sound effects are preserved.
  - Location: India.

---

## 2. Directory Layout

```text
├── Asset/
│   ├── cv/
│   │   └── Shiksha_Nand_Resume.pdf
│   ├── dist/
│   │   ├── app.js                           # Compiled by npm run build
│   │   └── app.css                          # Compiled by npm run build
│   ├── img/
│   │   ├── certificates/                    # 11 verified credentials
│   │   │   ├── shiksha_nand_cert.png
│   │   │   ├── hkcl_logo.png
│   │   │   ├── oracle_ai_cert.png
│   │   │   ├── coursera_cybersecurity_cert.png
│   │   │   ├── microsoft_genai_cert.png
│   │   │   ├── what_is_generative_ai_cert.png
│   │   │   ├── streamlining_microsoft_copilot_cert.png
│   │   │   ├── generative_ai_online_search_cert.png
│   │   │   ├── microsoft_copilot_cert.png
│   │   │   ├── intro_ai_cert.png
│   │   │   └── ethics_ai_cert.png
│   │   ├── shikshanand-portrait.png
│   │   └── favicon.svg
│   └── svg/brand/                           # 12 tech stack SVGs
├── scripts/
│   ├── build.mjs
│   ├── check.mjs
│   └── download_assets.mjs
├── src/
│   ├── app.jsx
│   ├── styles.css
│   └── data/
│       ├── projects.json
│       └── brands.json
├── .gitignore
├── index.html
├── live_preview.js
├── package.json
└── vercel.json
```

---

## 3. Quick Start & Asset Automation Commands

```bash
# 1. Install dependencies
npm install

# 2. Download all 28 assets (cutout, 11 certificates, brand SVGs) from GitHub Raw CDN
npm run download

# 3. Build production bundle (esbuild bundles src/app.jsx -> Asset/dist/app.js)
npm run build

# 4. Verify all files
npm run check

# 5. Start local preview server
npm run dev
# -> Listening at http://localhost:4173
```

---

## 4. Configuration Files

### `package.json`
```json
{
  "name": "shiksha-nand-portfolio",
  "version": "2.0.0",
  "private": true,
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
# Dependencies
node_modules/
package-lock.json

# System and OS files
.DS_Store
Thumbs.db
*.log
* s.svg
```

### `index.html`
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#090909" />
  <meta name="description" content="Shiksha Nand (S.N.M.) — Bachelor of Computer Applications (BCA) Student, Software Developer & Creative Technologist based in India. Core Java, Python, Web Development, Generative AI & IoT." />
  <meta property="og:title" content="SHIKSHA NAND | Software Developer & Creative Technologist" />
  <meta property="og:description" content="Motivated BCA student with a strong foundation in programming, web development, cloud basics, and Generative AI tools." />
  <title>SHIKSHA NAND | Software Developer & Creative Technologist</title>
  <link rel="icon" href="./Asset/img/favicon.svg" type="image/svg+xml" />
  <link rel="preload" href="./Asset/img/shikshanand-portrait.png" as="image" fetchpriority="high" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./Asset/dist/app.css" />
  <script src="./Asset/dist/app.js" defer></script>
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

await build({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'Asset/dist/app.js',
  loader: { '.jsx': 'jsx' },
  jsx: 'automatic',
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' }
});

console.log('Portfolio built: index.html + Asset/dist/app.js + Asset/dist/app.css');
```

### `scripts/download_assets.mjs`
```javascript
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

const GITHUB_USER = process.env.GITHUB_USER || 'ShikshaNand';
const GITHUB_REPO = process.env.GITHUB_REPO || 'Cursor-portfolio';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const BASE_URL = process.env.ASSET_BASE_URL || `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

const filesToDownload = [
  // Studio Portrait Cutout & Favicon
  { url: `${BASE_URL}/Asset/img/shikshanand-portrait.png`, dest: 'Asset/img/shikshanand-portrait.png' },
  { url: `${BASE_URL}/Asset/img/favicon.svg`, dest: 'Asset/img/favicon.svg' },
  { url: `${BASE_URL}/Asset/cv/Shiksha_Nand_Resume.pdf`, dest: 'Asset/cv/Shiksha_Nand_Resume.pdf' },

  // 11 Verified Certificates
  { url: `${BASE_URL}/Asset/img/certificates/shiksha_nand_cert.png`, dest: 'Asset/img/certificates/shiksha_nand_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/hkcl_logo.png`, dest: 'Asset/img/certificates/hkcl_logo.png' },
  { url: `${BASE_URL}/Asset/img/certificates/oracle_ai_cert.png`, dest: 'Asset/img/certificates/oracle_ai_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/coursera_cybersecurity_cert.png`, dest: 'Asset/img/certificates/coursera_cybersecurity_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/microsoft_genai_cert.png`, dest: 'Asset/img/certificates/microsoft_genai_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/what_is_generative_ai_cert.png`, dest: 'Asset/img/certificates/what_is_generative_ai_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/streamlining_microsoft_copilot_cert.png`, dest: 'Asset/img/certificates/streamlining_microsoft_copilot_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/generative_ai_online_search_cert.png`, dest: 'Asset/img/certificates/generative_ai_online_search_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/microsoft_copilot_cert.png`, dest: 'Asset/img/certificates/microsoft_copilot_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/intro_ai_cert.png`, dest: 'Asset/img/certificates/intro_ai_cert.png' },
  { url: `${BASE_URL}/Asset/img/certificates/ethics_ai_cert.png`, dest: 'Asset/img/certificates/ethics_ai_cert.png' },

  // Brand Stack SVGs
  { url: `${BASE_URL}/Asset/svg/brand/iitdelhi.svg`, dest: 'Asset/svg/brand/iitdelhi.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/oracle.svg`, dest: 'Asset/svg/brand/oracle.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/google.svg`, dest: 'Asset/svg/brand/google.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/microsoft.svg`, dest: 'Asset/svg/brand/microsoft.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/hkcl.svg`, dest: 'Asset/svg/brand/hkcl.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/java.svg`, dest: 'Asset/svg/brand/java.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/python.svg`, dest: 'Asset/svg/brand/python.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/android.svg`, dest: 'Asset/svg/brand/android.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/github.svg`, dest: 'Asset/svg/brand/github.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/wordpress.svg`, dest: 'Asset/svg/brand/wordpress.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/esp32.svg`, dest: 'Asset/svg/brand/esp32.svg' },
  { url: `${BASE_URL}/Asset/svg/brand/vscode.svg`, dest: 'Asset/svg/brand/vscode.svg' }
];

async function download(item) {
  const destPath = path.resolve(item.dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Failed to download ${item.url}: ${res.status}`);
  const fileStream = fs.createWriteStream(destPath);
  await pipeline(Readable.fromWeb(res.body), fileStream);
  console.log(`✓ Downloaded: ${item.dest}`);
}

async function main() {
  console.log(`Downloading ${filesToDownload.length} assets from ${BASE_URL}...`);
  for (let i = 0; i < filesToDownload.length; i += 5) {
    const chunk = filesToDownload.slice(i, i + 5);
    await Promise.all(chunk.map(download));
  }
  console.log(`\nAll assets downloaded and verified locally!`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
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
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
    console.error(`Missing or empty file: ${file}`);
    allOk = false;
  } else {
    console.log(`✓ ${file} (${fs.statSync(p).size} bytes)`);
  }
}

if (!allOk) process.exit(1);
console.log('\nAll checks passed!');
```

### `live_preview.js`
```javascript
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.map': 'application/json'
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (stats && stats.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      } else {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```
