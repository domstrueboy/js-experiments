self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('sw-cache').then(cache => cache.addAll([
      '/js-experiments/simple-to-do/',
      '/js-experiments/simple-to-do/css/style.css',
      '/js-experiments/simple-to-do/js/main.js',
      '/js-experiments/simple-to-do/index.html',
    ])),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request)),
  );
});
