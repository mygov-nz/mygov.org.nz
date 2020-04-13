import mem from 'mem';
import { FunctionalComponent as FC, h, JSX } from 'preact';

import { names } from '../../../../data/parties';

import styles from './name.module.scss';
import { swatches } from './swatches';

interface NameProps {
  readonly id: string;
}

/**
 *
 * @param props
 */
export const Name: FC<NameProps> = mem<[NameProps], JSX.Element, string>(
  (props: NameProps): JSX.Element => (
    <th
      scope="row"
      className={styles.name}
      style={`--swatch:#${swatches[props.id]}`}
    >
      {names[props.id]}
    </th>
  ),
  { cacheKey: (args: NameProps[]) => args[0].id }
);
