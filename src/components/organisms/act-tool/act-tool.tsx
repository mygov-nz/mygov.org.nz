import { FunctionalComponent as FC, Fragment, h, JSX } from 'preact';

import { ElectionYear } from '../../../data/types';
import { Form } from '../../atoms';
import { ComparisonTablePlaceholder, YearSelect } from '../../molecules';

import { Results } from './results';
import { usePathnameState } from './state';

export interface ActToolProps {
  pathname: string;
  placeholder: boolean;
}

/**
 *
 */
export const ActTool: FC<ActToolProps> = (props): JSX.Element => {
  const [year, setYear] = usePathnameState(props.pathname);

  /**
   *
   * @param event
   */
  function onChangeYear(event: Event): void {
    event.preventDefault();
    setYear((event.target as HTMLInputElement).value as ElectionYear);
  }

  return (
    <Fragment>
      <Form action="/tools/act">
        <YearSelect
          value={year}
          readOnly={props.placeholder}
          onChange={onChangeYear}
        />
      </Form>
      {props.placeholder ? (
        <ComparisonTablePlaceholder />
      ) : (
        <Results year={year} />
      )}
    </Fragment>
  );
};
