import { KVNamespace } from '@cloudflare/workers-types'

declare global {

  const ENVIRONMENT: string;

  const MyGovKVNamespace: KVNamespace;

  const RELEASE: string;

  interface Context {
    url: URL;
  }

}

declare module '*.json' {
  const value: Record<string, string>;

  export = value;
}
