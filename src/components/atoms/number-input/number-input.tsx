import { FunctionalComponent as FC, h, JSX } from 'preact';

import form from '../form/form.module.scss';

import styles from './number-input.module.scss';

interface NumberInputProps {
  readonly readOnly?: boolean;
  readonly id: string;
  readonly label: string;
  readonly max: number;
  readonly min: number;
  readonly onChange: (event: Event) => void;
  readonly required?: boolean;
  readonly step: number;
  readonly suffix?: string;
  readonly value: number;
}

/**
 *
 */
export const NumberInput: FC<NumberInputProps> = (props): JSX.Element => {
  const classNames = [styles.numberInput];

  if (props.suffix) {
    classNames.push(styles.withSuffix);
  }

  return (
    <label className={form.field} htmlFor={props.id}>
      <span>{props.label}</span>
      <div className={classNames.join(' ')}>
        <input
          type="number"
          value={props.value}
          readOnly={props.readOnly}
          name={props.id}
          id={props.id}
          max={props.max}
          min={props.min}
          step={props.step}
          required={props.required}
          onChange={props.onChange}
        />
        {Boolean(props.suffix) && (
          <div className={styles.suffix}>{props.suffix}</div>
        )}
      </div>
    </label>
  );
};
