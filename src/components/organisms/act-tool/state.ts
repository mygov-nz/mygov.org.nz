import { createBrowserHistory } from 'history';
import mem from 'mem';
import { useEffect, useState } from 'preact/hooks';

import { ElectionYear } from '../../../data/types';
import { getUrlMeta } from '../../../lib/get-url-meta';

export interface ActToolState {
  readonly year: ElectionYear;
}

export const matcher = /^\/tools\/act\/([0-9]{4})$/;

/**
 *
 * @param pathname
 */
const decode = mem(
  (pathname: string): ElectionYear => {
    const bits = pathname.match(matcher);

    return bits ? (bits[1] as ElectionYear) : '2017';
  }
);

/**
 *
 * @param year
 */
export function encode(year: ElectionYear): string {
  return '/tools/act/' + year;
}

/**
 *
 * @param initialPath
 */
export function usePathnameState(
  initialPathname: string
): [ElectionYear, (year: ElectionYear) => void] {
  const [year, setYear] = useState<ElectionYear>(() => {
    return decode(initialPathname);
  });

  const history = createBrowserHistory<ElectionYear>();
  const urls = getUrlMeta();

  useEffect(() => {
    const unlisten = history.listen((location): void => {
      setYear(location.state || decode(location.pathname));
    });

    for (const url of urls) {
      url.content = `${location.protocol}//${location.hostname}${initialPathname}`;
    }

    return (): void => unlisten();
  }, []);

  /**
   *
   * @param update
   */
  function updateYear(year: ElectionYear): void {
    setYear(
      (): ElectionYear => {
        const pathname = encode(year);

        history.push(pathname, year);

        for (const url of urls) {
          url.content = `${location.protocol}//${location.hostname}${pathname}`;
        }

        return year;
      }
    );
  }

  return [year, updateYear];
}
