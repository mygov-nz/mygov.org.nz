import { FunctionalComponent as FC, h, JSX } from 'preact';

import { Form } from '../../../atoms';

export interface NonVotersToolProps {
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
export const NonVotersTool: FC<NonVotersToolProps> = (props): JSX.Element => (
  <Form action="/tools/non-voters" onSubmit={onSubmit}>
    //
  </Form>
);
