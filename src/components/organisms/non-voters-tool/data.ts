import mem from 'mem';

import { elections } from '../../../data/elections';
import { ElectionDataRow } from '../../../data/types';
import { ElectionResult, getResult } from '../../../lib/election';

import { encode, NonVotersToolState } from './state';

type DataRow = [string, number, number];

/**
 *
 * @param state
 */
export const getData = mem<[NonVotersToolState], ElectionResult, string>(
  (state: NonVotersToolState): ElectionResult => {
    /* eslint-disable security/detect-object-injection */

    const data = {
      ...elections[state.year],
      r: elections[state.year].r.map(
        (row: ElectionDataRow): DataRow => [row[0], row[1], row[2] || 0]
      )
    };

    const votes = Math.round((data.e - data.v) * (state.percentage / 100));
    data.e = data.e - votes;
    data.v = data.v + votes;

    if (state.party !== '_no') {
      const i = data.r.findIndex((row: DataRow): row is DataRow => {
        return row[0] === state.party;
      });

      if (i > -1) {
        data.r[i][1] = data.r[i][1] + votes;
      } else {
        data.r.push([state.party, votes, 0]);
      }
    }

    return getResult(data.r, {
      seats: 120,
      threshold: 5,
      overhang: true,
      tagAlong: true,
      tagAlongSeats: 1
    });
  },
  { cacheKey: (args) => encode(args[0]) }
);
