import { ComponentType, h } from 'preact';
import { renderToString } from 'preact-render-to-string';

import { RenderProps } from '../../components/organisms';

// import { hash } from './utils';

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
          'Access-Control-Allow-Origin': 'https://mygov.org.nz',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400, immutable',
          'Content-Security-Policy': [
            "base-uri 'self'",
            'connect-src google-analytics.com',
            "default-src 'self'",
            "img-src 'self' data: https://www.googletagmanager.com https://www.google-analytics.com https://stats.g.doubleclick.net",
            "font-src 'self'",
            "form-action 'self'",
            "frame-ancestors 'self'",
            "manifest-src 'self'",
            "prefetch-src 'self'",
            "script-src 'self' 'unsafe-inline' data: https://www.googletagmanager.com https://www.google-analytics.com 'sha256-hXlzKdtX149UXD7ZWik/WT2rlNg8Bg/IO85uVWhhO5Q='",
            "style-src 'self' 'unsafe-inline'",
            "worker-src 'self'",
            'sandbox allow-forms allow-same-origin allow-scripts',
            'report-uri https://o372929.ingest.sentry.io/api/5188487/security/?sentry_key=dccdb69d4ce642a79486340d9857a0b8'
          ].join('; '),
          'Content-Type': 'text/html; charset="UTF-8"',
          // ETag: await hash(body),
          'Feature-Policy': [
            "autoplay 'none'",
            "camera 'none'",
            "geolocation 'none'",
            "gyroscope 'none'",
            "magnetometer 'none'",
            "microphone 'none'",
            "midi 'none'",
            // "notifications 'none'",
            "payment 'none'",
            // "push 'none'",
            // "speaker 'none'",
            "sync-xhr 'none'"
            // "vibrate 'none'"
          ].join('; '),
          'Referrer-Policy': 'no-referrer-when-downgrade',
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

  const links = [
    // '</fonts/open-sans-regular.woff2>; rel=preload; as=font',
    // '</fonts/open-sans-semibold.woff2>; rel=preload; as=font'
  ];

  for (const link of props.layout.links) {
    if (link.rel === 'stylesheet') {
      links.push(`<${link.href}>; rel=preload; as=style`);
    }
  }

  for (const script of props.layout.scripts) {
    links.push(`<${script.src}>; rel=preload; as=script`);
  }

  if (!props.tool || !props.tool.placeholder) {
    defaultHeaders.Link = links.join(', ');
  }

  return new Response('<!DOCTYPE html>' + body, {
    headers: {
      ...defaultHeaders,
      ...headers
    },
    status: statusCode,
    statusText: statusText[statusCode]
  });
}
