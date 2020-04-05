import { Tools } from '../../../components/pages';
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
            href: 'main.css'
          }
        ],
        meta: [],
        scripts: [],
        title: 'MyGov Tools'
      }
    },
    {}
  );
}
