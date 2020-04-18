const NDU = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;

const propertyCache = new Map<string, string>();

/**
 *
 * @param key
 */
function getProperty(key: string): string {
  if (!propertyCache.has(key)) {
    propertyCache.set(key, key.replace(/([A-Z])/g, '-$1').toLowerCase());
  }

  return propertyCache.get(key) as string;
}

/**
 *
 * @param style
 */
export function styleObjToString(
  style: Record<string, any>
): string | undefined {
  const bits = [];

  for (const prop in style) {
    // eslint-disable-next-line security/detect-object-injection
    const value = style[prop];

    if (value && value !== 0) {
      bits.push(
        [
          getProperty(prop),
          ': ',
          value,
          typeof value === 'number' && NDU.test(prop) === false ? 'px' : ''
        ].join('')
      );
    }
  }

  return bits.length ? bits.join('; ') : undefined;
}
