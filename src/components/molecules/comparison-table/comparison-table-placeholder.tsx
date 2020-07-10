import mem from 'mem';
import { FunctionalComponent as FC, h, JSX } from 'preact';

import { Header } from '../result-table/header/header';
import {
  Cell,
  Row as BaseRow,
  rows
} from '../result-table/result-table-placeholder';
import resultTableStyles from '../result-table/result-table.module.scss';

import styles from './comparison-table.module.scss';

interface RowProps {
  success: boolean;
  widths: number[];
}

const classNames = [resultTableStyles.resultTable, styles.comparisonTable];

/**
 *
 * @param props
 */
const Row: FC<RowProps> = (props): JSX.Element => (
  <BaseRow {...props}>
    <td />
  </BaseRow>
);

/**
 *
 */
export const ComparisonTablePlaceholder: FC = mem(
  (): JSX.Element => (
    <table className={classNames.join(' ')}>
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
