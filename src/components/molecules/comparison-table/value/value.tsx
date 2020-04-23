import mem from 'mem';
import { FunctionalComponent as FC, h, JSX } from 'preact';

interface ValueProps {
  readonly value: number;
}

/**
 *
 */
export const Value: FC<ValueProps> = mem<[ValueProps], JSX.Element, number>(
  (props): JSX.Element => <td>{props.value.toLocaleString()}</td>,
  { cacheKey: (args) => args[0].value }
);
