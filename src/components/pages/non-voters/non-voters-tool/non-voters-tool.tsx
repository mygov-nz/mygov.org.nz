import { FunctionalComponent as FC, Fragment, h, JSX } from 'preact';

import { Form, Slider } from '../../../atoms';
import { PartySelect, YearSelect } from '../../../molecules';

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
          value={state.year}
          onChange={onChangeParty}
        />
        <Slider
          id="percentage"
          label="Percentage"
          min={0}
          max={100}
          onChange={onChangePercentage}
          value={50}
        />
      </Form>
    </Fragment>
  );
};
