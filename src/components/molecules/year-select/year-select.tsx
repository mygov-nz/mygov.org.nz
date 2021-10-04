import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ElectionYear } from '../../../data/types';
import { years } from '../../../data/years';
import { Option, Select } from '../../atoms';

interface YearSelectProps {
  readonly onChange: (event: Event) => void;
  readonly readOnly: boolean;
  readonly value: ElectionYear;
}

const options: ReadonlyArray<Option> = years.map((year) => ({
  label: year,
  type: 'OPTION',
  value: year
}));

/**
 *
 */
export const YearSelect: FC<YearSelectProps> = (props): JSX.Element => (
  <Select
    id="year"
    label="Election year"
    options={options}
    readOnly={props.readOnly}
    value={props.value}
    onChange={props.onChange}
  />
);
