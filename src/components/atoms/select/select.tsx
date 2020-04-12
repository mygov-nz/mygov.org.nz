import { FunctionalComponent as FC, h, JSX } from 'preact';

import form from '../form/form.module.scss';

import styles from './select.module.scss';

export enum OptType {
  OPTGROUP,
  OPTION
}

export interface OptGroup {
  readonly type: OptType.OPTGROUP;
  readonly label: string;
  readonly options: ReadonlyArray<Option>;
}

export interface Option {
  readonly type: OptType.OPTION;
  readonly label: string;
  readonly value: string;
}

interface OptGroupProps {
  readonly label: string;
}

interface OptionProps extends Option {
  readonly selected: boolean;
}

interface SelectProps {
  readonly id: string;
  readonly label: string;
  readonly onChange: (event: Event) => void;
  readonly options: ReadonlyArray<OptGroup | Option>;
  readonly required?: boolean;
  readonly value?: string;
}

/**
 *
 * @param props
 */
const OptGroup: FC<OptGroupProps> = (props): JSX.Element => (
  <optgroup label={props.label}>{props.children}</optgroup>
);

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
 * @param item
 * @param value
 */
function renderItem(item: OptGroup | Option, value?: string): JSX.Element {
  if (item.type === OptType.OPTION) {
    return (
      <option
        key={item.value}
        value={item.value}
        selected={item.value === value}
      >
        {item.label}
      </option>
    );
  }

  return (
    <OptGroup key={item.label} label={item.label}>
      {item.options.map((item) => renderItem(item, value))}
    </OptGroup>
  );
}

/**
 *
 * @param props
 */
export const Select: FC<SelectProps> = (props): JSX.Element => (
  <label className={form.field} htmlFor={props.id}>
    <span>{props.label}</span>
    <select
      className={styles.select}
      name={props.id}
      id={props.id}
      onChange={props.onChange}
      required={props.required}
    >
      {props.options.map((item) => renderItem(item, props.value))}
    </select>
  </label>
);
