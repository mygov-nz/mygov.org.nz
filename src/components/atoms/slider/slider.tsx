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
  const [dragging, setDragging] = useState<boolean>(false);

  const mouseDownHandler = useCallback(
    (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      const mouseMoveHandler = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        if (!slider.current) {
          return;
        }

        const rect = slider.current.getBoundingClientRect();
        const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
        const value = Math.max(Math.min(x, 100), 0);

        setValue(value);
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
        const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
        const value = Math.max(Math.min(x, 100), 0);

        setValue(value);
        setDragging(false);
        props.onChange(value);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
      setDragging(true);
    },
    [slider.current]
  );

  return (
    <label className={form.field} htmlFor={props.id}>
      <input type="hidden" name={props.id} id={props.id} value={props.value} />
      <span>{props.label}</span>
      <div
        className={styles.slider + ' ' + (dragging ? styles.dragging : '')}
        aria-orientation="horizontal"
        aria-valuemax={props.max}
        aria-valuemin={props.min}
        aria-valuenow={props.value}
        onMouseDown={mouseDownHandler}
        ref={slider}
      >
        <div className={styles.left} style={{ width: value + '%' }} />
        <div className={styles.right} />
        <div className={styles.knob} style={{ left: value + '%' }} />
        <div className={styles.label} style={{ left: value + '%' }}>
          {value + '%'}
        </div>
      </div>
    </label>
  );
};
