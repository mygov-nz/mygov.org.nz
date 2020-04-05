import { FunctionalComponent as FC, h, JSX } from 'preact';

import { Form } from '../../../atoms';

export interface MMPReviewToolProps {
  year: ElectionYear;
}

/**
 *
 * @param event
 */
function onSubmit(event: Event): void {
  event.preventDefault();

  //
}

/**
 *
 */
export const MMPReviewTool: FC<MMPReviewToolProps> = (props): JSX.Element => (
  <Form action="/tools/mmp-review" onSubmit={onSubmit}>
    //
  </Form>
);
