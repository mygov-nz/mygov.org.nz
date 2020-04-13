import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ComparisonRow } from '../compare';
import { Difference } from '../difference/difference';
import { Name } from '../name/name';
import { Value } from '../value/value';

import styles from './row.module.scss';

interface RowAttributes {
  className?: string;
}

/**
 *
 */
export const Row: FC<ComparisonRow> = (props): JSX.Element => {
  const attributes: RowAttributes = {};

  if (props.electorates || props.lists) {
    attributes.className = styles.hasSeats;
  }

  return (
    <tr {...attributes}>
      <Name id={props.id} />
      <Value value={props.votes} />
      <Value value={props.electorates} />
      <Value value={props.lists} />
      <Value value={props.electorates + props.lists} />
      <Difference value={props.difference} />
    </tr>
  );
};
