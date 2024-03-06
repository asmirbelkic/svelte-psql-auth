import { error, json, type RequestHandler } from '@sveltejs/kit';

const AUTH_TOKEN_COOKIE = 'auth_token';

export const POST: RequestHandler = async ({ cookies }) => {
	if(!cookies) throw error(400, { message: 'Invalid request' });
  // Récupérer la valeur actuelle du cookie d'authentification
  const authToken = cookies.get(AUTH_TOKEN_COOKIE);

  if (authToken) {
    // Supprimer le cookie d'authentification en définissant son expiration dans le passé
    cookies.set(AUTH_TOKEN_COOKIE, '', { expires: new Date(0), path: '/'});
  }

  return json({ success: true });
};