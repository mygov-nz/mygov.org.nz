import mem from 'mem';
import { useEffect, useState } from 'preact/hooks';

import { elections } from '../../../data/elections';
import { ElectionYear, ElectionDataRow } from '../../../data/types';

interface NonVotersToolActions {
  setParty: (party: string) => void;
  setPercentage: (percentage: number) => void;
  setYear: (year: ElectionYear) => void;
}

export interface NonVotersToolState {
  readonly party: string;
  readonly percentage: number;
  readonly year: ElectionYear;
}

export const matcher = /^\/tools\/non-voters\/([0-9]{4})\/([a-z_]{3})\/([0-9.]+)-percent$/;

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
  const [state, setState] = useState<NonVotersToolState>(() => {
    return decode(initialPathname);
  });

  useEffect(() => {
    /**
     *
     */
    function onPopState(event: PopStateEvent): void {
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
    setState(newState);
  }

  return [
    state,
    {
      setParty: (party: string): void => pushState({ party }),
      setPercentage: (percentage: number): void => pushState({ percentage }),
      setYear: (year: ElectionYear): void => {
        if (state.party.slice(0, 1) === '_') {
          return pushState({ year });
        }

        // eslint-disable-next-line security/detect-object-injection
        const parties = elections[year].r.map((row: ElectionDataRow) => row[0]);

        if (parties.includes(state.party)) {
          return pushState({ year });
        }

        pushState({ party: '_no', year });
      }
    }
  ];
}
