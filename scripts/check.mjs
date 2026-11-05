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

if (!allOk) {
  process.exit(1);
}

console.log('\nAll checks passed!');
