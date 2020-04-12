import { FunctionalComponent as FC, h, JSX } from 'preact';

import { PageHeader } from '../../atoms';
import { Layout, RenderProps } from '../../organisms';

import {
  MMPReviewTool,
  MMPReviewToolProps
} from './mmp-review-tool/mmp-review-tool';

type MMPReviewProps = RenderProps<{ tool: MMPReviewToolProps }>;

/**
 *
 * @param props
 */
export const MMPReview: FC<MMPReviewProps> = (props): JSX.Element => (
  <Layout {...props.layout}>
    <PageHeader title="MMP Review Tool" />
    <p>
      This tool allows users to evaluate the effects of possible changes to
      rules determining the outcome of a New Zealand General Election.
    </p>
    <main id="mmp-review-tool">
      <MMPReviewTool {...props.tool} />
    </main>
  </Layout>
);
