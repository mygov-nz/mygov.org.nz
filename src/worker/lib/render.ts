import { ComponentType, h } from 'preact';
import { renderToString } from 'preact-render-to-string';

import { RenderProps } from '../../components/organisms';

import { moochi } from './moochi';
import { hash } from './utils';

const statusText: Record<number, string> = {
  200: 'OK',
  404: 'Not Found'
};

/**
 *
 * @param type
 * @param props
 * @param headers
 * @param statusCode
 */
export async function render<P>(
  type: ComponentType<P>,
  props: RenderProps,
  headers: Record<string, string> = {},
  statusCode = 200
): Promise<Response> {
  /* eslint-disable security/detect-object-injection */

  const vnode = h<P>(type, props);

  const body = renderToString(
    vnode,
    {},
    { pretty: ENVIRONMENT === 'production' ? '' : '    ' }
  );

  const defaultHeaders: Record<string, string> =
    ENVIRONMENT === 'production'
      ? {
          'Cache-Control': 'max-age=3600',
          'Content-Security-Policy': [
            "default-src 'none'",
            "img-src 'self' data:",
            "font-src 'self'",
            "manifest-src 'self'",
            // "prefetch-src 'self'",
            "script-src 'self'",
            "style-src 'self' 'unsafe-inline'",
            "worker-src 'self'",
            'sandbox allow-forms allow-scripts',
            'report-uri https://o372929.ingest.sentry.io/api/5188487/security/?sentry_key=dccdb69d4ce642a79486340d9857a0b8'
          ].join('; '),
          'Content-Type': 'text/html; charset="UTF-8"',
          ETag: await hash(body),
          'Feature-Policy': [
            "autoplay 'none'",
            "camera 'none'",
            "geolocation 'none'",
            "microphone 'none'",
            "notifications 'none'",
            "payment 'none'"
          ].join('; '),
          'Strict-Transport-Security': [
            'max-age=15778800',
            'includeSubDomains',
            'preload'
          ].join('; '),
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      : {
          'Content-Type': 'text/html; charset="UTF-8"',
          'X-Robots-Tag': 'noarchive, nofollow, noindex'
        };

  const links = [];

  for (const link of props.layout.links) {
    if (link.rel === 'stylesheet') {
      links.push(`<${link.href}>; rel=preload; as=style`);
    }
  }

  for (const script of props.layout.scripts) {
    links.push(`<${script.src}>; rel=preload; as=script`);
  }

  defaultHeaders.Link = links.join(', ');

  return new Response('<!DOCTYPE html>' + body, {
    headers: {
      ...defaultHeaders,
      ...headers
    },
    status: statusCode,
    statusText: statusText[statusCode]
  });
}
