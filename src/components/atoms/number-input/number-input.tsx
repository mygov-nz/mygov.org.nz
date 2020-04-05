import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './number-input.module.scss';

interface NumberInputProps {
  readonly disabled: boolean;
  readonly id: string;
  readonly label: string;
  readonly max: number;
  readonly min: number;
  readonly onChange: (event: Event) => void;
  readonly step: number;
  readonly value: string;
}

/**
 *
 */
export const NumberInput: FC<NumberInputProps> = (props): JSX.Element => (
  <label className={styles.numberInput} htmlFor={props.id}>
    <span>{props.label}</span>
    <input
      type="number"
      value={props.value}
      disabled={props.disabled}
      name={props.id}
      id={props.id}
      max={props.max}
      min={props.min}
      step={props.step}
      onChange={props.onChange}
    />
  </label>
);
