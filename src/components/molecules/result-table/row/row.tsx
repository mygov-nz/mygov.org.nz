import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ElectionResultRow } from '../../../../lib/election';
import { Name } from '../../result-table/name/name';
import { Value } from '../../result-table/value/value';

import './row.scss';

interface RowAttributes {
  className?: string;
}

/**
 *
 * @param props
 */
export const Row: FC<ElectionResultRow> = (props): JSX.Element => {
  const attributes: RowAttributes = {};

  if (props.electorates || props.lists) {
    attributes.className = 'mg-has-seats';
  }

  return (
    <tr {...attributes}>
      <Name id={props.id} />
      <Value value={props.votes} />
      <Value value={props.electorates} />
      <Value value={props.lists} />
      <Value value={props.electorates + props.lists} />
      {props.children}
    </tr>
  );
};
