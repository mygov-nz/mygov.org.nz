import { FunctionalComponent as FC, h, JSX } from 'preact';

import { elections } from '../../../data/elections';
import { ElectionYear } from '../../../data/types';
import { getResult } from '../../../lib/election';
import { PageHeader } from '../../atoms';
import { ResultTable } from '../../molecules';
import { Layout, RenderProps } from '../../organisms';

type ElectionResultProps = RenderProps<{ year: ElectionYear }>;

/**
 *
 * @param props
 */
export const ElectionResult: FC<ElectionResultProps> = (props): JSX.Element => (
  <Layout {...props.layout}>
    <PageHeader title={`${props.year} General Election`} />
    <ResultTable {...getResult(elections[props.year].r)} />
  </Layout>
);
