import calculateGallagherIndex from 'gallagher';
import saintLague from 'saintelague';

import { ElectionDataRow } from '../data/types';

interface ElectionOptions {
  readonly seats: number;
  readonly threshold: number;
  readonly overhang: boolean;
  readonly tagAlong: boolean;
  readonly tagAlongSeats: number;
}

export interface ElectionResultRow {
  readonly id: string;
  readonly electorates: number;
  readonly lists: number;
  readonly votes: number;
}

export interface ElectionResult {
  readonly electorates: number;
  readonly gallagher: number;
  readonly listSeats: number;
  readonly rows: ReadonlyArray<ElectionResultRow>;
  readonly totalSeats: number;
  readonly votes: number;
}

/**
 *
 * @param rows
 * @param options
 */
export function getResult(
  rows: ReadonlyArray<ElectionDataRow>,
  options: Partial<ElectionOptions> = {}
): ElectionResult {
  const opts: ElectionOptions = {
    seats: 120,
    threshold: 5,
    overhang: true,
    tagAlong: true,
    tagAlongSeats: 1,
    ...options
  };

  const parties = rows.map((row) => ({
    electorates: row[2] || 0,
    id: row[0],
    votes: row[1],
    listSize: row[0] === '_nn' ? 0 : undefined
  }));

  const results = saintLague(parties, {
    ...opts,
    threshold: opts.threshold / 100
  });

  return {
    electorates: results.reduce((a: number, b: any) => a + b.electorates, 0),
    gallagher: calculateGallagherIndex(
      results.map((row: ElectionResultRow) => ({
        seats: row.electorates + row.lists,
        votes: row.votes
      }))
    ),
    listSeats: results.reduce((a: number, b: any) => a + b.lists, 0),
    rows: results,
    totalSeats: results.reduce(
      (a: number, b: any) => a + b.electorates + b.lists,
      0
    ),
    votes: parties.reduce((a: number, b: any) => a + b.votes, 0)
  };
}
