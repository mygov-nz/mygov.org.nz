import { FunctionalComponent as FC, h, JSX } from 'preact';

import { years } from '../../../data/years';
import { Option, OptType, Select } from '../../atoms';

interface YearSelectProps {
  readonly onChange: (event: Event) => void;
  readonly value: ElectionYear;
}

const options: ReadonlyArray<Option> = years.map((year) => ({
  label: year,
  type: OptType.OPTION,
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
    required={true}
    value={props.value}
    onChange={props.onChange}
  />
);
