import {
  encode,
  NonVotersToolState
} from '../../../components/organisms/non-voters-tool/state';
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
  const description = [
    'The Non-voters Tool allows users to evaluate the effects of hypothetical',
    'situations where non-voters had instead chosen to vote.'
  ].join(' ');

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
            content: 'Non-voters Tool'
          },
          {
            property: 'og:description',
            content: description
          },
          {
            property: 'og:image',
            content: 'https://mygov.org.nz/images/non-voters.png'
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
            content: 'Non-voters Tool — MyGov New Zealand'
          },
          {
            property: 'twitter:description',
            content: description
          },
          {
            property: 'twitter:image',
            content: 'https://mygov.org.nz/images/non-voter.png'
          },
          {
            property: 'twitter:image:alt',
            content: 'Non-voters Tool'
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
        title: 'Non-voters Tool - MyGov New Zealand'
      },
      tool: {
        pathname: ctx.url.pathname,
        placeholder: ctx.url.pathname === '/tools/non-voters/placeholder'
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
  const state: NonVotersToolState = {
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
 * @param ctx
 */
export async function postNonVoters(
  req: Request,
  ctx: Context
): Promise<Response> {
  const data = await req.formData().then((formData: FormData) => {
    return Object.fromEntries(
      ((formData as unknown) as Map<string, string>).entries()
    );
  });

  const state: NonVotersToolState = {
    party: data.party,
    percentage: parseFloat(data.percentage),
    year: data.year as ElectionYear
  };

  return Response.redirect(
    `${ctx.url.protocol}//${ctx.url.hostname}${encode(state)}`,
    302
  );
}
