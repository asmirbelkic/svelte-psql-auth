import { error, json, redirect, type RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

import createTestAccount from '$lib/server/database/createTestAccount';
import { getComment } from '$lib/server/services/comment';

export const POST: RequestHandler = async function ({ locals, request }) {
	// if (!locals.user) throw redirect(307, '/');
	// createTestAccount();
	const { commentId, content } = await request.json();
	const id = uuidv4();
	const { data: issue } = await getComment(commentId!);

	const comment = {
		id,
		commentId,
		content,
		issue
	};

	console.log('comment', comment);
	return json(comment);
}