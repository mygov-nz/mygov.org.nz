import mem from 'mem';
import { useEffect, useState } from 'preact/hooks';

interface NonVotersToolActions {
  setParty: (party: string) => void;
  setPercentage: (percentage: number) => void;
  setYear: (year: ElectionYear) => void;
}

interface NonVotersToolState {
  party: string;
  percentage: number;
  year: ElectionYear;
}

export const matcher = /^\/tools\/non-voters\/(19|20[0-9]{2})\/([_a-z]{3})\/([0-9.]+)-percent$/;

/**
 *
 * @param pathname
 */
const decode = mem(
  (pathname: string): NonVotersToolState => {
    const bits = pathname.match(matcher);

    if (!bits) {
      return {
        party: '_no',
        percentage: 100,
        year: '2017'
      };
    }

    return {
      party: bits[2],
      percentage: parseInt(bits[3], 10),
      year: bits[1] as ElectionYear
    };
  }
);

/**
 *
 * @param props
 */
export function encode(props: NonVotersToolState): string {
  const bits = [props.year, props.party, props.percentage + '-percent'];

  return '/tools/non-voters/' + bits.join('/');
}

/**
 *
 * @param initialPath
 */
export function usePathnameState(
  initialPathname: string
): [NonVotersToolState, NonVotersToolActions] {
  const [pathname, setPathname] = useState<string>(initialPathname);
  const [state, setState] = useState<NonVotersToolState>(() => {
    return decode(pathname);
  });

  useEffect(() => {
    /**
     *
     */
    function onPopState(event: PopStateEvent): void {
      if (location.pathname === pathname) {
        return;
      }

      setPathname(location.pathname);
      setState(event.state || decode(location.pathname));
    }

    window.addEventListener('popstate', onPopState);

    return (): void => window.removeEventListener('popstate', onPopState);
  }, []);

  /**
   *
   * @param update
   */
  function pushState(update: Partial<NonVotersToolState>): void {
    const newState: NonVotersToolState = { ...state, ...update };

    history.pushState(newState, document.title, encode(newState));
  }

  return [
    state,
    {
      setParty: (party: string): void => pushState({ party }),
      setPercentage: (percentage: number): void => pushState({ percentage }),
      setYear: (year: ElectionYear): void => pushState({ year })
    }
  ];
}
