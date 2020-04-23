/**
 *
 */
export function getUrlMeta(): HTMLMetaElement[] {
  if (!__DOCUMENT__) {
    console.log('b');
    return [];
  }

  const head = document.head;

  return [
    head.querySelector('meta[property="og:url"]') as HTMLMetaElement,
    head.querySelector('meta[property="twitter:url"]') as HTMLMetaElement
  ];
}
