import { FunctionalComponent as FC, Fragment, h, JSX } from 'preact';

import { ElectionYear } from '../../../data/types';
import { Form, Slider } from '../../atoms';
import { ComparisonTable, PartySelect, YearSelect } from '../../molecules';

import { getData } from './data';
import styles from './non-voters-tool.module.scss';
import { usePathnameState } from './state';

export interface NonVotersToolProps {
  pathname: string;
}

/**
 *
 */
export const NonVotersTool: FC<NonVotersToolProps> = (props): JSX.Element => {
  const [state, actions] = usePathnameState(props.pathname);

  const current = getData(state);
  const original = getData({ party: '_no', percentage: 0, year: state.year });

  /**
   *
   * @param event
   */
  function onChangeParty(event: Event): void {
    event.preventDefault();
    actions.setParty((event.target as HTMLInputElement).value);
  }

  /**
   *
   * @param event
   */
  function onChangePercentage(event: Event): void {
    event.preventDefault();
    actions.setPercentage(parseFloat((event.target as HTMLInputElement).value));
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
      <Form action="/tools/non-voters" className={styles.form}>
        <YearSelect value={state.year} onChange={onChangeYear} />
        <PartySelect
          id="party"
          label="Assign votes to"
          required={true}
          year={state.year}
          value={state.party}
          onChange={onChangeParty}
        />
        <Slider
          id="percentage"
          label="Percentage"
          min={0}
          max={100}
          onChange={onChangePercentage}
          value={state.percentage}
        />
      </Form>
      <ComparisonTable a={original} b={current} />
    </Fragment>
  );
};
