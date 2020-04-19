import { FunctionalComponent as FC, h, JSX } from 'preact';

import { PageHeader } from '../../atoms';
import { Layout, RenderProps } from '../../organisms';

import styles from './tools.module.scss';

/**
 *
 * @param props
 */
export const Tools: FC<RenderProps> = (props): JSX.Element => (
  <Layout {...props.layout}>
    <PageHeader title="Tools" />
    <ul className={styles.toolList}>
      <li>
        <a href="/tools/mmp-review/2017/5-percent-threshold/overhang/1-seat-tagalong">
          MMP Review Tool
        </a>
      </li>
      <li>
        <a href="/tools/non-voters/2017/_no/0-percent">Non-voters Tool</a>
      </li>
    </ul>
  </Layout>
);
