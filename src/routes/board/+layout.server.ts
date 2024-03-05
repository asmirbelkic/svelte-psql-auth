import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

import formatUserForFrontend from "$lib/utils/formatUserForFrontend";

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user) throw redirect(307, "/login");
	return { user: formatUserForFrontend(locals.user) };
};
