import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ElectionResult } from '../../../lib/election';

import { Header } from './header/header';
import styles from './result-table.module.scss';
import { Row } from './row/row';
import { Value } from './value/value';

/**
 *
 * @param props
 */
export const ResultTable: FC<ElectionResult> = (props): JSX.Element => {
  return (
    <table className={styles.resultTable}>
      <colgroup>
        <col width="37.5%" />
        <col width="17.5%" />
        <col width="15.0%" />
        <col width="15.0%" />
        <col width="15.0%" />
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
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td />
          <Value value={props.votes} />
          <Value value={props.electorates} />
          <Value value={props.listSeats} />
          <Value value={props.totalSeats} />
        </tr>
        <tr>
          <td colSpan={2} />
          <th scope="row" colSpan={2}>
            Gallagher index
          </th>
          <Value value={props.gallagher} />
        </tr>
      </tfoot>
      <tbody>
        {props.rows.map((row: any) => (
          <Row key={row.id} {...row} />
        ))}
      </tbody>
    </table>
  );
};
