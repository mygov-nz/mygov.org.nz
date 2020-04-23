import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ElectionResult } from '../../../lib/election';

import { compare } from './compare';
import styles from './comparison-table.module.scss';
import { Difference } from './difference/difference';
import { Row } from './row/row';
import { Value } from './value/value';

interface ColumnProps {
  width?: string;
}

interface ComparisonTableProps {
  a: ElectionResult;
  b: ElectionResult;
}

/**
 *
 * @param props
 */
const Header: FC = (props): JSX.Element => (
  <th scope="col">{props.children}</th>
);

/**
 *
 */
export const ComparisonTable: FC<ComparisonTableProps> = (
  props
): JSX.Element => {
  const data = compare(props.a, props.b);
  const seatDiff = data.totalSeatDiff;

  return (
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
          <Value value={data.votes} />
          <Value value={data.electorates} />
          <Value value={data.listSeats} />
          <Value value={data.totalSeats} />
          <td>
            {(seatDiff > 0 ? '+' : '') + (seatDiff === 0 ? '' : seatDiff)}
          </td>
        </tr>
        <tr>
          <td colSpan={2} />
          <th scope="row" colSpan={2}>
            Gallagher index
          </th>
          <Value value={data.gallagher} />
          <Difference inverse={true} suffix="%" value={data.gallagherDiff} />
        </tr>
      </tfoot>
      <tbody>
        {data.rows.map((row: any) => (
          <Row key={row.id} {...row} />
        ))}
      </tbody>
    </table>
  );
};
