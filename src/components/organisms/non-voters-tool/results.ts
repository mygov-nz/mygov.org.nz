import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ComparisonTable } from '../../molecules';

import { getData } from './data';
import { NonVotersToolState } from './state';

/**
 *
 */
export const Results: FC<NonVotersToolState> = (props): JSX.Element => {
  return h(ComparisonTable, {
    a: getData({ party: '_no', percentage: 0, year: props.year }),
    b: getData(props)
  });
};
