export type ElectionDataRow = Readonly<
  [string, number] | [string, number, number]
>;

export interface ElectionData {
  readonly e: number;
  readonly r: ReadonlyArray<ElectionDataRow>;
  readonly t: number;
  readonly v: number;
}

export type ElectionYear =
  | '2020'
  | '2017'
  | '2014'
  | '2011'
  | '2008'
  | '2005'
  | '2002'
  | '1999'
  | '1996';
