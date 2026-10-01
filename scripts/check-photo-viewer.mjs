// Run with: node scripts/check-photo-viewer.mjs [--baseline]
// Uses the installed React/Fancybox packages and a local headless Chrome or Edge.
import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("..", import.meta.url));
const baseline = process.argv.includes("--baseline");
const source = baseline
  ? execFileSync("git", ["show", "HEAD:src/components/common/Fancybox.tsx"], { cwd: root, encoding: "utf8" })
  : readFileSync(join(root, "src/components/common/Fancybox.tsx"), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true },
}).outputText;
const browserPath = [
  process.env.PHOTO_TEST_BROWSER,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/chromium",
  "/usr/bin/google-chrome",
].find((path) => path && existsSync(path));
assert.ok(browserPath, "Set PHOTO_TEST_BROWSER to a Chrome/Edge executable.");

const html = `<!doctype html><html><head>
  <link rel="stylesheet" href="/fancybox.css">
  <style>body{font-family:sans-serif}a{display:block;width:160px}img{width:160px;height:90px;object-fit:cover}</style>
</head><body><div id="root"></div>
  <script src="/react.js"></script><script src="/react-dom.js"></script><script src="/fancybox.js"></script>
  <script>
    (() => {
      const exports = {};
      const require = (name) => {
        if (name === 'react') return window.React;
        if (name === '@fancyapps/ui') return { Fancybox: window.Fancybox };
        if (name.endsWith('.css')) return {};
        throw new Error('Unexpected fixture import: ' + name);
      };
      ${compiled}
      window.PhotoViewer = exports.default;
    })();
    const h = React.createElement;
    function Gallery({ name, tick }) {
      return h(PhotoViewer, { options: { Carousel: { infinite: true } } },
        h('div', { 'data-tick': tick }, [1,2,3].map((number) =>
          h('a', { key: number, id: name + '-' + number, href: '/photo-' + number + '.jpg',
            'data-fancybox': name, 'data-caption': name + ' photo ' + number,
            style: number === 1 ? {} : { display: 'none' } },
            h('img', { src: '/photo-' + number + '.jpg', alt: name + ' photo ' + number })))))
    }
    function App() {
      const [tick, setTick] = React.useState(0);
      const [sibling, setSibling] = React.useState(true);
      const [owner, setOwner] = React.useState(true);
      window.photoTest = {
        rerender: () => ReactDOM.flushSync(() => setTick(value => value + 1)),
        removeSibling: () => ReactDOM.flushSync(() => setSibling(false)),
        removeOwner: () => ReactDOM.flushSync(() => setOwner(false)),
      };
      return h(React.Fragment, null,
        owner && h(Gallery, { key: 'owner', name: 'listing-a', tick }),
        sibling && h(Gallery, { key: 'sibling', name: 'listing-b', tick }));
    }
    ReactDOM.createRoot(document.getElementById('root')).render(h(React.StrictMode, null, h(App)));
  </script></body></html>`;
const files = {
  "/react.js": ["node_modules/react/umd/react.development.js", "application/javascript"],
  "/react-dom.js": ["node_modules/react-dom/umd/react-dom.development.js", "application/javascript"],
  "/fancybox.js": ["node_modules/@fancyapps/ui/dist/fancybox/fancybox.umd.js", "application/javascript"],
  "/fancybox.css": ["node_modules/@fancyapps/ui/dist/fancybox/fancybox.css", "text/css"],
  ...Object.fromEntries([1, 2, 3].map((number) => [
    `/photo-${number}.jpg`, [`public/assets/images/listing/img_0${number}.jpg`, "image/jpeg"],
  ])),
};
const server = createServer((request, response) => {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" }).end(html);
  } else if (files[request.url]) {
    const [path, type] = files[request.url];
    response.writeHead(200, { "Content-Type": type }).end(readFileSync(join(root, path)));
  } else {
    response.writeHead(404).end();
  }
});
const delay = (ms) => new Promise((done) => setTimeout(done, ms));
const waitFor = async (check, message, timeout = 12000) => {
  const deadline = Date.now() + timeout;
  do {
    if (await check()) return;
    await delay(100);
  } while (Date.now() < deadline);
  throw new Error(message);
};

const tempRoot = resolve(tmpdir());
const profile = mkdtempSync(join(tempRoot, "dg-photo-viewer-"));
let browser;
let ws;
try {
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  browser = spawn(browserPath, [
    "--headless=new", "--disable-gpu", "--disable-extensions", "--no-first-run",
    "--no-default-browser-check", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank",
  ], { windowsHide: true, stdio: "ignore" });
  let launchError;
  browser.on("error", (error) => { launchError = error; });
  const portFile = join(profile, "DevToolsActivePort");
  await waitFor(() => {
    if (launchError) throw launchError;
    if (browser.exitCode !== null) throw new Error(`Browser exited with code ${browser.exitCode}`);
    return existsSync(portFile);
  }, "Headless browser did not start.");
  const debugUrl = `http://127.0.0.1:${readFileSync(portFile, "utf8").split(/\r?\n/)[0]}`;
  const tab = await fetch(`${debugUrl}/json/new?${encodeURIComponent(baseUrl)}`, { method: "PUT" }).then(r => r.json());
  ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((done, fail) => {
    ws.addEventListener("open", done, { once: true });
    ws.addEventListener("error", fail, { once: true });
  });
  const pending = new Map();
  const errors = [];
  let id = 0;
  ws.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
    if (!pending.has(message.id)) return;
    const { done, fail, timer } = pending.get(message.id);
    pending.delete(message.id);
    clearTimeout(timer);
    message.error ? fail(new Error(message.error.message)) : done(message.result);
  });
  const call = (method, params = {}) => new Promise((done, fail) => {
    const callId = ++id;
    const timer = setTimeout(() => {
      pending.delete(callId);
      fail(new Error(`Browser command timed out: ${method}`));
    }, 15000);
    pending.set(callId, { done, fail, timer });
    ws.send(JSON.stringify({ id: callId, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const state = () => evaluate(`(() => {
    const instance = Fancybox.getInstance();
    const button = instance?.container?.querySelector('[data-carousel-next]');
    const image = instance?.getSlide()?.contentEl?.querySelector('img');
    return {
      id: instance?.id, index: instance?.getSlide()?.index, count: instance?.carousel?.pages.length,
      loaded: Boolean(image?.complete && image?.naturalWidth),
      nextVisible: Boolean(button && button.getBoundingClientRect().width && getComputedStyle(button).visibility !== 'hidden'
        && getComputedStyle(button).opacity !== '0' && !instance.container.classList.contains('is-idle')),
      hash: location.hash,
    };
  })()`);
  const click = async (selector) => {
    const point = await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) throw new Error('Missing click target');
      const rect = element.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    })()`);
    await call("Input.dispatchMouseEvent", { type: "mousePressed", button: "left", clickCount: 1, ...point });
    await call("Input.dispatchMouseEvent", { type: "mouseReleased", button: "left", clickCount: 1, ...point });
  };
  await call("Runtime.enable");
  await waitFor(() => evaluate("Boolean(window.photoTest && document.querySelector('#listing-a-1'))"), "Fixture did not render.");
  await delay(200);
  await click("#listing-a-1");
  await waitFor(async () => (await state()).loaded, "First photo did not load.");
  const first = await state();
  assert.equal(first.count, 3, "A listing should have exactly three slides.");
  await evaluate("photoTest.rerender()");
  await delay(700);
  assert.equal((await state()).id, first.id, "Photo viewer closed when the listing rerendered.");
  console.log("PASS: parent updates keep the same photo viewer open");
  await evaluate("photoTest.removeSibling()");
  await delay(700);
  assert.equal((await state()).id, first.id, "Removing another listing closed the active gallery.");
  console.log("PASS: another listing unmounting does not close the active viewer");
  for (const [selector, index] of [
    ["[data-carousel-next]", 1], ["[data-carousel-next]", 2],
    ["[data-carousel-next]", 0], ["[data-carousel-prev]", 2],
  ]) {
    await click(`.fancybox__container ${selector}`);
    await waitFor(async () => { const value = await state(); return value.index === index && value.loaded; }, "Photo navigation did not load the expected image.");
    await delay(250);
    assert.equal((await state()).id, first.id);
  }
  assert.equal((await state()).hash, "", "Photo navigation should not change the page URL.");
  console.log("PASS: next/previous arrows load all photos and wrap around without changing the URL");
  await delay(4000);
  assert.ok((await state()).nextVisible, "Navigation controls disappeared after a few seconds.");
  console.log("PASS: the viewer and its navigation remain visible after waiting");
  await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await call("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await waitFor(() => evaluate("!document.querySelector('.fancybox__container')"), "Escape did not close the viewer.");
  await click("#listing-a-1");
  await waitFor(async () => (await state()).loaded, "Viewer did not reopen.");
  await evaluate("photoTest.removeOwner()");
  await waitFor(() => evaluate("!document.querySelector('.fancybox__container')"), "Leaving the owning listing did not close its viewer.");
  assert.deepEqual(errors, [], "Unexpected browser errors.");
  console.log("PASS: Escape closes, reopening works, and removing the owner cleans up its viewer");
} finally {
  ws?.close();
  if (browser && browser.exitCode === null) {
    const exited = new Promise(done => browser.once("exit", done));
    browser.kill();
    await Promise.race([exited, delay(3000)]);
  }
  server.closeAllConnections();
  await new Promise(done => server.close(done));
  // This directory was created by this run and must remain inside the temp root.
  if (resolve(profile).startsWith(tempRoot + sep)) {
    rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
}
