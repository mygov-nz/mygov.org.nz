import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ComparisonTable } from '../../molecules';

import { getData } from './data';
import { NonVotersToolState } from './state';

/**
 *
 */
export const Results: FC<NonVotersToolState> = (props): JSX.Element => {
  const current = getData(props);
  const original = getData({ party: '_no', percentage: 0, year: props.year });

  return <ComparisonTable a={original} b={current} />;
};
