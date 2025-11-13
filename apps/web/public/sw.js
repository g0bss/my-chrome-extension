const CACHE_NAME = 'notas-pwa-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/index.css',
  '/assets/index.js',
  '/icons/icon192.png',
  '/icons/icon512.png',
];

// Instalação: cachear assets essenciais
self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[SW] Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Ativação: limpar caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Cache-First para assets, Network-First para API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Network-First para chamadas à API
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone e cache apenas respostas bem-sucedidas
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback para cache se offline
          return caches.match(request);
        })
    );
    return;
  }

  // Cache-First para assets estáticos
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(request).then((response) => {
        // Cache novos assets
        if (response.ok && request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return response;
      });
    })
  );
});
