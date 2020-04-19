import { encode } from '../../../components/organisms/non-voters-tool/state';
import { NonVoters } from '../../../components/pages';
import { ElectionYear } from '../../../data/types';
import { resolve } from '../../lib/assets';
import { render } from '../../lib/render';
import { Context } from '../../types';

/**
 *
 * @param _req
 * @param ctx
 */
export async function baseNonVoters(
  _req: Request,
  ctx: Context
): Promise<Response> {
  return Response.redirect(
    `${ctx.url.protocol}//${ctx.url.hostname}/tools/non-voters/2017/_no/50-percent`,
    302
  );
}

/**
 *
 * @param _req
 * @param ctx
 */
export async function getNonVoters(
  _req: Request,
  ctx: Context
): Promise<Response> {
  return render(
    NonVoters,
    {
      layout: {
        links: [
          {
            rel: 'canonical',
            href: `${ctx.url.protocol}//${ctx.url.hostname}/tools/non-voters`
          },
          {
            rel: 'stylesheet',
            href: resolve('main.css')
          }
        ],
        meta: [
          {
            name: 'description',
            content:
              'The Non-voters Tool allows users to evaluate the effects of hypothetical situations where non-voters had instead chosen to vote.'
          }
        ],
        scripts: [
          {
            src: resolve('common.js')
          },
          {
            src: resolve('non-voters.js')
          }
        ],
        title: 'Non-voters Tool - MyGov.org.nz'
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
 * @param _req
 * @param ctx
 */
export async function legacyNonVoters(
  _req: Request,
  ctx: Context
): Promise<Response> {
  const bits = atob(ctx.url.pathname.slice(18)).split(',');
  const state = {
    party: bits[1].replace('@', '_'),
    percentage: parseFloat(bits[2]),
    year: bits[0] as ElectionYear
  };

  return Response.redirect(
    `${ctx.url.protocol}//${ctx.url.hostname}${encode(state)}`,
    301
  );
}

/**
 *
 * @param req
 */
export async function postNonVoters(req: Request): Promise<Response> {
  const data = await req.formData().then((formData: FormData) => {
    return Object.fromEntries(
      ((formData as unknown) as Map<string, string>).entries()
    );
  });

  console.log(JSON.stringify(data, null, 4));

  return Response.redirect(encode(data as any), 302);
}
