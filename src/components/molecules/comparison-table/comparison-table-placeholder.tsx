import mem from 'mem';
import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './comparison-table.module.scss';
import rowStyles from './row/row.module.scss';

interface CellProps {
  width: number;
}

interface RowProps {
  success: boolean;
  widths: number[];
}

const rows: number[][] = [
  [6.5, 4.5, 1, 1, 1],
  [7, 4, 1, 1, 1],
  [11.5, 4],
  [5.5, 4],
  [11.5, 3],
  [5.5, 3],
  [8.5, 3],
  [16],
  [8.5],
  [2.5],
  [4.5],
  [13.5],
  [6.5],
  [9, 1.5],
  [8, 1.5]
];

/**
 *
 * @param props
 */
const Cell: FC<CellProps> = mem(
  (props): JSX.Element => (
    <td>
      <span
        className={styles.skeleton}
        style={{ width: props.width + 'rem' }}
      />
    </td>
  ),
  { cacheKey: JSON.stringify }
);

/**
 *
 * @param props
 */
const Header: FC = (props): JSX.Element => (
  <th scope="col">{props.children}</th>
);

/**
 *
 * @param props
 */
const Row: FC<RowProps> = (props): JSX.Element => (
  <tr className={props.success ? rowStyles.hasSeats : ''}>
    <th>
      <span
        className={styles.skeleton}
        style={{ width: props.widths[0] + 'rem' }}
      />
    </th>
    <td>
      <span
        className={styles.skeleton}
        style={{ width: (props.widths[1] || 2.5) + 'rem' }}
      />
    </td>
    <td>
      <span
        className={styles.skeleton}
        style={{ width: (props.widths[2] || 0.5) + 'rem' }}
      />
    </td>
    <td>
      <span
        className={styles.skeleton}
        style={{ width: (props.widths[3] || 0.5) + 'rem' }}
      />
    </td>
    <td>
      <span
        className={styles.skeleton}
        style={{ width: (props.widths[4] || 0.5) + 'rem' }}
      />
    </td>
    <td />
  </tr>
);

/**
 *
 */
export const ComparisonTablePlaceholder: FC = mem(
  (): JSX.Element => (
    <table className={styles.comparisonTable}>
      <colgroup>
        <col width="35.0%" />
        <col width="15.0%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
      </colgroup>
      <thead>
        <tr>
          <th />
          <Header>Votes</Header>
          <Header>Electorates</Header>
          <Header>
            List <span>seats</span>
          </Header>
          <Header>
            Total <span>seats</span>
          </Header>
          <Header>
            Diff<span>erence</span>
          </Header>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td />
          <Cell width={4.5} />
          <Cell width={1} />
          <Cell width={1} />
          <Cell width={1.5} />
          <td />
        </tr>
        <tr>
          <td colSpan={2} />
          <th scope="row" colSpan={2}>
            Gallagher index
          </th>
          <Cell width={2} />
          <td />
        </tr>
      </tfoot>
      <tbody>
        {rows.map((row: number[], i: number) => (
          <Row key={i} success={i < 3} widths={row} />
        ))}
      </tbody>
    </table>
  )
);
