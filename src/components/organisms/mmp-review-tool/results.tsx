import { FunctionalComponent as FC, h, JSX } from 'preact';

import { ComparisonTable } from '../../molecules';

import { getData } from './data';
import { MMPReviewToolState } from './state';

/**
 *
 */
export const Results: FC<MMPReviewToolState> = (props): JSX.Element => {
  const current = getData(props);
  const original = getData({
    overhang: true,
    tagAlong: 1,
    threshold: 5,
    year: props.year
  });

  return <ComparisonTable a={original} b={current} />;
};
