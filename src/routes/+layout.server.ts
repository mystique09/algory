import { parseNonPOJO } from "$lib/utils/helpers";
import type { LayoutServerLoad } from ".svelte-kit/types/src/routes/$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        authenticated: !!locals.session,
        user: parseNonPOJO(locals.session)
    };
}