/**
 *
 */
export function createBrowserHistory(): any {
  return {
    listen: () => (): void => {
      /* no-op */
    }
  };
}
