import { FunctionalComponent as FC, h, JSX } from 'preact';

import assets from '../../../worker/assets.json';

import styles from './layout.module.scss';

interface Link {
  as?: 'script' | 'style' | 'worker';
  href: string;
  rel: string;
  sizes?: string;
}

interface Meta {
  content: string;
  name?: string;
  property?: string;
}

interface Script {
  async?: boolean;
  defer?: boolean;
  integrity?: string;
  nomodule?: boolean;
  nonce?: string;
  src: string;
  type?: 'module';
}

export interface LayoutProps {
  links: Link[];
  meta: Meta[];
  scripts: Script[];
  title: string;
}

/**
 *
 */
export const Layout: FC<LayoutProps> = (props): JSX.Element => (
  <html lang="en-NZ">
    <head>
      <title>{props.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#eb811a" />
      {props.meta.map(
        (meta): JSX.Element => (
          <meta {...meta} key={meta.name || meta.property} />
        )
      )}
      <link rel="manifest" href="/manifest.json" />
      {props.links.map(
        (link): JSX.Element => (
          <link {...link} key={link.href} href={(assets as any)[link.href]} />
        )
      )}
    </head>
    <body>
      <a href="#content" className={styles.skipToContent}>
        Skip to the content
      </a>
      <header className={styles.header}>
        <nav className={styles.container}>
          <a href="/" className={styles.brand} rel="home">
            MyGov
          </a>
          <ul>
            <li>
              <a href="/tools">Tools</a>
            </li>
          </ul>
        </nav>
      </header>
      <main id="content" className={styles.container} role="main">
        {props.children}
      </main>
      <footer className={styles.footer}>
        <a href="https://mygov.org.nz">mygov.org.nz</a>
      </footer>
      {props.scripts.map(
        (script): JSX.Element => (
          <script
            {...script}
            key={script.src}
            src={(assets as any)[script.src]}
          />
        )
      )}
    </body>
  </html>
);
