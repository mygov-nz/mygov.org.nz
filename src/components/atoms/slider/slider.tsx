import { FunctionalComponent as FC, h, JSX } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import '../form/form.scss';

import './slider.scss';

interface SliderProps {
  readonly id: string;
  readonly label: string;
  readonly min: number;
  readonly max: number;
  readonly onChange: (value: number) => void;
  readonly readOnly: boolean;
  readonly value: number;
}

/**
 *
 * @param props
 */
export const Slider: FC<SliderProps> = (props): JSX.Element => {
  const slider = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<number>(props.value);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent): void => {
      if (!knob.current || knob.current !== document.activeElement) {
        return;
      }

      if (props.readOnly) {
        return;
      }

      if (![37, 39].includes(event.keyCode)) {
        return;
      }

      setValue((value) => value + (event.keyCode === 39 ? -1 : 1));
    };

    document.addEventListener('keydown', keyDownHandler, { passive: true });

    return (): void => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [props.readOnly]);

  const mouseDownHandler = useCallback(
    (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      if (props.readOnly) {
        return;
      }

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
      document.addEventListener('mouseup', mouseUpHandler, { once: true });
      setDragging(true);
    },
    [slider.current, props.readOnly]
  );

  const touchStartHandler = useCallback(
    (event: TouchEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      if (props.readOnly) {
        return;
      }

      let timeout: NodeJS.Timeout | null = null;

      const touchMoveHandler = (event: TouchEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        if (!slider.current) {
          return;
        }

        const rect = slider.current.getBoundingClientRect();
        const x = Math.round(
          ((event.touches[0].clientX - rect.left) / rect.width) * 100
        );
        const value = Math.max(Math.min(x, 100), 0);

        setValue(value);

        if (timeout) {
          clearTimeout(timeout);
        }

        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        timeout = setTimeout(() => touchEndHandler(event), 1000);
      };

      const touchEndHandler = (event: TouchEvent): void => {
        event.preventDefault();
        event.stopPropagation();

        document.removeEventListener('touchmove', touchMoveHandler);

        if (!slider.current) {
          return;
        }

        const rect = slider.current.getBoundingClientRect();
        const x = Math.round(
          ((event.touches[event.touches.length - 1].clientX - rect.left) /
            rect.width) *
            100
        );
        const value = Math.max(Math.min(x, 100), 0);

        setValue(value);
        setDragging(false);
        props.onChange(value);
      };

      document.addEventListener('touchmove', touchMoveHandler);
      setDragging(true);
    },
    [slider.current, props.readOnly]
  );

  return (
    <label className="mg-field" htmlFor={props.id}>
      <input type="hidden" name={props.id} id={props.id} value={props.value} />
      <span>{props.label}</span>
      <div
        className={'mg-slider ' + (dragging ? 'mg-slider--dragging' : '')}
        aria-orientation="horizontal"
        aria-valuemax={props.max}
        aria-valuemin={props.min}
        aria-valuenow={props.value}
        onMouseDown={mouseDownHandler}
        onTouchStart={touchStartHandler}
        ref={slider}
      >
        <div className="mg-slider__left" style={{ width: value + '%' }} />
        <div className="mg-slider__right" />
        <div
          className="mg-slider__knob"
          style={{ left: value + '%' }}
          tabIndex={0}
          ref={knob}
        />
        <div className="mg-slider__label" style={{ left: value + '%' }}>
          {value + '%'}
        </div>
      </div>
    </label>
  );
};
