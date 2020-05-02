import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ComparisonTable } from '../../molecules';

import { getData } from './data';
import { ActToolState } from './state';

/**
 *
 */
export const Results: FC<ActToolState> = (props): JSX.Element => {
  return h(ComparisonTable, {
    a: getData(props.year, false),
    b: getData(props.year, true)
  });
};
