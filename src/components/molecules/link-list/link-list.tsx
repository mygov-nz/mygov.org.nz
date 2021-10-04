import { FunctionalComponent as FC, h, JSX } from 'preact';

import './link-list.scss';

interface LinkListItem {
  label: string;
  url: string;
}

interface LinkListProps {
  items: LinkListItem[];
}

/**
 *
 * @param props
 */
export const LinkListItem: FC<LinkListItem> = (props): JSX.Element => (
  <li>
    <a href={props.url}>{props.label}</a>
  </li>
);

/**
 *
 * @param props
 */
export const LinkList: FC<LinkListProps> = (props): JSX.Element => (
  <ul className="mg-link-list">
    {props.items.map(({ label, url }) => (
      <LinkListItem key={url} label={label} url={url} />
    ))}
  </ul>
);
