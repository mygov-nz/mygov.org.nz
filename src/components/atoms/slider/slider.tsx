import { FunctionalComponent as FC, h, JSX } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

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
  const knob = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  let x = 0;
  let y = 0;
  let leftWidth = 0;

  const mouseMoveHandler = (event: MouseEvent): void => {
    if (!slider.current || !knob.current || !left.current || !right.current) {
      return;
    }

    const dx = event.clientX - x;

    const containerWidth = slider.current.getBoundingClientRect().width;
    let newLeftWidth = ((leftWidth + dx) * 100) / containerWidth;
    newLeftWidth = Math.max(newLeftWidth, 0);
    newLeftWidth = Math.min(newLeftWidth, 100);

    console.log(newLeftWidth);

    left.current.style.width = newLeftWidth + '%';

    left.current.style.userSelect = 'none';
    left.current.style.pointerEvents = 'none';

    right.current.style.userSelect = 'none';
    right.current.style.pointerEvents = 'none';
  };

  const mouseUpHandler = (): void => {
    if (!left.current || !right.current) {
      return;
    }

    left.current.style.removeProperty('user-select');
    left.current.style.removeProperty('pointer-events');

    right.current.style.removeProperty('user-select');
    right.current.style.removeProperty('pointer-events');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const mouseDownHandler = (event: MouseEvent): void => {
    if (!left.current) {
      return;
    }

    x = event.clientX;
    y = event.clientY;
    leftWidth = left.current.getBoundingClientRect().width;

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
      >
        <div className={styles.left} ref={left} />
        <div className={styles.knob} ref={knob} />
        <div className={styles.right} ref={right} />
      </div>
    </label>
  );
};
