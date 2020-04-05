import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './select.module.scss';

interface SelectProps {
  readonly checked: boolean;
  readonly id: string;
  readonly label: string;
  readonly onChange: (event: Event) => void;
}

/**
 *
 */
export const Select: FC<SelectProps> = (props): JSX.Element => (
  <label className={styles.select} htmlFor={props.id}>
    <input
      type="checkbox"
      value="on"
      checked={props.checked}
      name={props.id}
      id={props.id}
      onChange={props.onChange}
    />
    <span>{props.label}</span>
  </label>
);
