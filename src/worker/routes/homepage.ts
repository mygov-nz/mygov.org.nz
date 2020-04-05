/**
 *
 * @param req
 */
export async function homepage(): Promise<Response> {
  return Response.redirect('/tools', 302);
}
