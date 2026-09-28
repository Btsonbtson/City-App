const SHELL = ["./index.html", "./flow.js", "./guides.js", "./uni.js", "./world.json"];
const SHELL_CACHE = "cg-shell-v2";
const CITY_CACHE = "cg-city";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== location.origin || event.request.method !== "GET") return;
  event.respondWith((async () => {
    try {
      const fresh = await fetch(event.request);
      return fresh;
    } catch {
      const hit = await caches.match(event.request);
      if (hit) return hit;
      if (event.request.mode === "navigate") return caches.match("./index.html");
      return new Response("", { status: 504 });
    }
  })());
});

self.addEventListener("message", (event) => {
  const urls = event.data && event.data.type === "CACHE_URLS" ? event.data.urls : null;
  if (!urls) return;
  event.waitUntil(caches.open(CITY_CACHE).then(async (cache) => {
    for (const url of urls) {
      try { await cache.add(url); } catch { /* remote or missing files stay online-only */ }
    }
  }));
});
