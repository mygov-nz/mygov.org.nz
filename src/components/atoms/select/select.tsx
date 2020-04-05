import { FunctionalComponent as FC, h, JSX } from 'preact';

import { field } from '../form/form.module.scss';

import styles from './select.module.scss';

interface OptionProps {
  label: string;
  selected: boolean;
  value: string;
}

interface SelectProps {
  readonly checked: boolean;
  readonly id: string;
  readonly label: string;
  readonly onChange: (event: Event) => void;
  readonly options: Readonly<Record<string, string>>;
  readonly required?: boolean;
  readonly value?: string;
}

/**
 *
 * @param props
 */
const Option: FC<OptionProps> = (props): JSX.Element => (
  <option value={props.value} selected={props.selected}>
    {props.label}
  </option>
);

/**
 *
 * @param props
 */
export const Select: FC<SelectProps> = (props): JSX.Element => {
  /* eslint-disable security/detect-object-injection */

  return (
    <label className={field} htmlFor={props.id}>
      <select
        className={styles.select}
        name={props.id}
        id={props.id}
        onChange={props.onChange}
        require={props.required}
      >
        {Object.keys(props.options).map((value) => (
          <Option
            key={value}
            value={value}
            selected={value === props.value}
            label={props.options[value]}
          />
        ))}
      </select>
      <span>{props.label}</span>
    </label>
  );
};
