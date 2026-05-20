const CACHE_NAME = 'zonedraw-v12.04.32';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => {
            let deletePromises = [];
            names.forEach(name => {
                if (name !== CACHE_NAME) {
                    deletePromises.push(caches.delete(name));
                }
            });
            return Promise.all(deletePromises);
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            if (res) {
                return res;
            } else {
                return fetch(event.request);
            }
        })
    );
});
