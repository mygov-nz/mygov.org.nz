import mem from 'mem';

import { elections } from '../../../data/elections';
import { ElectionDataRow, ElectionYear } from '../../../data/types';
import { ElectionResult, getResult } from '../../../lib/election';

type DataRow = [string, number, number];

/**
 *
 * @param year
 * @param reallocate
 */
export const getData = mem<[ElectionYear, boolean], ElectionResult, string>(
  (year: ElectionYear, reallocate: boolean): ElectionResult => {
    /* eslint-disable security/detect-object-injection */

    const data = {
      ...elections[year],
      r: elections[year].r.map(
        (row: ElectionDataRow): DataRow => [row[0], row[1], row[2] || 0]
      )
    };

    if (reallocate) {
      const act = data.r.findIndex(
        (row: DataRow): row is DataRow => row[0] === 'act'
      );

      const nat = data.r.findIndex(
        (row: DataRow): row is DataRow => row[0] === 'nat'
      );

      data.r[nat][2] = data.r[act][2];
      data.r[act][2] = 0;
    }

    return getResult(data.r, {
      seats: 120,
      threshold: 5,
      overhang: true,
      tagAlong: true,
      tagAlongSeats: 1
    });
  },
  { cacheKey: (args) => [args[0], Number(args[1])].join('-') }
);
