import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { parseNonPOJO } from "$lib/utils/helpers";

export const load: PageServerLoad = async ({ parent, locals }) => {
    const { authenticated } = await parent();

    if (!authenticated) {
        throw redirect(307, "/sign-in");
    }

    return {
        user: parseNonPOJO(locals.session),
    }
}