import { error, json, type RequestHandler } from '@sveltejs/kit';

import createAccount from '$lib/server/database/createAccount';
import { asyncRequest } from '$lib/utils/asyncRequest';
import { signToken, tokenCookiesOptions } from '$lib/utils/auth';

export const POST: RequestHandler = async function ({ cookies, request }) {
	if(!request.body) throw error(400, { message: 'Invalid request' });
	const { email, password, name } = await request.json();
	const userData = {
		email,
		password,
		name
	}

	const { data: user } = await asyncRequest(() => createAccount(userData));

	if (!user) throw error(500, { message: 'Error creating account' });

	const token = signToken({ id: user.id });
	cookies.set('auth_token', token, tokenCookiesOptions);

	return json({ success: true });
};