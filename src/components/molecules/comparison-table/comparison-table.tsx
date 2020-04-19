import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ElectionResult } from '../../../lib/election';

import { compare } from './compare';
import styles from './comparison-table.module.scss';
import { Difference } from './difference/difference';
import { Row } from './row/row';
import { Value } from './value/value';

interface ColumnProps {
  className?: string;
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
const Column: FC<ColumnProps> = (props): JSX.Element => (
  <col width="12.5%" {...props} />
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
 */
export const ComparisonTable: FC<ComparisonTableProps> = (
  props
): JSX.Element => {
  const data = compare(props.a, props.b);

  return (
    <table className={styles.comparisonTable}>
      <colgroup>
        <Column width="35.0%" />
        <Column width="15.0%" />
        <Column />
        <Column />
        <Column />
        <Column />
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
          <td>{(data.totalSeatDiff > 0 ? '+' : '') + data.totalSeatDiff}</td>
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
