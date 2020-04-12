import assets from '../data/assets.json';

/**
 *
 * @param filename
 */
export function resolve(filename: string): string {
  /* eslint-disable security/detect-object-injection */
  const data = assets as any;

  if (!data[filename]) {
    throw new Error(`Asset "${filename}" not found.`);
  }

  return data[filename];
}
