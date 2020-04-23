import { createBrowserHistory } from 'history';
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
        percentage: 50,
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
  const bits = [
    props.year,
    props.party,
    props.percentage.toLocaleString() + '-percent'
  ];

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

  const history = createBrowserHistory<NonVotersToolState>();

  useEffect(() => {
    const unlisten = history.listen((location): void => {
      setState(location.state || decode(location.pathname));
    });

    return (): void => unlisten();
  }, []);

  /**
   *
   * @param update
   */
  function updateState(update: Partial<NonVotersToolState>): void {
    setState((prevState) => {
      const nextState: NonVotersToolState = { ...prevState, ...update };
      history.push(encode(nextState), nextState);
      return nextState;
    });
  }

  return [
    state,
    {
      setParty: (party: string): void => updateState({ party }),
      setPercentage: (percentage: number): void => updateState({ percentage }),
      setYear: (year: ElectionYear): void => {
        if (state.party.slice(0, 1) === '_') {
          return updateState({ year });
        }

        // eslint-disable-next-line security/detect-object-injection
        const parties = elections[year].r.map((row: ElectionDataRow) => row[0]);

        if (parties.includes(state.party)) {
          return updateState({ year });
        }

        updateState({ party: '_no', year });
      }
    }
  ];
}
