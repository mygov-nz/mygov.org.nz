import { FunctionalComponent as FC, h, JSX } from 'preact';

import { field } from '../form/form.module.scss';

import styles from './slider.module.scss';

interface SliderProps {
  readonly id: string;
  readonly label: string;
  readonly onChange: (event: Event) => void;
  readonly value?: string;
}

/**
 *
 * @param props
 */
export const Slider: FC<SliderProps> = (props): JSX.Element => {
  return (
    <label className={field} htmlFor={props.id}>
      //
      <span>{props.label}</span>
    </label>
  );
};
