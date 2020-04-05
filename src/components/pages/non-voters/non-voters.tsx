import { FunctionalComponent as FC, h, JSX } from 'preact';

import { PageHeader } from '../../atoms';
import { Layout, LayoutProps } from '../../organisms';

import {
  NonVotersTool,
  NonVotersToolProps
} from './non-voters-tool/non-voters-tool';

interface NonVotersProps {
  layout: LayoutProps;
  tool: NonVotersToolProps;
}
/**
 *
 */
export const NonVoters: FC<NonVotersProps> = (props): JSX.Element => (
  <Layout {...props.layout}>
    <PageHeader title="Non-voters Tool" />
    <p>
      This tool allows users to evaluate the effects of hypothetical situations
      where non-voters had instead chosen to vote.
    </p>
    <main id="non-voters-tool">
      <NonVotersTool {...props.tool} />
    </main>
  </Layout>
);
