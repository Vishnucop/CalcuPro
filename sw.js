const CACHE_NAME = 'calcupro-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './js/app.js',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// Instalar SW
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache.map(url => {
                    return new Request(url, { cache: 'reload' });
                }));
            })
            .catch(err => {
                console.log('Error al cachear:', err);
            })
    );
    self.skipWaiting();
});

// Activar SW
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Interceptar requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    // Si está offline y no encuentra el recurso
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
            })
    );
});
