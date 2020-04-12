export {};

declare module 'assets.json' {
  const value: Record<string, string>;

  export = value;
}

declare const ENVIRONMENT: string;

declare const RELEASE: string;

declare global {
  interface ComparisonRow extends ElectionRow {
    readonly difference: number;
  }

  interface ComparisonResult extends ElectionResult {
    readonly gallagherDiff: number;
    readonly rows: ReadonlyArray<ComparisonRow>;
    readonly totalDiff: number;
  }

  interface Context {
    readonly url: URL;
  }

  interface ElectionData {
    readonly e: number;
    readonly r: ReadonlyArray<ElectionDataRow>;
    readonly t: number;
    readonly v: number;
  }

  type ElectionDataRow = Readonly<[string, number] | [string, number, number]>;

  interface ElectionResult {
    readonly electorates: number;
    readonly gallagher: number;
    readonly listSeats: number;
    readonly rows: ReadonlyArray<ElectionRow>;
    readonly totalSeats: number;
    readonly votes: number;
  }

  interface ElectionRow {
    readonly id: string;
    readonly electorates: number;
    readonly lists: number;
  }

  type ElectionYear =
    | '1996'
    | '1999'
    | '2002'
    | '2005'
    | '2008'
    | '2011'
    | '2014'
    | '2017';
}
