import { FunctionalComponent as FC, h, JSX } from 'preact';

import '../form/form.scss';

import './select.scss';

export interface OptGroup {
  readonly type: 'OPTGROUP';
  readonly label: string;
  readonly options: ReadonlyArray<Option>;
}

export interface Option {
  readonly type: 'OPTION';
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
  readonly readOnly: boolean;
  readonly value: string;
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
  if (item.type === 'OPTION') {
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
  <label className="mg-field" htmlFor={props.id}>
    <span>{props.label}</span>
    <select
      className="mg-select"
      name={props.id}
      id={props.id}
      onChange={props.onChange}
      disabled={props.readOnly}
      required={true}
    >
      {props.options.map((item) => renderItem(item, props.value))}
    </select>
  </label>
);
