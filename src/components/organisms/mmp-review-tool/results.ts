import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ComparisonTable } from '../../molecules';

import { getData } from './data';
import { MMPReviewToolState } from './state';

/**
 *
 */
export const Results: FC<MMPReviewToolState> = (props): JSX.Element => {
  return h(ComparisonTable, {
    a: getData({
      overhang: true,
      tagAlong: 1,
      threshold: 5,
      year: props.year
    }),
    b: getData(props)
  });
};
