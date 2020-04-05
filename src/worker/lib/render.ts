import { Attributes, ComponentType, h } from 'preact';
import { render as toString } from 'preact-render-to-string';

/**
 *
 * @param value
 */
function hash(value: string): PromiseLike<string> {
  const length = value.length;
  const buffer = new ArrayBuffer(length * 2);
  const view = new Uint16Array(buffer);

  for (let i = 0; i < length; i = i + 1) {
    view[i] = value.charCodeAt(i);
  }

  return crypto.subtle.digest('SHA-1', buffer)
    .then((result: ArrayBuffer): string => {
      const s = String.fromCharCode.apply(null, result as unknown as number[]);

      return [
        parseInt(s.slice(0, 10), 16).toString(36),
        parseInt(s.slice(10, 20), 16).toString(36),
        parseInt(s.slice(20, 30), 16).toString(36),
        parseInt(s.slice(30, 40), 16).toString(36)
      ].join('');
    });
}

/**
 *
 * @param type
 * @param props
 */
export async function render<P>(
  type: ComponentType<P>,
  props: (Attributes & P) | null,
  headers: Record<string, string>
): Promise<Response> {
  const body = toString(
    h<P>(type, props),
    null,
    {
      pretty: ENVIRONMENT === 'production' ? '' : '    ',
      xml: true
    }
  );

  const defaultHeaders: Record<string, string> = ENVIRONMENT === 'production'
    ? {
      'Cache-Control': 'max-age=3600',
      'Content-Security-Policy': [
        "default-src 'none'",
        "img-src 'self'",
        "manifest-src 'self'",
        "prefetch-src 'self'",
        "script-src 'self'",
        "style-src 'self'",
        "worker-src 'self'",
        "sandbox allow-forms allow-scripts"
      ].join('; '),
      'Content-Type': 'text/html; charset="UTF-8"',
      'ETag': await hash(body),
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

  return new Response('<!DOCTYPE html>' + body, {
    headers: {
      ...defaultHeaders,
      ...headers
    },
    status: 200,
    statusText: 'OK'
  });
}
