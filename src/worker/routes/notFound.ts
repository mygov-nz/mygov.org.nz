/**
 *
 */
export async function notFound(): Promise<Response> {
  return new Response('Resource not found', {
    headers: {
      'content-type': 'text/plain'
    },
    status: 404,
    statusText: 'Not Found'
  });
}
