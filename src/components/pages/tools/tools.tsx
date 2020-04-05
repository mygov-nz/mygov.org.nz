import { FunctionalComponent as FC, h, JSX } from 'preact';

import { PageHeader } from '../../atoms';
import { Layout, LayoutProps } from '../../organisms';

interface ToolsProps {
  layout: LayoutProps;
}
/**
 *
 */
export const Tools: FC<ToolsProps> = (props): JSX.Element => (
  <Layout { ...props.layout }>
    <PageHeader title='Tools' />
    <ul>
      <li>
        <a href="/tools/mmp-review">MMP Review Tool</a>
      </li>
      <li>
        <a href="/tools/non-voters">Non-voters Tool</a>
      </li>
    </ul>
  </Layout>
);
