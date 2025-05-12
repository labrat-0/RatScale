// RatScale Service Worker
const CACHE_NAME = 'ratscale-cache-v1.3';
const APP_VERSION = '1.0.3';

// Files to cache for offline usage
const CACHE_ASSETS = [
  '/',
  '/full_page.html',
  '/minimal_full_page.html',
  '/full_page.js',
  '/minimal_full_page.js',
  '/ratscale.css',
  '/jszip.min.js',
  '/background.js',
  '/manifest.json',
  '/pwa-manifest.json',
  '/icons/logo.png',
  '/icons/icon_16x16.png',
  '/icons/icon_32x32.png',
  '/icons/icon_40x40.png',
  '/icons/icon_44x44.png',
  '/icons/icon_48x48.png',
  '/icons/icon_50x50.png',
  '/icons/icon_58x58.png',
  '/icons/icon_60x60.png',
  '/icons/icon_64x64.png',
  '/icons/icon_72x72.png',
  '/icons/icon_80x80.png',
  '/icons/icon_87x87.png',
  '/icons/icon_96x96.png',
  '/icons/icon_120x120.png',
  '/icons/icon_128x128.png',
  '/icons/icon_144x144.png',
  '/icons/icon_150x150.png',
  '/icons/icon_168x168.png',
  '/icons/icon_180x180.png',
  '/icons/icon_192x192.png',
  '/icons/icon_256x256.png',
  '/icons/icon_310x310.png',
  '/icons/icon_512x512.png',
  '/icons/icon_1024x1024.png'
];

// Browser detection for special handling
function detectBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('edge') > -1 || userAgent.indexOf('edg/') > -1) {
    return 'edge';
  } else if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('safari') > -1) {
    if (userAgent.indexOf('brave') > -1) {
      return 'brave';
    }
    return 'chrome';
  } else if (userAgent.indexOf('firefox') > -1) {
    return 'firefox';
  } else if (userAgent.indexOf('safari') > -1 && userAgent.indexOf('chrome') === -1) {
    return 'safari';
  }
  return 'unknown';
}

// Install event handler - cache resources
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell and content');
        return cache.addAll(CACHE_ASSETS.map(url => {
          // Handle relative paths for different deployment scenarios
          if (url.startsWith('/') && !url.startsWith('//')) {
            return url.substring(1); // Remove leading slash for relative paths
          }
          return url;
        }));
      })
      .catch(error => {
        console.log('[Service Worker] Cache error:', error);
      })
  );
});

// Activate event handler - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  
  // Take control of all clients immediately
  self.clients.claim();
  
  // Remove old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event handler with browser-specific optimizations
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Detect browser for special handling
  const browser = detectBrowser();
  const isSafari = browser === 'safari';
  
  // Special handling for Safari
  if (isSafari) {
    // Safari has issues with Range requests in service workers
    if (event.request.headers.get('range')) {
      event.respondWith(
        fetch(event.request)
      );
      return;
    }
  }
  
  // Handle requests with network-first strategy for HTML and CSS (for freshness)
  if (event.request.headers.get('Accept') && 
      event.request.headers.get('Accept').indexOf('text/html') !== -1 ||
      event.request.url.indexOf('.css') !== -1) {
    // Network first strategy for HTML and CSS
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the fetched response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request).then(cacheResponse => {
            return cacheResponse || caches.match('/minimal_full_page.html');
          });
        })
    );
  } else {
    // Cache first strategy for other assets
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return cached response if found
          if (response) {
            return response;
          }
          
          // Clone request for the fetch call
          const fetchRequest = event.request.clone();
          
          // Fetch and cache dynamic resources
          return fetch(fetchRequest)
            .then(response => {
              // Don't cache if response is invalid
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone response for the cache
              const responseToCache = response.clone();
              
              // Cache response for future
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            })
            .catch(error => {
              console.log('[Service Worker] Fetch error:', error);
              // Return offline fallback
              if (event.request.headers.get('Accept').indexOf('text/html') !== -1) {
                return caches.match('/minimal_full_page.html');
              }
            });
        })
    );
  }
});

// Listen for messages from clients
self.addEventListener('message', event => {
  // Handle client messages
  if (event.data) {
    if (event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    } else if (event.data.type === 'VERSION_CHECK') {
      // Respond with version info
      event.ports[0].postMessage({
        version: APP_VERSION,
        browser: detectBrowser()
      });
    }
  }
}); 