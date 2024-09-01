self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('phntm-cache-v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/app.html',
                '/css/style.css',
                '/js/main.js',
                '/js/howler.min.js',
                '/images/phntm-icon.png',
                '/images/album1.jpg',
                '/images/album2.jpg',
                '/audio/song.mp3'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
