import { parseNonPOJO } from "$lib/utils/helpers";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		authenticated: !!locals.session,
		user: parseNonPOJO(locals.session),
	};
};
