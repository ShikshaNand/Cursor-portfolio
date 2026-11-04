import { spawn } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\Anand\\AppData\\Local\\Temp\\chrome_test_profile';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  `--user-data-dir=${userDataDir}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  'about:blank'
], { stdio: 'ignore' });

// Wait 1.5 seconds for Chrome to start
await new Promise(r => setTimeout(r, 1500));

try {
  const versionRes = await fetch('http://127.0.0.1:9222/json/version');
  const versionData = await versionRes.json();
  console.log('Connected to Chrome:', versionData.Browser);

  // Create a new target / page using PUT
  const newTargetRes = await fetch('http://127.0.0.1:9222/json/new?http://localhost:4173', { method: 'PUT' });
  const target = await newTargetRes.json();

  // Connect via WebSocket
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let id = 1;
  const callbacks = new Map();
  const consoleLogs = [];

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      consoleLogs.push(msg.params.args.map(a => a.value || a.description).join(' '));
    }
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
  await send('Runtime.enable');

  // Wait 3 seconds for React & Framer Motion to mount and render
  await new Promise(r => setTimeout(r, 3000));

  // Check document title and root HTML
  const evalExpr = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
    return res.result?.result?.value;
  };

  const title = await evalExpr('document.title');
  const htmlLength = await evalExpr('document.getElementById("root").innerHTML.length');
  const projectCards = await evalExpr('document.querySelectorAll(".project-card").length');
  const brandLogos = await evalExpr('document.querySelectorAll(".brand-logo").length');
  const heroPortrait = await evalExpr('!!document.querySelector(".hero-portrait img")');
  const headerLinks = await evalExpr('[...document.querySelectorAll(".desktop-nav a")].map(a => a.textContent)');

  console.log('Title:', title);
  console.log('Root HTML length:', htmlLength);
  console.log('Project cards rendered (featured 3 initially):', projectCards);
  console.log('Brand logos rendered:', brandLogos);
  console.log('Hero portrait rendered:', heroPortrait);
  console.log('Header nav links:', headerLinks);

  // Check for horizontal overflow at widths: 1440, 768, 390
  for (const width of [1440, 768, 390]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 800
    });
    await new Promise(r => setTimeout(r, 600));
    const overflow = await evalExpr('document.documentElement.scrollWidth > window.innerWidth');
    const scrollWidth = await evalExpr('document.documentElement.scrollWidth');
    const innerWidth = await evalExpr('window.innerWidth');
    console.log(`Width ${width}px -> scrollWidth: ${scrollWidth}, innerWidth: ${innerWidth}, overflow: ${overflow}`);
  }

  // Test motion toggle
  const motionBefore = await evalExpr('document.documentElement.dataset.motion');
  await evalExpr('document.querySelector(".motion-toggle").click()');
  await new Promise(r => setTimeout(r, 300));
  const motionAfter = await evalExpr('document.documentElement.dataset.motion');
  console.log(`Motion toggle test: before = ${motionBefore}, after = ${motionAfter}`);

  // Test filter buttons & archive expansion
  await evalExpr('document.querySelector(".filters button:nth-child(2)").click()'); // Click "VFX"
  await new Promise(r => setTimeout(r, 500));
  const vfxCards = await evalExpr('document.querySelectorAll(".project-card").length');
  console.log('Cards after selecting "VFX" filter:', vfxCards);

  // Test search
  await evalExpr(`
    const input = document.querySelector('.search-box input');
    input.value = 'short';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  `);
  await new Promise(r => setTimeout(r, 500));
  const searchCards = await evalExpr('document.querySelectorAll(".project-card").length');
  console.log('Cards after searching "short":', searchCards);

  // Test Project Dialog
  await evalExpr('document.querySelector(".project-open").click()');
  await new Promise(r => setTimeout(r, 500));
  const dialogOpen = await evalExpr('!!document.querySelector(".project-dialog")');
  console.log('Dialog opened on project card click:', dialogOpen);

  // Test Escape key closes dialog
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', windowsVirtualKeyCode: 27 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', windowsVirtualKeyCode: 27 });
  await new Promise(r => setTimeout(r, 500));
  const dialogClosed = await evalExpr('!document.querySelector(".project-dialog")');
  console.log('Dialog closed on Escape:', dialogClosed);

  // Test Awards expansion on mobile (390px)
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
  await new Promise(r => setTimeout(r, 500));
  const expandBtn = await evalExpr('!!document.querySelector(".award-expand")');
  console.log('Award expand button present on mobile:', expandBtn);
  await evalExpr('document.querySelector(".award-expand").click()');
  await new Promise(r => setTimeout(r, 300));
  const awardsExpanded = await evalExpr('document.getElementById("awards").classList.contains("awards-expanded")');
  console.log('Awards expanded class toggled:', awardsExpanded);

  if (consoleLogs.length > 0) {
    console.log('\nPage Console Logs:', consoleLogs);
  }

  // Close target
  await fetch(`http://127.0.0.1:9222/json/close/${target.id}`, { method: 'PUT' });
  ws.close();
} finally {
  chrome.kill();
  console.log('Headless Chrome test complete.');
}
