import mem from 'mem';

import { log } from '../lib/sentry';
import { Context } from '../types';

type Handler = (req: Request, ctx: Context) => Promise<Response>;
type Method = 'GET' | 'HEAD' | 'OPTIONS' | 'POST';

interface Route {
  handler: Handler;
  test: (method: Method, pathname: string) => boolean;
}

interface RouterOptions {
  error: Handler;
  notFound: Handler;
}

/**
 *
 */
export class Router {
  /**
   *
   */
  private _error: Handler;

  /**
   *
   */
  private _notFound: Handler;

  /**
   *
   */
  private _routes: Route[];

  /**
   *
   */
  constructor(options: RouterOptions) {
    this._error = options.error;
    this._notFound = options.notFound;
    this._routes = [];
  }

  /**
   *
   * @param path
   * @param handler
   */
  get(path: RegExp, handler: Handler): void {
    this._addRoute('GET', path, handler);
  }

  /**
   *
   * @param path
   * @param handler
   */
  head(path: RegExp, handler: Handler): void {
    this._addRoute('HEAD', path, handler);
  }

  /**
   *
   * @param path
   * @param handler
   */
  options(path: RegExp, handler: Handler): void {
    this._addRoute('OPTIONS', path, handler);
  }

  /**
   *
   * @param path
   * @param handler
   */
  post(path: RegExp, handler: Handler): void {
    this._addRoute('POST', path, handler);
  }

  /**
   *
   * @param req
   * @param ctx
   */
  route(req: Request, ctx: Context): Promise<Response> {
    const method = req.method.toUpperCase() as Method;

    const route = this._routes.find<Route>((route: Route): route is Route => {
      return route.test(method, ctx.url.pathname);
    });

    if (route) {
      try {
        return route.handler(req, ctx);
      } catch (err) {
        log(err, req);

        return this._error(req, ctx);
      }
    }

    return this._notFound(req, ctx);
  }

  /**
   *
   * @param method
   * @param path
   * @param handler
   */
  private _addRoute(method: Method, path: RegExp, handler: Handler): void {
    const test = mem<[Method, string], boolean, string>(
      (m: Method, p: string): boolean => {
        if (m !== method) {
          return false;
        }

        const match: string[] = p.match(path) || [];

        return match[0] === p;
      },
      { cacheKey: (args) => args.join(' ') }
    );

    this._routes.push({ handler, test });
  }
}
