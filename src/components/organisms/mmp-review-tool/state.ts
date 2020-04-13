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
    state.threshold + '-percent-threshold',
    (state.overhang ? '' : 'no-') + 'overhang',
    (state.tagAlong ? state.tagAlong + '-seat' : 'no') + '-tagalong'
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
  function pushState(update: Partial<MMPReviewToolState>): void {
    const newState: MMPReviewToolState = { ...state, ...update };

    history.pushState(newState, document.title, encode(newState));
    setState(newState);
  }

  return [
    state,
    {
      setOverhang: (overhang: boolean): void => pushState({ overhang }),
      setTagAlong: (tagAlong: number): void => pushState({ tagAlong }),
      setThreshold: (threshold: number): void => pushState({ threshold }),
      setYear: (year: ElectionYear): void => pushState({ year })
    }
  ];
}
