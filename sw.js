const CACHE_NAME = 'zonedraw-v12.04.25';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((names) => Promise.all(names.map((n) => { 
        if(n !== CACHE_NAME) return caches.delete(n); 
    }))));
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((res) => res || fetch(event.request)));
});
