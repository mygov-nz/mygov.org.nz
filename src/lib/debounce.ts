/**
 *
 * @param fn
 */
export function debounce(fn: Function): Function {
  let timeout: number | null = null;

  return function (...args: any[]): void {
    if (timeout) {
			window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => fn(...args));
  };
}
