// Dev-only visual check: drives headless Chrome over CDP with real device
// emulation (desktop Chrome can't shrink below ~500px), then saves full-page
// PNGs. Usage: node scripts/shoot.mjs <outDir> <baseUrl> [name=path@WxH ...]
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";

const [outDir, base, ...jobs] = process.argv.slice(2);
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const profile = `/tmp/decard-cdp-${Date.now()}`;
mkdirSync(outDir, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  "--hide-scrollbars",
  "--no-first-run",
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error("no CDP target");
}

const ws = new WebSocket(await target());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const n = ++id;
    pending.set(n, resolve);
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send("Page.enable");
for (const job of jobs) {
  const [name, rest] = job.split("=");
  const [path, size] = rest.split("@");
  const [w, h] = size.split("x").map(Number);
  const mobile = w < 768;
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await send("Emulation.setTouchEmulationEnabled", { enabled: mobile });
  await send("Page.navigate", { url: base + path });
  await sleep(9000);
  // Scroll through once so whileInView sections reveal, then return to top.
  await send("Runtime.evaluate", {
    expression: `(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,120))}scrollTo(0,0)})()`,
    awaitPromise: true,
  });
  await sleep(1500);
  const evalValue = async (expression) =>
    (await send("Runtime.evaluate", { expression, returnByValue: true })).result?.result?.value;
  const fullH = Math.min(Number(await evalValue("document.documentElement.scrollHeight")) || h, 8000);
  const scrollW = Number(await evalValue("document.documentElement.scrollWidth")) || w;
  // Grow the viewport to the full page, then capture it in one frame.
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: fullH, deviceScaleFactor: 1, mobile });
  await sleep(1200);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  if (!shot.result?.data) {
    console.log(`${name}: capture failed`, JSON.stringify(shot.error ?? shot).slice(0, 200));
    continue;
  }
  writeFileSync(`${outDir}/${name}.png`, Buffer.from(shot.result.data, "base64"));
  console.log(`${name}: ${w}x${fullH} (scrollWidth ${scrollW}${scrollW > w ? " OVERFLOW" : ""})`);
}
ws.close();
chrome.kill("SIGKILL");
rmSync(profile, { recursive: true, force: true });
