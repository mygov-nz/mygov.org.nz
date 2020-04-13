import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ElectionResult } from '../../../lib/election';

import { compare } from './compare';
import styles from './comparison-table.module.scss';
import { Difference } from './difference/difference';
import { Row } from './row/row';
import { Value } from './value/value';

interface ComparisonTableProps {
  a: ElectionResult;
  b: ElectionResult;
}

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
        <col width="35.0%" />
        <col width="15.0%" className={styles.detailsColumn} />
        <col width="12.5%" className={styles.detailsColumn} />
        <col width="12.5%" />
        <col width="12.5%" />
        <col width="12.5%" />
      </colgroup>
      <thead>
        <tr>
          <th />
          <th scope="col">Votes</th>
          <th scope="col">Electorates</th>
          <th scope="col">
            List <span>seats</span>
          </th>
          <th scope="col">
            Total <span>seats</span>
          </th>
          <th scope="col">
            Diff<span>erence</span>
          </th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td />
          <Value value={data.votes} />
          <Value value={data.electorates} />
          <Value value={data.listSeats} />
          <Value value={data.totalSeats} />
          <Difference value={data.totalSeats} />
        </tr>
        <tr>
          <td colSpan={2} />
          <th scope="row" colSpan={2}>
            Gallagher index
          </th>
          <Value value={data.gallagher} />
          <Difference inverse={true} value={data.gallagher} />
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
