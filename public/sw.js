// Service worker: makes Sylla installable and serves the app shell quickly.
// Navigation/HTML is network-first so a new deploy reaches users immediately.
// Hashed build assets are cache-first (Vite fingerprints them, so they are immutable).
// API calls are never cached.
const CACHE = "sylla-v2";
const SHELL = ["/", "/index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Never touch API calls or non-GET requests.
  if (req.method !== "GET" || req.url.includes("/api/")) return;

  const url = new URL(req.url);
  const isDoc = req.mode === "navigate" || url.pathname === "/" || url.pathname.endsWith(".html");

  if (isDoc) {
    // Network-first: always try for a fresh shell, fall back to cache offline.
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match("/index.html")))
    );
    return;
  }

  // Everything else (hashed assets, icons): cache-first.
  e.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match("/index.html"))
    )
  );
});
