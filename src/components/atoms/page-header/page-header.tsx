import { FunctionalComponent as FC, h, JSX } from 'preact';

import './page-header.scss';

interface PageHeaderProps {
  readonly title: string;
}

/**
 *
 */
export const PageHeader: FC<PageHeaderProps> = (props): JSX.Element => (
  <header className="mg-page-header">
    <h1>{props.title}</h1>
  </header>
);
