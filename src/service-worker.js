/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim, skipWaiting } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'; 

clientsClaim();

skipWaiting();

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
    ({url}) => url.origin === "https://fonts.googleapis.com",
    new StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets'
    })
);

registerRoute(
    ({url}) => url.origin === 'https://fonts.gstatic.com',
    new CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }), 
            new ExpirationPlugin({
                maxEntries: 30
            })
        ]
    })
);

registerRoute(
    ({url}) => url.origin === 'https://api.themoviedb.org' || url.pathname === "/3/discover/tv",
    new StaleWhileRevalidate({
        cacheName: 'movie-api-response',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 1
            })
        ]
    })
)

registerRoute(
    ({request}) => request.destination === "image",
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 50
            })
        ]
    })
);

registerRoute(
    ({request}) => request.destination === "script" || request.destination === 'style',
    new StaleWhileRevalidate({
        cacheName: 'static-resources'
    })
)
// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
