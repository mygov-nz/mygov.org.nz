import mem from 'mem';
import { FunctionalComponent as FC, h, JSX } from 'preact';

import './difference.scss';

interface DifferenceProps {
  readonly inverse?: boolean;
  readonly suffix?: string;
  readonly value: number;
}

/**
 *
 */
export const Difference: FC<DifferenceProps> = mem(
  (props: DifferenceProps): JSX.Element => {
    if (!props.value) {
      return <td />;
    }

    const value = (props.value > 0 ? '+' : '') + props.value.toLocaleString();
    const className =
      props.value * (props.inverse ? -1 : 1) > 0 ? 'positive' : 'negative';

    return (
      <td className={'mg-difference--' + className}>
        {value + (props.suffix || '')}
      </td>
    );
  },
  {
    cacheKey: (args) => {
      return [
        args[0].inverse ? 'i' : '',
        args[0].value,
        args[0].suffix || ''
      ].join('');
    }
  }
);
