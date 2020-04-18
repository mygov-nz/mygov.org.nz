/**
 *
 * @param fn
 * @param wait
 */
export function debounce(fn: Function, wait: number): Function {
  let timeout: number | null = null;

  return function (...args: any[]): void {
    if (timeout) {
      window.clearTimeout(timeout);
    }

    timeout = window.setTimeout(() => fn(...args), wait);
  };
}
