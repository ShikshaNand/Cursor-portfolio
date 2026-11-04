import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

// Base raw URL pointing to ShikshaNand's GitHub repository
const GITHUB_USER = process.env.GITHUB_USER || 'ShikshaNand';
const GITHUB_REPO = process.env.GITHUB_REPO || 'Cursor-portfolio';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const BASE_URL = process.env.ASSET_BASE_URL || `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

const filesToDownload = [
  // Core Visual Assets
  { url: `${BASE_URL}/Asset/img/shikshanand-portrait.png`, dest: 'Asset/img/shikshanand-portrait.png' },
  { url: `${BASE_URL}/Asset/img/favicon.svg`, dest: 'Asset/img/favicon.svg' },
  { url: `${BASE_URL}/Asset/cv/Shiksha_Nand_Resume.pdf`, dest: 'Asset/cv/Shiksha_Nand_Resume.pdf' },

  // 11 Verified Certificates & Credential Emblems
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

  // 12 Technology & Institution Brand SVGs
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
  { url: `${BASE_URL}/Asset/svg/brand/vscode.svg`, dest: 'Asset/svg/brand/vscode.svg' },

  // Structured Content Data
  { url: `${BASE_URL}/src/data/projects.json`, dest: 'src/data/projects.json' },
  { url: `${BASE_URL}/src/data/brands.json`, dest: 'src/data/brands.json' }
];

async function download(item) {
  const destPath = path.resolve(item.dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  const res = await fetch(item.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to download ${item.url}: ${res.status} ${res.statusText}`);
  }

  const fileStream = fs.createWriteStream(destPath);
  await pipeline(Readable.fromWeb(res.body), fileStream);
  console.log(`✓ Downloaded: ${item.dest} (${fs.statSync(destPath).size} bytes)`);
}

async function main() {
  console.log(`Downloading ${filesToDownload.length} assets from ${BASE_URL}...`);
  const failed = [];

  const chunkSize = 5;
  for (let i = 0; i < filesToDownload.length; i += chunkSize) {
    const chunk = filesToDownload.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map(async item => {
        try {
          await download(item);
        } catch (err) {
          console.error(`✗ Error: ${item.dest} - ${err.message}`);
          failed.push({ item, error: err.message });
        }
      })
    );
  }

  if (failed.length > 0) {
    console.error(`\n${failed.length} files failed to download.`);
    console.error('Make sure your repository is public and pushed to main branch:');
    console.error(`Repository: https://github.com/${GITHUB_USER}/${GITHUB_REPO}`);
    process.exit(1);
  } else {
    console.log(`\nAll ${filesToDownload.length} assets downloaded and verified locally!`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
