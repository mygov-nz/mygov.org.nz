import { FunctionalComponent as FC, h, JSX } from 'preact';

import { names } from '../../../../data/names';

import { swatches } from './swatches';

interface NameProps {
  readonly id: string;
}

/**
 *
 * @param props
 */
export const Name: FC<NameProps> = (props: NameProps): JSX.Element => (
  <th scope="row" data-swatch={swatches[props.id]}>
    {names[props.id]}
  </th>
);
