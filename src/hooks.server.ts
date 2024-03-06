import { redirect, type Handle } from "@sveltejs/kit";

import { getUser } from "$lib/server/services/user";
import { verifyToken } from "$lib/utils/auth";
const PROTECTED_ROUTES = ["/login", "/register"];

async function getUserFromToken(token: string) {
  const { data: tokenPayload } = verifyToken(token);
  if (!tokenPayload) return null;
  const { data: user } = await getUser((tokenPayload as { id: string }).id);
  return user;
}

export const handle: Handle = async function ({ event, resolve }) {
  const token = event.cookies.get("auth_token");
  if (!token) return await resolve(event);

  const user = await getUserFromToken(token);
  if (!user) return await resolve(event);

	if (user && PROTECTED_ROUTES.includes(event.url.pathname)) {
    redirect(303, "/");
  }

  event.locals.user = user;
  return await resolve(event);
};