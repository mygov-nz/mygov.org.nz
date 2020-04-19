import { ElectionResult, ElectionResultRow } from '../../../lib/election';

export interface ComparisonRow extends ElectionResultRow {
  readonly difference: number;
}

export interface ComparisonResult extends ElectionResult {
  readonly gallagherDiff: number;
  readonly rows: ReadonlyArray<ComparisonRow>;
  readonly totalSeatDiff: number;
}

/**
 *
 * @param a
 * @param b
 */
export function compare(
  a: ElectionResult,
  b: ElectionResult
): ComparisonResult {
  /* eslint-disable security/detect-object-injection */

  return {
    ...b,
    gallagherDiff: ((b.gallagher - a.gallagher) / a.gallagher) * 100,
    rows: b.rows
      .slice()
      .map(
        (row: ElectionResultRow, i: number): ComparisonRow => ({
          ...row,
          difference:
            b.rows[i].electorates +
            b.rows[i].lists -
            ((a.rows[i] && a.rows[i].electorates) || 0) -
            ((a.rows[i] && a.rows[i].lists) || 0)
        })
      )
      .sort((x: ElectionResultRow, y: ElectionResultRow) => {
        return y.votes - x.votes;
      }),
    totalSeatDiff: b.totalSeats - a.totalSeats
  };
}
