import { FunctionalComponent as FC, Fragment, h, JSX } from 'preact';

import { ElectionYear } from '../../../data/types';
import { Form, Slider } from '../../atoms';
import {
  ComparisonTablePlaceholder,
  PartySelect,
  YearSelect
} from '../../molecules';

import './non-voters-tool.scss';
import { Results } from './results';
import { usePathnameState } from './state';

export interface NonVotersToolProps {
  pathname: string;
  placeholder: boolean;
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
   * @param value
   */
  function onChangePercentage(value: number): void {
    actions.setPercentage(value);
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
      <Form action="/tools/non-voters">
        <div className="mg-non-voters-tool__form">
          <YearSelect
            value={state.year}
            readOnly={props.placeholder}
            onChange={onChangeYear}
          />
          <PartySelect
            id="party"
            label="Assign votes to"
            readOnly={props.placeholder}
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
            readOnly={props.placeholder}
            value={state.percentage}
          />
        </div>
      </Form>
      {props.placeholder ? (
        <ComparisonTablePlaceholder />
      ) : (
        <Results {...state} />
      )}
    </Fragment>
  );
};
