import { handleEvent } from './handler';

addEventListener('fetch', (event: FetchEvent): void => {
  event.respondWith(handleEvent(event));
});
