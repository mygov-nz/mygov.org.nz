import { FunctionalComponent as FC, h, JSX } from 'preact';
import { useCallback, useRef, useState } from 'preact/hooks';

import form from '../form/form.module.scss';

import styles from './slider.module.scss';

interface SliderProps {
  readonly id: string;
  readonly label: string;
  readonly min: number;
  readonly max: number;
  readonly onChange: (value: number) => void;
  readonly value: number;
}

/**
 *
 * @param props
 */
export const Slider: FC<SliderProps> = (props): JSX.Element => {
  const slider = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<number>(props.value);

  const mouseDownHandler = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    const mouseMoveHandler = (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      if (!slider.current) {
        return;
      }

      const rect = slider.current.getBoundingClientRect();
      const val = Math.round(((event.clientX - rect.left) / rect.width) * 100);
      const result = Math.max(Math.min(val, 100), 0);

      setValue(result);
    };

    const mouseUpHandler = (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (!slider.current) {
        return;
      }

      const rect = slider.current.getBoundingClientRect();
      const val = Math.round(((event.clientX - rect.left) / rect.width) * 100);
      const result = Math.max(Math.min(val, 100), 0);

      setValue(result);
      props.onChange(result);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  return (
    <label className={form.field} htmlFor={props.id}>
      <input type="hidden" name={props.id} id={props.id} value={props.value} />
      <span>{props.label}</span>
      <div
        className={styles.slider}
        aria-orientation="horizontal"
        aria-valuemax={props.max}
        aria-valuemin={props.min}
        aria-valuenow={props.value}
        onMouseDown={mouseDownHandler}
        ref={slider}
      >
        <div className={styles.left} style={{ width: value + '%' }} />
        <div className={styles.knob} />
        <div className={styles.right} />
      </div>
    </label>
  );
};
