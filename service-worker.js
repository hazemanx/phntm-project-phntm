// Service worker installation: caching necessary files for offline use
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
                '/images/phntm-icon-192.png',
                '/images/phntm-icon-512.png',
                '/images/album-art.jpg',
                '/audio/song.mp3'
            ]);
        })
    );
});

// Service worker fetch: serve cached files or fetch from network if not available
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).then(function(fetchResponse) {
                return caches.open('phntm-cache-v1').then(function(cache) {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(function() {
            return caches.match('/offline.html'); // Optional: show offline page if fetch fails
        })
    );
});
