/**
 *
 */
export async function error(): Promise<Response> {
  return new Response('Error', {
    headers: {
      'content-type': 'text/plain'
    },
    status: 500,
    statusText: 'Internal Server Error'
  });
}
