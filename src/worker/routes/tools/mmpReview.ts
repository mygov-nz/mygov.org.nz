import {
  encode,
  MMPReviewToolState
} from '../../../components/organisms/mmp-review-tool/state';
import { MMPReview } from '../../../components/pages';
import { ElectionYear } from '../../../data/types';
import { resolve } from '../../lib/assets';
import { render } from '../../lib/render';
import { Context } from '../../types';

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
  const description = [
    'The MMP Review Tool allows users to evaluate the effects of',
    'possible changes to rules determining the outcome of a',
    'New Zealand General Election.'
  ].join(' ');

  return render(
    MMPReview,
    {
      layout: {
        links: [
          {
            rel: 'canonical',
            href: `${ctx.url.protocol}//${ctx.url.hostname}/tools/mmp-review`
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
            content: 'MMP Review Tool'
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
            content: 'MyGov.org.nz'
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
            content: 'MMP Review Tool — MyGov.org.nz'
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
            content: 'MMP Review Tool'
          }
        ],
        scripts: [
          {
            src: resolve('common.js')
          },
          {
            src: resolve('mmp-review.js')
          }
        ],
        title: 'MMP Review Tool - MyGov.org.nz'
      },
      tool: {
        pathname: ctx.url.pathname,
        placeholder: ctx.url.pathname === '/tools/mmp-review/placeholder'
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
export async function legacyMMPReview(
  _req: Request,
  ctx: Context
): Promise<Response> {
  const bits = atob(ctx.url.pathname.slice(18)).split(',');
  const state: MMPReviewToolState = {
    overhang: bits[2] === '1',
    tagAlong: bits[3] === '1' ? parseInt(bits[4], 10) : 0,
    threshold: parseFloat(bits[1]),
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
export async function postMMPReview(
  req: Request,
  ctx: Context
): Promise<Response> {
  const data = await req.formData().then((formData: FormData) => {
    return Object.fromEntries(
      ((formData as unknown) as Map<string, string>).entries()
    );
  });

  const state: MMPReviewToolState = {
    overhang: data.overhang === 'on',
    tagAlong: data.overhang === 'on' ? parseInt(data.tagAlongSeats, 10) : 0,
    threshold: parseFloat(data.threshold),
    year: data.year as ElectionYear
  };

  return Response.redirect(
    `${ctx.url.protocol}//${ctx.url.hostname}${encode(state)}`,
    302
  );
}
