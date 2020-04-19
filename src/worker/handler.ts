import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

import { routes } from './routes';
import { Context } from './types';

/**
 *
 * @param event
 */
export async function handleEvent(event: FetchEvent): Promise<Response> {
  const ctx: Context = { url: new URL(event.request.url) };

  // Redirect if domain isn't mygov.org.nz
  if (!['mygov.org.nz', 'example.com'].includes(ctx.url.hostname)) {
    return Response.redirect('https://mygov.org.nz' + ctx.url.pathname, 301);
  }

  try {
    const asset = await getAssetFromKV(event);

    const response = new Response(asset.body, asset);
    response.headers.set(
      'Cache-Control',
      'public, max-age=31566240, immutable'
    );

    return response;
  } catch (err) {
    return routes.route(event.request, ctx);
  }
}
