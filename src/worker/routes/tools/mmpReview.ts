import { MMPReview } from '../../../components/pages';
import { render } from '../../lib/render';

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
            href: 'main.css'
          }
        ],
        meta: [
          {
            name: 'description',
            content: 'The MMP Review Tool allows users to evaluate the effects of possible changes to rules determining the outcome of a New Zealand General Election.'
          }
        ],
        scripts: [],
        title: 'MMP Review Tool - MyGov'
      },
      tool: {}
    },
    {}
  );
}

/**
 *
 * @param req
 */
export async function postMMPReview(req: Request): Promise<Response> {
  const data = await req.formData()
    .then((formData: FormData) => Object.fromEntries(
      ((formData as unknown) as Map<string, string>).entries()
    ));

  const url = [
    'tools',
    'mmp-review'
  ];

  return Response.redirect('/' + url.join('/'), 302);
}
