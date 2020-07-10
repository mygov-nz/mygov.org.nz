import { FunctionalComponent as FC, h, JSX } from 'preact';

import { PageHeader } from '../../atoms';
import { LinkList } from '../../molecules';
import { Layout, RenderProps } from '../../organisms';

const items = [
  {
    label: 'MMP Review Tool',
    url: '/tools/mmp-review/2017/5-percent-threshold/overhang/1-seat-tagalong'
  },
  {
    label: 'Non-voters Tool',
    url: '/tools/non-voters/2017/_no/50-percent'
  }
];

/**
 *
 * @param props
 */
export const Tools: FC<RenderProps> = (props): JSX.Element => (
  <Layout {...props.layout}>
    <PageHeader title="Tools" />
    <LinkList items={items} />
  </Layout>
);
