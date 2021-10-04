import { FunctionalComponent as FC, h, JSX } from 'preact';

import '../form/form.scss';

import './number-input.scss';

interface NumberInputProps {
  readonly id: string;
  readonly label: string;
  readonly max: number;
  readonly min: number;
  readonly onChange: (event: Event) => void;
  readonly readOnly: boolean;
  readonly step: number;
  readonly suffix?: string;
  readonly value: number;
}

/**
 *
 */
export const NumberInput: FC<NumberInputProps> = (props): JSX.Element => {
  const classNames = ['mg-number-input'];

  if (props.suffix) {
    classNames.push('mg-number-input--with-suffix');
  }

  return (
    <label className="mg-field" htmlFor={props.id}>
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
          required={!props.readOnly}
          onChange={props.onChange}
        />
        {Boolean(props.suffix) && (
          <div className="mg-number-input__suffix">{props.suffix}</div>
        )}
      </div>
    </label>
  );
};
