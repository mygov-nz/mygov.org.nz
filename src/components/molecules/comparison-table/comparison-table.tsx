import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './comparison-table.module.scss';
import { Difference } from './difference/difference';
import { Row } from './row/row';
import { Value } from './value/value';

type ComparisonTableProps = ComparisonResult;

/**
 *
 */
export const ComparisonTable: FC<ComparisonTableProps> = (
  props
): JSX.Element => (
  <table className={styles.comparisonTable}>
    <colgroup>
      <col width="35%" />
      <col width="13%" className={styles.detailsColumn} />
      <col width="13%" className={styles.detailsColumn} />
      <col width="13%" />
      <col width="13%" />
      <col width="13%" />
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
        <Value value={props.votes} />
        <Value value={props.electorates} />
        <Value value={props.listSeats} />
        <Value value={props.totalSeats} />
        <Difference value={props.totalSeats} />
      </tr>
      <tr>
        <td colSpan={2} />
        <th scope="row" colSpan={2}>
          Gallagher index
        </th>
        <Value value={props.gallagher} />
        <Difference inverse={true} value={props.gallagher} />
      </tr>
    </tfoot>
    <tbody>
      {props.rows.map((row: any) => (
        <Row key={row.id} {...row} />
      ))}
    </tbody>
  </table>
);
