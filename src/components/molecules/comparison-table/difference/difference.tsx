import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './difference.module.scss';

interface DifferenceProps {
  readonly inverse?: boolean;
  readonly value: number;
}

/**
 *
 */
export const Difference: FC<DifferenceProps> = (
  props: DifferenceProps
): JSX.Element => {
  if (!props.value) {
    return <td />;
  }

  const value = (props.value > 0 ? '+' : '') + props.value.toLocaleString();
  const className: string =
    props.value * (props.inverse ? -1 : 1) > 1
      ? styles.positiveDifference
      : styles.negativeDifference;

  return <td className={className}>{value}</td>;
};
