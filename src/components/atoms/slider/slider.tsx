import { FunctionalComponent as FC, h, JSX } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import form from '../form/form.module.scss';

import styles from './slider.module.scss';

interface SliderProps {
  readonly id: string;
  readonly label: string;
  readonly min: number;
  readonly max: number;
  readonly onChange: (event: Event) => void;
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
  const [knobOffset, setKnobOffset] = useState<number>(0);

  const onMouseDown = (event: MouseEvent): void => {
    if (!knob.current) {
      console.log(knob.current);
      return;
    }

    setDragging(true);
    setKnobOffset(event.clientX - knob.current.offsetLeft);
  };

  useEffect(() => {
    /**
     *
     * @param event
     */
    function onMouseMove(event: MouseEvent): void {
      if (!dragging || !track.current || !knob.current) {
        return;
      }

      const maxRight = track.current.offsetWidth - knob.current.offsetWidth;
      let offset: number =
        event.clientX - track.current.offsetLeft - knobOffset;

      if (offset < 0) {
        offset = 0;
      } else if (offset > maxRight) {
        offset = maxRight;
      }

      console.log(offset);
    }

    /**
     *
     * @param event
     */
    function onMouseUp(): void {
      setDragging(false);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return (): void => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

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
      >
        <div className={styles.track} ref={track}>
          <div className={styles.fill} style={{ width: props.value + '%' }} />
        </div>
        <div
          className={styles.knob}
          style={{ left: props.value + '%' }}
          ref={knob}
          onMouseDown={onMouseDown}
        >
          <div />
        </div>
      </div>
    </label>
  );
};
