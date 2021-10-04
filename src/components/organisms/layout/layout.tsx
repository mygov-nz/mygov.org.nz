import { FunctionalComponent as FC, h, JSX } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

import './layout.scss';

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

export type RenderProps<T extends Record<string, any> = Record<string, any>> =
  JSXInternal.HTMLAttributes &
  JSXInternal.SVGAttributes &
  T &
  { layout: LayoutProps };

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
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="apple-mobile-web-app-title" content="MyGov NZ" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="apple-touch-icon" href="/images/icon-192.png" />
      {props.links.map(
        (link): JSX.Element => (
          <link {...link} key={link.href} href={link.href} />
        )
      )}
      <link
        rel="preconnect"
        href="https://www.googletagmanager.com"
        crossOrigin="crossorigin"
      />
      <link
        rel="preconnect"
        href="https://www.google-analytics.com"
        crossOrigin="crossorigin"
      />
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
      <a href="#content" className="mg-skip-to-content">
        Skip to the content
      </a>
      <header className="mg-site-header">
        <nav className="mg-container">
          <a href="/" className="mg-site-brand" rel="home">
            MyGov
          </a>
          <ul>
            <li>
              <a href="/election-results">Election results</a>
            </li>
            <li>
              <a href="/tools">Tools</a>
            </li>
          </ul>
        </nav>
      </header>
      <main id="content" className="mg-container" role="main">
        {props.children}
      </main>
      <footer className="mg-site-footer">
        <a href="https://mygov.org.nz">mygov.org.nz</a>
      </footer>
    </body>
  </html>
);
