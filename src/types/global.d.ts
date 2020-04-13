export {};

declare module 'assets.json' {
  const value: Record<string, string>;

  export = value;
}

declare const ENVIRONMENT: string;

declare const RELEASE: string;
