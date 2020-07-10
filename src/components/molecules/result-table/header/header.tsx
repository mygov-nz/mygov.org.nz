import { FunctionalComponent as FC, h, JSX } from 'preact';

/**
 *
 * @param props
 */
export const Header: FC = (props): JSX.Element => (
  <th scope="col">{props.children}</th>
);
