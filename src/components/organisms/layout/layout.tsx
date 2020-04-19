import { FunctionalComponent as FC, h, JSX } from 'preact';

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

interface LayoutProps {
  links: Link[];
  meta: Meta[];
  scripts: Script[];
  title: string;
}

export type RenderProps<T = { [key: string]: any }> = T & {
  layout: LayoutProps;
};

/**
 *
 * @param props
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
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="apple-touch-icon" href="/images/icon-192.png" />
      {props.links.map(
        (link): JSX.Element => (
          <link {...link} key={link.href} href={link.href} />
        )
      )}
      <script
        dangerouslySetInnerHTML={{
          __html:
            'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","UA-45926000-1")'
        }}
      ></script>
      {props.scripts.map(
        (script): JSX.Element => (
          <script
            defer={true}
            {...script}
            key={script.src}
            src={script.src}
          ></script>
        )
      )}
      <script
        async={true}
        src="https://www.googletagmanager.com/gtag/js?id=UA-45926000-1"
      ></script>
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
    </body>
  </html>
);
