import { encode } from '../../../components/organisms/act-tool/state';
import { Act } from '../../../components/pages';
import { ElectionYear } from '../../../data/types';
import { resolve } from '../../lib/assets';
import { render } from '../../lib/render';
import { Context } from '../../types';

/**
 *
 * @param _req
 * @param ctx
 */
export async function baseAct(_req: Request, ctx: Context): Promise<Response> {
  return Response.redirect(
    `${ctx.url.protocol}//${ctx.url.hostname}/tools/act/2017`,
    302
  );
}

/**
 *
 * @param _req
 * @param ctx
 */
export async function getAct(_req: Request, ctx: Context): Promise<Response> {
  const description = 'ACT Tool';

  return render(
    Act,
    {
      layout: {
        links: [
          {
            rel: 'canonical',
            href: `${ctx.url.protocol}//${ctx.url.hostname}/tools/act`
          },
          {
            rel: 'stylesheet',
            href: resolve('main.css')
          }
        ],
        meta: [
          {
            name: 'description',
            content: description
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:url',
            content: ctx.url.href
          },
          {
            property: 'og:title',
            content: 'ACT Tool'
          },
          {
            property: 'og:description',
            content: description
          },
          {
            property: 'og:image',
            content: 'https://mygov.org.nz/images/mmp-review.png'
          },
          {
            property: 'og:image:type',
            content: 'image/png'
          },
          {
            property: 'og:image:width',
            content: '1146'
          },
          {
            property: 'og:image:height',
            content: '600'
          },
          {
            property: 'og:site_name',
            content: 'MyGov New Zealand'
          },
          {
            property: 'twitter:card',
            content: 'summary'
          },
          {
            property: 'twitter:url',
            content: ctx.url.href
          },
          {
            property: 'twitter:title',
            content: 'ACT Tool — MyGov New Zealand'
          },
          {
            property: 'twitter:description',
            content: description
          },
          {
            property: 'twitter:image',
            content: 'https://mygov.org.nz/images/mmp-review.png'
          },
          {
            property: 'twitter:image:alt',
            content: 'ACT Tool'
          }
        ],
        scripts: [
          {
            src: resolve('common.js')
          },
          {
            src: resolve('act.js')
          }
        ],
        title: 'ACT Tool - MyGov New Zealand'
      },
      tool: {
        pathname: ctx.url.pathname,
        placeholder: ctx.url.pathname === '/tools/act/placeholder'
      }
    },
    {}
  );
}
/**
 *
 * @param req
 * @param ctx
 */
export async function postAct(req: Request, ctx: Context): Promise<Response> {
  const data = await req.formData().then((formData: FormData) => {
    return Object.fromEntries(
      ((formData as unknown) as Map<string, string>).entries()
    );
  });

  const pathname = encode(data.year as ElectionYear);

  return Response.redirect(
    `${ctx.url.protocol}//${ctx.url.hostname}${pathname}`,
    302
  );
}
