import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './check-box.module.scss';

interface CheckBoxProps {
  readonly checked: boolean;
  readonly id: string;
  readonly label: string;
  readonly onChange: (event: Event) => void;
}

/**
 *
 */
export const CheckBox: FC<CheckBoxProps> = (props): JSX.Element => (
  <label className={styles.checkBox} htmlFor={props.id}>
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
