import { NotFound } from '../../components/pages';
import { resolve } from '../lib/assets';
import { render } from '../lib/render';
import { Context } from '../types';

/**
 *
 * @param _req
 * @param ctx
 */
export async function notFound(_req: Request, ctx: Context): Promise<Response> {
  return render(
    NotFound,
    {
      layout: {
        links: [
          {
            rel: 'stylesheet',
            href: resolve('main.css')
          }
        ],
        meta: [],
        scripts: [],
        title: 'Page not found - MyGov.org.nz'
      },
      pathname: ctx.url.pathname
    },
    {},
    404
  );
}
