/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const cacheName = `cache-${version}`;

const assets = [...build, ...files];

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(cacheName);
		await cache.addAll(assets);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== cacheName) {
				await caches.delete(key)
			};
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') {
		return
	};

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(cacheName);

		if (assets.includes(url.pathname)) {
			return cache.match(url.pathname);
		}

		try {
			const response = await fetch(event.request);

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			return cache.match(event.request);
		}
	}

	const response = respond().then((x) => {
		if (x === undefined) {
			return Promise.reject();
		}
		return x;
	});
	event.respondWith(response);
});
