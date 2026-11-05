import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\Anand\\AppData\\Local\\Temp\\chrome_cert_profile';

const certs = [
  {
    src: 'C:\\Users\\Anand\\Downloads\\Oracle Cloud Infrastructure 2025 AI Foundations Associate Certificate.pdf',
    dest: 'Asset/img/certificates/oracle_ai_cert.png',
    title: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate'
  },
  {
    src: 'C:\\Users\\Anand\\Downloads\\CertificateOfCompletion_Career Essentials in Generative AI by Microsoft and LinkedIn.pdf',
    dest: 'Asset/img/certificates/microsoft_genai_cert.png',
    title: 'Career Essentials in Generative AI (Microsoft & LinkedIn)'
  },
  {
    src: 'C:\\Users\\Anand\\Downloads\\Shiksha Nand_certificate.pdf',
    dest: 'Asset/img/certificates/shiksha_nand_cert.png',
    title: 'Shiksha Nand Achievement Certificate'
  },
  {
    src: 'C:\\Users\\Anand\\Downloads\\Coursera Foundation of CyberSecurity Certificate SNM .pdf',
    dest: 'Asset/img/certificates/coursera_cybersecurity_cert.png',
    title: 'Foundations of Cybersecurity (Coursera)'
  },
  {
    src: 'C:\\Users\\Anand\\Downloads\\CertificateOfCompletion_Ethics in the Age of Generative AI.pdf',
    dest: 'Asset/img/certificates/ethics_ai_cert.png',
    title: 'Ethics in the Age of Generative AI (LinkedIn)'
  },
  {
    src: 'C:\\Users\\Anand\\Downloads\\CertificateOfCompletion_Learning Microsoft 365 Copilot for Work.pdf',
    dest: 'Asset/img/certificates/microsoft_copilot_cert.png',
    title: 'Learning Microsoft 365 Copilot for Work'
  },
  {
    src: 'C:\\Users\\Anand\\Downloads\\CertificateOfCompletion_Introduction to Artificial Intelligence.pdf',
    dest: 'Asset/img/certificates/intro_ai_cert.png',
    title: 'Introduction to Artificial Intelligence (LinkedIn)'
  },
  {
    src: 'C:\\Users\\Anand\\Downloads\\downloads\\laptop data\\application_certificate.pdf',
    dest: 'Asset/img/certificates/hkcl_application_cert.png',
    title: 'Certificate in Computer Applications (HKCL)'
  }
];

// Ensure dest directory exists
fs.mkdirSync('Asset/img/certificates', { recursive: true });

// Check which certs exist
const existingCerts = certs.filter(c => fs.existsSync(c.src));
console.log(`Found ${existingCerts.length} of ${certs.length} certificates on disk.`);

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9224',
  `--user-data-dir=${userDataDir}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  'about:blank'
], { stdio: 'ignore' });

await new Promise(r => setTimeout(r, 1500));

try {
  for (const cert of existingCerts) {
    console.log(`Processing: ${cert.title}...`);
    const fileUrl = 'file:///' + cert.src.replace(/\\/g, '/');
    const newTargetRes = await fetch(`http://127.0.0.1:9224/json/new?${encodeURIComponent(fileUrl)}`, { method: 'PUT' });
    const target = await newTargetRes.json();

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };

    const send = (method, params = {}) => new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await new Promise((resolve) => {
      if (ws.readyState === WebSocket.OPEN) resolve();
      else ws.onopen = resolve;
    });

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1600,
      height: 1130,
      deviceScaleFactor: 1,
      mobile: false
    });

    // Wait 2 seconds for PDF rendering
    await new Promise(r => setTimeout(r, 2000));

    // Capture screenshot
    const shotRes = await send('Page.captureScreenshot', { format: 'png' });
    if (shotRes.result?.data) {
      const buf = Buffer.from(shotRes.result.data, 'base64');
      fs.writeFileSync(cert.dest, buf);
      console.log(`✓ Saved ${cert.dest} (${buf.length} bytes)`);
    } else {
      console.warn(`Failed to capture: ${cert.title}`);
    }

    await fetch(`http://127.0.0.1:9224/json/close/${target.id}`, { method: 'PUT' });
    ws.close();
  }
} finally {
  chrome.kill();
}

console.log('All certificates converted successfully!');
