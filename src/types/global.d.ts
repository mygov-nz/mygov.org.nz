export {};

declare module 'assets.json' {
  const value: Record<string, string>;

  export = value;
}

declare global {
  const ENVIRONMENT: string;
  const RELEASE: string;
}
