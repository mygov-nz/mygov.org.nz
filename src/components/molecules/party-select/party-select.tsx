import { FunctionalComponent as FC, h, JSX } from 'preact';

import { elections } from '../../../data/elections';
import { names } from '../../../data/parties';
import { OptGroup, Option, OptType, Select } from '../../atoms';

interface PartySelectProps {
  readonly id: string;
  readonly label: string;
  readonly onChange: (event: Event) => void;
  readonly required?: boolean;
  readonly value: string;
  readonly year: ElectionYear;
}

/**
 *
 */
export const PartySelect: FC<PartySelectProps> = (props): JSX.Element => {
  /* eslint-disable security/detect-object-injection */

  const parties: ReadonlyArray<Option> = elections[props.year].r.map(
    (row: ElectionDataRow): Option => ({
      label: names[row[0]],
      type: OptType.OPTION,
      value: row[0]
    })
  );

  const options: ReadonlyArray<OptGroup | Option> = [
    { label: 'Nobody', type: OptType.OPTION, value: '_no' },
    { label: names._nn, type: OptType.OPTION, value: '_nn' },
    { label: names._nw, type: OptType.OPTION, value: '_nw' },
    { label: 'Political parties', options: parties, type: OptType.OPTGROUP }
  ];

  return (
    <Select
      id={props.id}
      label={props.label}
      options={options}
      required={props.required}
      value={props.value}
      onChange={props.onChange}
    />
  );
};
