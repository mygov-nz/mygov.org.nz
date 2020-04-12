import { NonVoters } from '../../../components/pages';
import { encode } from '../../../components/pages/non-voters/non-voters-tool/state';
import { resolve } from '../../lib/assets';
import { render } from '../../lib/render';

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
            rel: 'stylesheet',
            href: resolve('main.css')
          },
          {
            rel: 'canonical',
            href: `${ctx.url.protocol}//${ctx.url.hostname}/tools/non-voters`
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
