/* eslint-disable camelcase */

// From: https://github.com/bustle/cf-sentry/blob/master/sentry.js

interface StackFrame {
  colno?: number;
  filename?: string;
  function?: string;
  in_app?: boolean;
  lineno?: number;
}

/**
 *
 * @param err
 */
function parse(err: Error): StackFrame[] {
  return (err.stack || '')
    .split('\n')
    .slice(1)
    .map((line: string): StackFrame | undefined => {
      if (line.match(/^\s*[-]{4,}$/)) {
        return { filename: line };
      }

      // From: https://github.com/felixge/node-stack-trace/blob/1ec9ba43eece124526c273c917104b4226898932/lib/stack-trace.js#L42
      /* eslint-disable security/detect-unsafe-regex */
      const lineMatch = line.match(
        /at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/
      );

      if (!lineMatch) {
        return;
      }

      /* eslint-disable @typescript-eslint/camelcase */

      return {
        colno: +lineMatch[4] || undefined,
        filename: lineMatch[2] || undefined,
        function: lineMatch[1] || undefined,
        in_app: lineMatch[5] !== 'native' || undefined,
        lineno: +lineMatch[3] || undefined
      };
    })
    .filter((frame: StackFrame | void): frame is StackFrame => !!frame);
}

/**
 *
 */
function uuid(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return Array.from(bytes)
    .map((b: number) => ('0' + b.toString(16)).padStart(2, '0'))
    .join('');
}

/**
 *
 * @param err
 * @param req
 */
function toSentryEvent(err: any, req: any): any {
  const errType = err.name || (err.contructor || {}).name;
  const frames = parse(err);
  const extraKeys = Object.keys(err).filter(
    (key: string) => !['name', 'message', 'stack'].includes(key)
  );

  /* eslint-disable security/detect-object-injection */

  return {
    environment: ENVIRONMENT || 'development',
    event_id: uuid(),
    exception: {
      values: [
        {
          stacktrace: frames.length ? { frames: frames.reverse() } : undefined,
          type: errType,
          value: err.message
        }
      ]
    },
    extra: extraKeys.length
      ? {
          [errType]: extraKeys.reduce(
            (obj: Record<string, any>, key: string) => ({
              ...obj,
              [key]: err[key]
            }),
            {}
          )
        }
      : undefined,
    message: errType + ': ' + (err.message || '<no message>'),
    platform: 'javascript',
    release: RELEASE,
    request: {
      data: req.body,
      headers: req.headers,
      method: req.method,
      query_string: '',
      url: req.url
    },
    server_name: `mygov-${ENVIRONMENT || 'development'}-${req.cf.colo}`,
    tags: {
      asn: req.cf.asn,
      country: req.cf.country
    },
    timestamp: Date.now() / 1000
  };
}

/**
 *
 * @param err
 * @param req
 */
export async function log(err: Error, req: Request): Promise<void> {
  const body = JSON.stringify(toSentryEvent(err, req));
  const headers = {
    'Content-Type': 'application/json',
    'X-Sentry-Auth': [
      'Sentry sentry_version=7',
      `sentry_client=mygov.org.nz/${RELEASE}`,
      `sentry_key=5188487`
    ].join(', ')
  };

  for (let i = 0; i <= 5; i = i + 1) {
    const res = await fetch(
      `https://sentry.io/api/dccdb69d4ce642a79486340d9857a0b8/store/`,
      { body, headers, method: 'POST' }
    );

    if (res.status === 200) {
      return;
    }

    // We couldn't send to Sentry, try to log the response at least
    // eslint-disable-next-line no-console
    console.error({ httpStatus: res.status, ...(await res.json()) });
  }
}
