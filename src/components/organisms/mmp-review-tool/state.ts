import { createBrowserHistory } from 'history';
import mem from 'mem';
import { useEffect, useState } from 'preact/hooks';

import { ElectionYear } from '../../../data/types';

interface MMPReviewToolActions {
  setOverhang: (overhang: boolean) => void;
  setTagAlong: (tagAlong: number) => void;
  setThreshold: (threshold: number) => void;
  setYear: (year: ElectionYear) => void;
}

export interface MMPReviewToolState {
  readonly overhang: boolean;
  readonly tagAlong: number;
  readonly threshold: number;
  readonly year: ElectionYear;
}

export const matcher = /^\/tools\/mmp-review\/([0-9]{4})\/([0-9.]+)-percent-threshold\/(no-)?overhang\/(no|([0-9]+)-seat)-tagalong$/;

/**
 *
 * @param pathname
 */
const decode = mem(
  (pathname: string): MMPReviewToolState => {
    const bits = pathname.match(matcher);

    if (!bits) {
      return {
        overhang: true,
        tagAlong: 1,
        threshold: 5,
        year: '2017'
      };
    }

    return {
      overhang: bits[3] !== 'no-',
      tagAlong: bits[4] === 'no' ? 0 : parseInt(bits[5], 10),
      threshold: parseFloat(bits[2]),
      year: bits[1] as ElectionYear
    };
  }
);

/**
 *
 * @param state
 */
export function encode(state: MMPReviewToolState): string {
  const bits = [
    state.year,
    state.threshold.toLocaleString() + '-percent-threshold',
    (state.overhang ? '' : 'no-') + 'overhang',
    (state.tagAlong ? state.tagAlong.toLocaleString() + '-seat' : 'no') +
      '-tagalong'
  ];

  return '/tools/mmp-review/' + bits.join('/');
}

/**
 *
 * @param initialPath
 */
export function usePathnameState(
  initialPathname: string
): [MMPReviewToolState, MMPReviewToolActions] {
  const [state, setState] = useState<MMPReviewToolState>(() => {
    return decode(initialPathname);
  });

  const history = createBrowserHistory<MMPReviewToolState>();

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
  function updateState(update: Partial<MMPReviewToolState>): void {
    setState((prevState) => {
      const nextState: MMPReviewToolState = { ...prevState, ...update };
      history.push(encode(nextState), nextState);
      return nextState;
    });
  }

  return [
    state,
    {
      setOverhang: (overhang: boolean): void => updateState({ overhang }),
      setTagAlong: (tagAlong: number): void => updateState({ tagAlong }),
      setThreshold: (threshold: number): void => updateState({ threshold }),
      setYear: (year: ElectionYear): void => updateState({ year })
    }
  ];
}
