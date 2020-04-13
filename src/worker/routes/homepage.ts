import { Context } from '../types';

/**
 *
 * @param _req
 * @param ctx
 */
export async function homepage(_req: Request, ctx: Context): Promise<Response> {
  return Response.redirect(
    `${ctx.url.protocol}//${ctx.url.hostname}/tools`,
    302
  );
}
