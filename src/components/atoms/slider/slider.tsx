import { FunctionalComponent as FC, h, JSX } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

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
  const knob = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  function onMouseDown(event: MouseEvent): void {
    if (!knob.current) {
      return;
    }

    setDragging(true);
    setOffset(event.clientX - knob.current.offsetLeft);
  }

  function onMouseMove(event: MouseEvent): void {
    if (!dragging || !track.current || !knob.current) {
      return;
    }

    const maxRight = track.current.offsetWidth - knob.current.offsetWidth;
    let o: number = event.clientX - track.current.offsetLeft - offset;

    if (o < 0) {
      o = 0;
    } else if (o > maxRight) {
      o = maxRight;
    }

    props.onChange((o / maxRight) * 100);
  }

  function onMouseUp(): void {
    setDragging(false);
  }

  return (
    <label
      className={form.field}
      htmlFor={props.id}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <input type="hidden" name={props.id} id={props.id} value={props.value} />
      <span>{props.label}</span>
      <div
        className={styles.slider}
        aria-orientation="horizontal"
        aria-valuemax={props.max}
        aria-valuemin={props.min}
        aria-valuenow={props.value}
      >
        <div className={styles.track} ref={track}>
          <div className={styles.fill} style={{ width: props.value + '%' }} />
        </div>
        <div
          className={styles.knob}
          style={{ left: props.value + '%' }}
          ref={knob}
        >
          <div />
        </div>
      </div>
    </label>
  );
};
