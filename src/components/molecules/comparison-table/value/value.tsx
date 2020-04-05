import { FunctionalComponent as FC, h, JSX } from 'preact';

interface ValueProps {
  readonly value: number;
}

/**
 *
 */
export const Value: FC<ValueProps> = (props): JSX.Element => (
  <td>{props.value.toLocaleString()}</td>
);
