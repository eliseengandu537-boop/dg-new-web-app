const baseUrl = "http://127.0.0.1:3010";
const debugUrl = "http://127.0.0.1:9223";

const routes = [
  "/", "/properties", "/about_us_02", "/our-services", "/agent",
  "/commercial-for-lease", "/retail-properties", "/industrial-warehouse",
  "/development-land", "/investment", "/fuel-station", "/investment-sales",
  "/retail-leasing", "/development-leasing", "/success-stories", "/property-news",
  "/courses", "/courses/candidate-practitioner", "/contact", "/inquiry", "/faq",
  "/privacy-policy", "/terms-and-conditions", "/cookie-policy", "/refund-policy",
  "/this-route-does-not-exist",
];

const target = await fetch(`${debugUrl}/json/new?${encodeURIComponent(baseUrl)}`, { method: "PUT" }).then((r) => r.json());
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve, { once: true });
  ws.addEventListener("error", reject, { once: true });
});

let id = 0;
const pending = new Map();
const events = new Map();
ws.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    return message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  }
  const listeners = events.get(message.method) || [];
  listeners.forEach((listener) => listener(message.params));
});

const call = (method, params = {}) => new Promise((resolve, reject) => {
  const callId = ++id;
  pending.set(callId, { resolve, reject });
  ws.send(JSON.stringify({ id: callId, method, params }));
});
const once = (event) => new Promise((resolve) => {
  const listener = (params) => {
    events.set(event, (events.get(event) || []).filter((item) => item !== listener));
    resolve(params);
  };
  events.set(event, [...(events.get(event) || []), listener]);
});
const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const evaluate = async (expression) => {
  const result = await call("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};
const navigate = async (path) => {
  console.error(`Auditing ${path}`);
  const loaded = once("Page.loadEventFired");
  await call("Page.navigate", { url: `${baseUrl}${path}` });
  await Promise.race([loaded, delay(8000)]);
  await delay(850);
};

await call("Page.enable");
await call("Runtime.enable");
await call("Network.enable");
await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });

const consoleErrors = [];
const requestFailures = [];
let pageRequests = [];
events.set("Runtime.exceptionThrown", [({ exceptionDetails }) => consoleErrors.push(exceptionDetails.text)]);
events.set("Log.entryAdded", [({ entry }) => entry.level === "error" && consoleErrors.push(entry.text)]);
events.set("Network.loadingFailed", [({ errorText, canceled }) => !canceled && requestFailures.push(errorText)]);
events.set("Network.requestWillBeSent", [({ request }) => pageRequests.push(request.url)]);

await evaluate(`localStorage.removeItem('dg_cookie_consent'); localStorage.removeItem('_dg_sid')`);
pageRequests = [];
await navigate("/");
const trackingBeforeChoice = pageRequests.some((url) => url.includes("/api/pageviews"));
await evaluate(`Array.from(document.querySelectorAll('button')).find(button => button.textContent.includes('Use essential only'))?.click()`);
await delay(350);
pageRequests = [];
await navigate("/contact");
const trackingAfterEssential = pageRequests.some((url) => url.includes("/api/pageviews"));

const results = [];
for (const route of routes) {
  pageRequests = [];
  await navigate(route);
  const audit = await evaluate(`(() => {
    const visible = (el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
    };
    const accessibleName = (el) => {
      const labelledBy = el.getAttribute('aria-labelledby');
      if (labelledBy) return labelledBy.split(/\\s+/).map(id => document.getElementById(id)?.textContent || '').join(' ').trim();
      if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').trim();
      if (el.id) {
        const label = document.querySelector('label[for="' + CSS.escape(el.id) + '"]');
        if (label) return label.textContent.trim();
      }
      if (el.closest('label')) return el.closest('label').textContent.trim();
      const descendantImageText = Array.from(el.querySelectorAll?.('img[alt]') || []).map(img => img.alt).join(' ').trim();
      return (el.innerText || el.textContent || el.getAttribute('alt') || descendantImageText || el.getAttribute('title') || '').trim();
    };
    const parse = (value) => {
      const values = value.match(/[\\d.]+/g)?.map(Number) || [];
      return values.length >= 3 ? [values[0], values[1], values[2], values[3] ?? 1] : null;
    };
    const blend = (front, back) => {
      const a = front[3] + back[3] * (1 - front[3]);
      return [0,1,2].map(i => (front[i] * front[3] + back[i] * back[3] * (1-front[3])) / a).concat(a);
    };
    const background = (el) => {
      let color = [255,255,255,1];
      const stack = [];
      for (let node = el; node && node !== document; node = node.parentElement) stack.push(node);
      for (const node of stack.reverse()) {
        const style = getComputedStyle(node);
        if (style.backgroundImage !== 'none') return null;
        const parsed = parse(style.backgroundColor);
        if (parsed && parsed[3]) color = blend(parsed, color);
      }
      return color;
    };
    const luminance = (rgb) => {
      const values = rgb.slice(0,3).map(v => { const n=v/255; return n <= .03928 ? n/12.92 : Math.pow((n+.055)/1.055,2.4); });
      return .2126*values[0] + .7152*values[1] + .0722*values[2];
    };
    const contrast = (a,b) => { const l1=luminance(a), l2=luminance(b); return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05); };
    const contrastFailures = [];
    for (const el of document.querySelectorAll('body *')) {
      if (!visible(el) || !Array.from(el.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())) continue;
      const style = getComputedStyle(el);
      const foreground = parse(style.color);
      const bg = background(el);
      if (!foreground || !bg) continue;
      const size = parseFloat(style.fontSize);
      const weight = Number(style.fontWeight) || 400;
      const threshold = size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;
      const ratio = contrast(blend(foreground, bg), bg);
      if (ratio + .01 < threshold) contrastFailures.push({ text: el.textContent.trim().slice(0,70), ratio: Number(ratio.toFixed(2)), color: style.color, background: style.backgroundColor });
    }
    const unnamed = Array.from(document.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea'))
      .filter(visible).filter(el => !accessibleName(el)).map(el => el.outerHTML.slice(0,180));
    const missingAlt = Array.from(document.images).filter(img => !img.hasAttribute('alt')).map(img => img.src);
    return {
      title: document.title,
      statusHeading: document.querySelector('h1')?.textContent?.trim() || '',
      h1Count: document.querySelectorAll('h1').length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      missingAlt,
      unnamed,
      contrastFailures: contrastFailures.slice(0,20),
    };
  })()`);
  const thirdParty = [...new Set(pageRequests.map((url) => { try { return new URL(url).hostname; } catch { return ''; } })
    .filter((host) => host && !["127.0.0.1", "localhost"].includes(host)))];
  results.push({ route, thirdParty, ...audit });
}

await evaluate(`localStorage.removeItem('dg_cookie_consent'); localStorage.removeItem('_dg_sid')`);
pageRequests = [];
await navigate("/");
await evaluate(`Array.from(document.querySelectorAll('button')).find(button => button.textContent.includes('Allow anonymous analytics'))?.click()`);
await delay(800);
const trackingAfterAnalytics = pageRequests.some((url) => url.includes("/api/pageviews"));

console.log(JSON.stringify({
  consent: { trackingBeforeChoice, trackingAfterEssential, trackingAfterAnalytics },
  consoleErrors: [...new Set(consoleErrors)],
  requestFailures: [...new Set(requestFailures)],
  results: results.map(({ contrastFailures, missingAlt, unnamed, ...result }) => ({
    ...result,
    missingAltCount: missingAlt.length,
    unnamedCount: unnamed.length,
    unnamed: unnamed.slice(0, 3),
    contrastFailureCount: contrastFailures.length,
    contrastFailures: contrastFailures.slice(0, 5).map((item) => `${item.text} (${item.ratio}:1)`),
  })),
}, null, 2));

ws.close();
await fetch(`${debugUrl}/json/close/${target.id}`);
