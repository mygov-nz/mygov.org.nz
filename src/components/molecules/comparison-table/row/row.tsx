import { FunctionalComponent as FC, h, JSX } from 'preact';

import { Row as BaseRow } from '../../result-table/row/row';
import { ComparisonRow } from '../compare';
import { Difference } from '../difference/difference';

/**
 *
 * @param props
 */
export const Row: FC<ComparisonRow> = (props): JSX.Element => (
  <BaseRow {...props}>
    <Difference value={props.difference} />
  </BaseRow>
);
