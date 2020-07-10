import { FunctionalComponent as FC, h, JSX } from 'preact';

import { years } from '../../../data/years';
import { PageHeader } from '../../atoms';
import { LinkList } from '../../molecules';
import { Layout, RenderProps } from '../../organisms';

const items = years.map((year) => ({
  label: year,
  url: '/election-results/' + year
}));

/**
 *
 * @param props
 */
export const ElectionResults: FC<RenderProps> = (props): JSX.Element => (
  <Layout {...props.layout}>
    <PageHeader title="Election results" />
    <LinkList items={items} />
  </Layout>
);
