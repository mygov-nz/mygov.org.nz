import { FunctionalComponent as FC, Fragment, h, JSX } from 'preact';

import { ElectionYear } from '../../../data/types';
import { CheckBox, Form, NumberInput } from '../../atoms';
import { ComparisonTable, YearSelect } from '../../molecules';

import { getData } from './data';
import styles from './mmp-review-tool.module.scss';
import { usePathnameState } from './state';

export interface MMPReviewToolProps {
  pathname: string;
}

/**
 *
 */
export const MMPReviewTool: FC<MMPReviewToolProps> = (props): JSX.Element => {
  const [state, actions] = usePathnameState(props.pathname);

  const current = getData(state);
  const original = getData({
    overhang: true,
    tagAlong: 1,
    threshold: 5,
    year: state.year
  });

  /**
   *
   * @param event
   */
  function onChangeOverhang(event: Event): void {
    event.preventDefault();
    actions.setOverhang((event.target as HTMLInputElement).checked);
  }

  /**
   *
   * @param event
   */
  function onChangeTagAlong(event: Event): void {
    event.preventDefault();
    actions.setTagAlong((event.target as HTMLInputElement).checked ? 1 : 0);
  }

  /**
   *
   * @param event
   */
  function onChangeTagAlongSeats(event: Event): void {
    event.preventDefault();
    actions.setTagAlong(parseInt((event.target as HTMLInputElement).value, 10));
  }

  /**
   *
   * @param event
   */
  function onChangeThreshold(event: Event): void {
    event.preventDefault();
    actions.setThreshold(parseFloat((event.target as HTMLInputElement).value));
  }

  /**
   *
   * @param event
   */
  function onChangeYear(event: Event): void {
    event.preventDefault();
    actions.setYear((event.target as HTMLInputElement).value as ElectionYear);
  }

  return (
    <Fragment>
      <Form action="/tools/mmp-review" className={styles.form}>
        <YearSelect value={state.year} onChange={onChangeYear} />
        <NumberInput
          id="threshold"
          label="Party vote threshold"
          min={0}
          max={100}
          step={1}
          required={true}
          suffix="%"
          value={state.threshold}
          onChange={onChangeThreshold}
        />
        <CheckBox
          id="overhang"
          label="Allow overhang seats"
          checked={state.overhang}
          onChange={onChangeOverhang}
        />
        <CheckBox
          id="tagAlong"
          label="Electorate tag-along"
          checked={!!state.tagAlong}
          onChange={onChangeTagAlong}
        />
        <NumberInput
          id="tagAlongSeats"
          label="Seats for tag-along"
          readOnly={!state.tagAlong}
          min={1}
          max={120}
          step={1}
          required={true}
          value={state.tagAlong || 1}
          onChange={onChangeTagAlongSeats}
        />
      </Form>
      <ComparisonTable a={original} b={current} />
    </Fragment>
  );
};
