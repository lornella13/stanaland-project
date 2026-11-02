
const VERSION = "v17";
const STATIC_CACHE = `stanaland-static-${VERSION}`;
const RUNTIME_CACHE = `stanaland-runtime-${VERSION}`;
const OFFLINE_URL = "offline.html";

const PRECACHE = [
  "./",
  "index.html",
  "services.html",
  "hotels.html",
  "hotels-uganda.html",
  "hotels-rwanda.html",
  "safaris.html",
  "contact.html",
  "offline.html",
  "style.css",
  "script.js",
  "manifest.json",

  
  "images/logo.png?v=3",
  "images/land.png",
  "images/lake.png",
  "images/lion.png",

  
  "images/car.png",
  "images/cruiser.png",

  
  "images/Radisson.png",
  "images/one.png",
  "images/bisate.png",
  "images/kigalis.png",
  "images/singita.png",
  "images/lakeki.png",
  "images/magashi.png",
  "images/Nyungwe.png",
  "images/MILLE.png",

  
  "images/ukampala.png",
  "images/uhotel.png",
  "images/latitude.png",
  "images/para.png",
  "images/clouds.png",
  "images/mweya.png",
  "images/protea.png",
  "images/apoka.png",
  "images/canan.png",

  
  "images/Bwindi.png",
  "images/murchisson.png",
  "images/rwanda.png",
  "images/chimpa.png",
  "images/kazinga.png"
];


self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== RUNTIME_CACHE)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (!request.url.startsWith("http")) return;

  
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  
  event.respondWith(staleWhileRevalidate(request));
});

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await caches.match(request, { ignoreSearch: true });
    return cached || (await caches.match(OFFLINE_URL));
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await caches.match(request);

  const network = fetch(request)
    .then((response) => {
      if (response && (response.ok || response.type === "opaque")) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || (await network) || Response.error();
}