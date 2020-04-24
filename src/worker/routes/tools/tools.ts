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
          },
          {
            rel: 'prefetch',
            href:
              '/tools/mmp-review/2017/5-percent-threshold/overhang/1-seat-tagalong'
          },
          {
            rel: 'prefetch',
            href: '/tools/non-voters/2017/_no/50-percent'
          }
        ],
        meta: [],
        scripts: [],
        title: 'Tools - MyGov New Zealand'
      }
    },
    {}
  );
}
