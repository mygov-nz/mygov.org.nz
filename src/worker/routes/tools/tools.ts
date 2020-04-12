import { Tools } from '../../../components/pages';
import { resolve } from '../../lib/assets';
import { render } from '../../lib/render';

/**
 *
 */
export async function tools(): Promise<Response> {
  return render(
    Tools,
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
        title: 'MyGov.org.nz Tools'
      }
    },
    {}
  );
}
