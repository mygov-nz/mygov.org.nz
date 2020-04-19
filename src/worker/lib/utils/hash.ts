/**
 *
 * @param value
 */
export function hash(value: string): PromiseLike<string> {
  const length = value.length;
  const buffer = new ArrayBuffer(length * 2);
  const view = new Uint16Array(buffer);

  for (let i = 0; i < length; i = i + 1) {
    // eslint-disable-next-line security/detect-object-injection
    view[i] = value.charCodeAt(i);
  }

  return crypto.subtle
    .digest('SHA-1', buffer)
    .then((result: ArrayBuffer): string => {
      const s = String.fromCharCode.apply(
        null,
        (result as unknown) as number[]
      );

      console.log(s);

      return [
        parseInt(s.slice(0, 10), 16).toString(36),
        parseInt(s.slice(10, 20), 16).toString(36),
        parseInt(s.slice(20, 30), 16).toString(36),
        parseInt(s.slice(30, 40), 16).toString(36)
      ].join('');
    });
}
