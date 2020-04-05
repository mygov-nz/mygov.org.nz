import { NonVoters } from '../../../components/pages';
import { render } from '../../lib/render';

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
            href: 'main.css'
          }
        ],
        meta: [
          {
            name: 'description',
            content:
              'The Non-voters Tool allows users to evaluate the effects of hypothetical situations where non-voters had instead chosen to vote.'
          }
        ],
        scripts: [],
        title: 'Non-voters Tool - MyGov'
      },
      tool: {
        year: '2017'
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

  const url = ['tools', 'non-voters'];

  return Response.redirect('/' + url.join('/'), 302);
}
