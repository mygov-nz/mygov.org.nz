import { MMPReview } from '../../../components/pages';
import { encode } from '../../../components/pages/mmp-review/mmp-review-tool/state';
import { resolve } from '../../lib/assets';
import { render } from '../../lib/render';

/**
 *
 * @param _req
 * @param ctx
 */
export async function baseMMPReview(
  _req: Request,
  ctx: Context
): Promise<Response> {
  return Response.redirect(
    `${ctx.url.protocol}//${ctx.url.hostname}/tools/mmp-review/2017/5-percent-threshold/overhang/1-seat-tagalong`,
    302
  );
}

/**
 *
 * @param _req
 * @param ctx
 */
export async function getMMPReview(
  _req: Request,
  ctx: Context
): Promise<Response> {
  return render(
    MMPReview,
    {
      layout: {
        links: [
          {
            rel: 'stylesheet',
            href: resolve('main.css')
          },
          {
            rel: 'canonical',
            href: `${ctx.url.protocol}//${ctx.url.hostname}/tools/mmp-review`
          }
        ],
        meta: [
          {
            name: 'description',
            content:
              'The MMP Review Tool allows users to evaluate the effects of possible changes to rules determining the outcome of a New Zealand General Election.'
          }
        ],
        scripts: [
          {
            src: resolve('mmp-review.js')
          }
        ],
        title: 'MMP Review Tool - MyGov.org.nz'
      },
      tool: {
        pathname: ctx.url.pathname
      }
    },
    {}
  );
}

/**
 *
 * @param req
 */
export async function postMMPReview(req: Request): Promise<Response> {
  const data = await req.formData().then((formData: FormData) => {
    return Object.fromEntries(
      ((formData as unknown) as Map<string, string>).entries()
    );
  });

  console.log(JSON.stringify(data, null, 4));

  return Response.redirect(encode(data as any), 302);
}
