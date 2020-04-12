import { FunctionalComponent as FC, h, JSX } from 'preact';

import { PageHeader } from '../../atoms';
import { Layout, RenderProps } from '../../organisms';

type NotFoundProps = RenderProps<{
  pathname: string;
}>;

/**
 *
 * @param props
 */
export const NotFound: FC<NotFoundProps> = (props): JSX.Element => (
  <Layout {...props.layout}>
    <PageHeader title="Page not found" />
  </Layout>
);
