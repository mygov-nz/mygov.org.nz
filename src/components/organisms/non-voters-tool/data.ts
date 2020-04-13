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

    const data = elections[state.year];
    const votes = (data.e - data.v) * (state.percentage / 100);
    const rows = data.r.map(
      (row: ElectionDataRow): DataRow => [row[0], row[1], row[2] || 0]
    );

    const i = rows.findIndex((row: DataRow): row is DataRow => {
      return row[0] === state.party;
    });

    if (i > -1) {
      rows[i][1] = rows[i][1] + votes;
    } else {
      rows.push([state.party, votes, 0]);
    }

    return getResult(rows, {
      seats: 120,
      threshold: 5,
      overhang: true,
      tagAlong: true,
      tagAlongSeats: 1
    });
  },
  { cacheKey: (args) => encode(args[0]) }
);
