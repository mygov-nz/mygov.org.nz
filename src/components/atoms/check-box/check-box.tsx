import { FunctionalComponent as FC, h, JSX } from 'preact';

import '../form/form.scss';

import './check-box.scss';

interface CheckBoxProps {
  readonly checked: boolean;
  readonly id: string;
  readonly label: string;
  readonly onChange: (event: Event) => void;
  readonly readOnly: boolean;
}

/**
 *
 */
export const CheckBox: FC<CheckBoxProps> = (props): JSX.Element => (
  <label className="mg-field mg-checkbox" htmlFor={props.id}>
    <input
      type="checkbox"
      value="on"
      checked={props.checked}
      name={props.id}
      id={props.id}
      readOnly={props.readOnly}
      onChange={props.onChange}
    />
    <span>{props.label}</span>
  </label>
);
