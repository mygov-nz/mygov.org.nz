import { FunctionalComponent as FC, h, JSX } from 'preact';

import { PageHeader } from '../../atoms';
import { ActTool, ActToolProps, Layout, RenderProps } from '../../organisms';

type ActProps = RenderProps<{ tool: ActToolProps }>;

/**
 *
 * @param props
 */
export const Act: FC<ActProps> = (props): JSX.Element => (
  <Layout {...props.layout}>
    <PageHeader title="ACT Tool" />
    <main id="act-tool">
      <ActTool {...props.tool} />
    </main>
  </Layout>
);
