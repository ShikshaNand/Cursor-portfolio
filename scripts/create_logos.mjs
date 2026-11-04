import fs from 'node:fs';
import path from 'node:path';

const logos = {
  'google.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <text x="50" y="32" font-family="'Manrope', sans-serif" font-weight="700" font-size="19" fill="#f2efeb" letter-spacing="-0.5">Google Cloud</text>
    <path d="M28 25c0-1.1-.1-2.2-.3-3.2H16v6.1h6.7c-.3 1.6-1.2 3-2.6 3.9v3.2h4.2C26.8 32.7 28 29.1 28 25z" fill="#4285F4"/>
    <path d="M16 37.2c3.3 0 6.1-1.1 8.1-3l-4.2-3.2c-1.1.8-2.6 1.2-3.9 1.2-3 0-5.6-2-6.5-4.8H5.2v3.3c2 4 6.2 6.5 10.8 6.5z" fill="#34A853"/>
    <path d="M9.5 27.4c-.2-.8-.4-1.6-.4-2.4s.2-1.6.4-2.4V19.3H5.2C4.4 20.9 4 22.9 4 25s.4 4.1 1.2 5.7l4.3-3.3z" fill="#FBBC05"/>
    <path d="M16 17.8c1.8 0 3.4.6 4.7 1.8l3.5-3.5C22.1 14.1 19.3 13 16 13c-4.6 0-8.8 2.5-10.8 6.5l4.3 3.3c.9-2.8 3.5-4.8 6.5-4.8z" fill="#EA4335"/>
  </svg>`,

  'oracle.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 50" fill="none">
    <rect x="10" y="16" width="30" height="18" rx="9" stroke="#ef4151" stroke-width="4.5" fill="none"/>
    <text x="50" y="32" font-family="'Manrope', sans-serif" font-weight="800" font-size="20" fill="#f2efeb" letter-spacing="1.5">ORACLE</text>
  </svg>`,

  'microsoft.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect x="8" y="14" width="10" height="10" fill="#F25022"/>
    <rect x="20" y="14" width="10" height="10" fill="#7FBA00"/>
    <rect x="8" y="26" width="10" height="10" fill="#00A4EF"/>
    <rect x="20" y="26" width="10" height="10" fill="#FFB900"/>
    <text x="40" y="31" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#f2efeb" letter-spacing="-0.3">Microsoft</text>
  </svg>`,

  'iitdelhi.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50" fill="none">
    <circle cx="20" cy="25" r="14" stroke="#ef4151" stroke-width="2.5" fill="none"/>
    <polygon points="20,16 26,29 14,29" fill="#ef4151"/>
    <text x="42" y="24" font-family="'Manrope', sans-serif" font-weight="800" font-size="14" fill="#f2efeb">eDC IIT DELHI</text>
    <text x="42" y="36" font-family="'Manrope', sans-serif" font-weight="500" font-size="9" fill="#a09c9a">BECon '26 PARTNER</text>
  </svg>`,

  'hkcl.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 50" fill="none">
    <rect x="8" y="13" width="24" height="24" rx="4" fill="#ef4151"/>
    <text x="20" y="30" font-family="'Anton', sans-serif" font-size="15" fill="#fff" text-anchor="middle">H</text>
    <text x="40" y="31" font-family="'Manrope', sans-serif" font-weight="800" font-size="18" fill="#f2efeb">HKCL</text>
    <text x="40" y="40" font-family="'Manrope', sans-serif" font-weight="500" font-size="7" fill="#a09c9a">IT EDUCATION</text>
  </svg>`,

  'java.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 50" fill="none">
    <path d="M18 34c4 .5 8 .5 12-1 2-.8 3-1.6 3-2.5s-2-1.4-4-1.8c-5-.8-10-.6-14 .5 1.5 2 2 3.8 3 4.8z" fill="#ef4151"/>
    <path d="M16 26c4 .4 9 .3 13-.8 2-.6 2.5-1.2 2-1.8-.7-.9-3-1.1-6-1.2-4-.2-8 .3-11 1.2.6 1.4 1.3 2.1 2 2.6z" fill="#5382a1"/>
    <text x="40" y="31" font-family="'Manrope', sans-serif" font-weight="800" font-size="19" fill="#f2efeb">Java</text>
  </svg>`,

  'python.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 50" fill="none">
    <path d="M17 12c-4.4 0-8 3.6-8 8v4h8v-2h6v5H11c-4.4 0-8 3.6-8 8s3.6 8 8 8h3v-4c0-4.4 3.6-8 8-8h8v2h-6v-5h12c4.4 0 8-3.6 8-8s-3.6-8-8-8h-3v4c0 4.4-3.6 8-8 8H17v-2h6v-5h-6z" fill="#ef4151" transform="scale(0.7) translate(8, 6)"/>
    <text x="42" y="31" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#f2efeb">Python</text>
  </svg>`,

  'android.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <path d="M10 24h18v10c0 1.5-1.2 2.7-2.7 2.7H12.7C11.2 36.7 10 35.5 10 34V24z" fill="#3DDC84"/>
    <path d="M10 22c0-5 4-9 9-9s9 4 9 9H10z" fill="#3DDC84"/>
    <circle cx="15" cy="18" r="1.5" fill="#090909"/>
    <circle cx="23" cy="18" r="1.5" fill="#090909"/>
    <text x="36" y="31" font-family="'Manrope', sans-serif" font-weight="700" font-size="17" fill="#f2efeb">Android</text>
  </svg>`,

  'github.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 50" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 12C12.4 12 7 17.4 7 24c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" fill="#f2efeb"/>
    <text x="40" y="31" font-family="'Manrope', sans-serif" font-weight="700" font-size="18" fill="#f2efeb">GitHub</text>
  </svg>`,

  'wordpress.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <circle cx="20" cy="25" r="14" stroke="#f2efeb" stroke-width="2.5" fill="none"/>
    <text x="20" y="32" font-family="'Manrope', sans-serif" font-weight="800" font-size="17" fill="#f2efeb" text-anchor="middle">W</text>
    <text x="42" y="31" font-family="'Manrope', sans-serif" font-weight="700" font-size="17" fill="#f2efeb">WordPress</text>
  </svg>`,

  'esp32.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 50" fill="none">
    <rect x="8" y="14" width="24" height="22" rx="3" stroke="#ef4151" stroke-width="2.5" fill="none"/>
    <circle cx="16" cy="25" r="3" fill="#ef4151"/>
    <circle cx="24" cy="25" r="3" fill="#ef4151"/>
    <text x="40" y="31" font-family="'Anton', sans-serif" font-size="19" fill="#f2efeb" letter-spacing="1">ESP32</text>
  </svg>`,

  'vscode.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 50" fill="none">
    <path d="M25 12l-10 9 6 4-6 4 10 9 5-2V14l-5-2z" fill="#007ACC"/>
    <path d="M15 21l-7-5-2 1v16l2 1 7-5v-8z" fill="#0065A9"/>
    <text x="38" y="31" font-family="'Manrope', sans-serif" font-weight="700" font-size="17" fill="#f2efeb">VS Code</text>
  </svg>`
};

const dir = path.resolve('Asset/svg/brand');
fs.mkdirSync(dir, { recursive: true });

for (const [file, content] of Object.entries(logos)) {
  fs.writeFileSync(path.join(dir, file), content, 'utf8');
  console.log(`Created: ${file}`);
}
