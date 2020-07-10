import { ElectionResult, ElectionResults } from '../../components/pages';
import { resolve } from '../lib/assets';
import { render } from '../lib/render';
import { Context } from '../types';

/**
 *
 * @param _req
 * @param ctx
 */
export function electionResult(_req: Request, ctx: Context): Promise<Response> {
  return render(
    ElectionResult,
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
        title: 'Election result - MyGov New Zealand'
      },
      year: ctx.url.pathname.slice(18)
    },
    {}
  );
}

/**
 *
 */
export function electionResults(): Promise<Response> {
  return render(
    ElectionResults,
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
        title: 'Election results - MyGov New Zealand'
      }
    },
    {}
  );
}
