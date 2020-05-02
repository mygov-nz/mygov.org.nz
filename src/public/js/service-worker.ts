const assets: string[] = JSON.parse(__ASSETS__);

async function activate(): Promise<void> {
  for (const key of await self.caches.keys()) {
    if (key !== __VERSION__) {
      await self.caches.delete(key);
    }
  }

  return self.clients.claim();
}

async function install(): Promise<void> {
  const cache = await self.caches.open(__VERSION__).catch((error: Error) => {
    console.log(error);

    return null;
  });

  if (cache) {
    await cache.addAll(assets).catch((error: Error) => {
      console.log(error);
    });
  }

  return self.skipWaiting();
}

function fetchFromNetwork(request: Request) {
  return (response: Response): Response => {
    const copy = response.clone();

    caches
      .open(__VERSION__)
      .then((cache) => cache.put(request, copy));

    return response;
  };
}

function unableToResolve(): Response {
  return new Response('<h1>Service Unavailable</h1>', {
    headers: new Headers({ 'Content-Type': 'text/html' }),
    status: 503,
    statusText: 'Service Unavailable'
  });
}

async function handleFetch(event): Promise<any> {
  const request = event.request;

  if (request.url === 'https://mygov.org.nz/') {
    return Response.redirect('https://mygov.org.nz/tools', 302);
  }

  if (/\/tools\/mmp-review/.test(request.url)) {
    const cached = await caches.match('/tools/mmp-review/placeholder');
    if (cached) {
      return cached;
    }
  }

  if (/\/tools\/non-voters/.test(request.url)) {
    const cached = await caches.match('/tools/non-voters/placeholder');
    if (cached) {
      return cached;
    }
  }

  if (/\/tools\/act/.test(request.url)) {
    const cached = await caches.match('/tools/act/placeholder');
    if (cached) {
      return cached;
    }
  }

  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  return fetch(request)
    .then(fetchFromNetwork(request), unableToResolve)
    .catch(unableToResolve);
}

self.addEventListener('activate', (event: any) => {
  event.waitUntil(activate());
});

self.addEventListener('fetch', (event) => {
  if (!/mygov\.org\.nz/.test(event.request.url)) {
    return;
  }

  if (event.request.method !== 'GET') {
    console.log('WORKER: fetch event ignored.');
    return;
  }

  event.respondWith(handleFetch(event));
});

self.addEventListener('install', (event) => {
  event.waitUntil(install());
});
