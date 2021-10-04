import mem from 'mem';
import { FunctionalComponent as FC, h, JSX } from 'preact';

import { elections } from '../../../data/elections';
import { names } from '../../../data/parties';
import { ElectionDataRow, ElectionYear } from '../../../data/types';
import { OptGroup, Option, Select } from '../../atoms';

interface PartySelectProps {
  readonly id: string;
  readonly label: string;
  readonly onChange: (event: Event) => void;
  readonly readOnly: boolean;
  readonly value: string;
  readonly year: ElectionYear;
}

const getOptions = mem(
  (year: ElectionYear): ReadonlyArray<OptGroup | Option> => {
    /* eslint-disable security/detect-object-injection */

    const parties: ReadonlyArray<Option> = elections[year].r
      .map(
        (row: ElectionDataRow): Option => ({
          label: names[row[0]],
          type: 'OPTION',
          value: row[0]
        })
      )
      .sort((a: Option, b: Option) => {
        return a.label > b.label ? 1 : -1;
      });

    return [
      { label: 'Nobody', type: 'OPTION', value: '_no' },
      { label: names._nw, type: 'OPTION', value: '_nw' },
      { label: names._nn, type: 'OPTION', value: '_nn' },
      { label: 'Political parties', options: parties, type: 'OPTGROUP' }
    ];
  }
);

/**
 *
 */
export const PartySelect: FC<PartySelectProps> = (props): JSX.Element => (
  <Select
    id={props.id}
    label={props.label}
    options={getOptions(props.year)}
    readOnly={props.readOnly}
    value={props.value}
    onChange={props.onChange}
  />
);
