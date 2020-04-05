import { FunctionalComponent as FC, h, JSX } from 'preact';

import styles from './page-header.module.scss';

interface PageHeaderProps {
  readonly title: string;
}

/**
 *
 */
export const PageHeader: FC<PageHeaderProps> = (props): JSX.Element => (
  <header className={ styles.pageHeader }>
    <h1>{ props.title }</h1>
  </header>
);
