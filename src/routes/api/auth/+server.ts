import { error, json, type RequestHandler } from '@sveltejs/kit';

import authAccount from '$lib/server/database/authAccount';
import { asyncRequest } from '$lib/utils/asyncRequest';
import { signToken, tokenCookiesOptions } from '$lib/utils/auth';

export const POST: RequestHandler = async function ({ cookies, request }) {
	if(!request.body) throw error(400, { message: 'Invalid request' });
	const { email, password } = await request.json();
	const userData = {
		email,
		password
	}

	const { data: user } = await asyncRequest(() => authAccount(userData));
	// const user = await authAccount(userData);

	if (!user) throw error(500, { message: 'Error' });

	const token = signToken({ id: user.id });
	cookies.set('auth_token', token, tokenCookiesOptions);

	return json({ success: true });
};