import mem from 'mem';

import { elections } from '../../../data/elections';
import { ElectionResult, getResult } from '../../../lib/election';

import { encode, MMPReviewToolState } from './state';

/**
 *
 * @param state
 */
export const getData = mem(
  (state: MMPReviewToolState): ElectionResult => {
    return getResult(elections[state.year].r, {
      seats: 120,
      threshold: state.threshold,
      overhang: state.overhang,
      tagAlong: !!state.tagAlong,
      tagAlongSeats: state.tagAlong
    });
  },
  { cacheKey: (args) => encode(args[0]) }
);
