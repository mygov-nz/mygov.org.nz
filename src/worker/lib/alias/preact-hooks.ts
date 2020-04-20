/**
 *
 * @param fn
 * @param _conditions
 */
export function useCallback(fn: Function, _conditions: any[]): Function {
  return fn;
}

/**
 *
 * @param _fn
 * @param _conditions
 */
export function useEffect(_fn: Function, _conditions: any[]): void {
  // no-op
}

/**
 *
 * @param _initial
 */
export function useRef(_initial: any): any {
  return { current: null };
}

/**
 *
 * @param initial
 */
export function useState(initial: any): any[] {
  return [
    typeof initial === 'function' ? initial() : initial,
    (): void => {
      // no-op
    }
  ];
}
