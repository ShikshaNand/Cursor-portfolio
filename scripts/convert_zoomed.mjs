import fs from 'node:fs';
import { spawn } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\Anand\\AppData\\Local\\Temp\\chrome_cert_zoom';

const items = [
  {
    src: 'C:\\Users\\Anand\\Downloads\\Shiksha Nand_certificate.pdf',
    dest: 'Asset/img/certificates/shiksha_nand_cert.png',
    zoom: '#view=FitH'
  },
  {
    src: 'C:\\Users\\Anand\\Downloads\\Coursera Foundation of CyberSecurity Certificate SNM .pdf',
    dest: 'Asset/img/certificates/coursera_cybersecurity_cert.png',
    zoom: '#view=FitH'
  }
];

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9227',
  `--user-data-dir=${userDataDir}`,
  '--disable-gpu',
  'about:blank'
], { stdio: 'ignore' });

await new Promise(r => setTimeout(r, 1500));

try {
  for (const item of items) {
    const fileUrl = 'file:///' + item.src.replace(/\\/g, '/') + item.zoom;
    const newTargetRes = await fetch(`http://127.0.0.1:9227/json/new?${encodeURIComponent(fileUrl)}`, { method: 'PUT' });
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

    await new Promise(r => setTimeout(r, 2000));
    const shotRes = await send('Page.captureScreenshot', { format: 'png' });
    if (shotRes.result?.data) {
      const buf = Buffer.from(shotRes.result.data, 'base64');
      fs.writeFileSync(item.dest, buf);
      console.log(`Saved ${item.dest} (${buf.length} bytes)`);
    }

    await fetch(`http://127.0.0.1:9227/json/close/${target.id}`, { method: 'PUT' });
    ws.close();
  }
} finally {
  chrome.kill();
}
