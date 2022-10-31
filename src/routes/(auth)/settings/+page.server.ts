import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent, locals }) => {
    const { authenticated } = await parent();

    if (!authenticated) {
        throw redirect(307, "/sign-in");
    }

    return {
        profile: locals.session.user.profile,
        email: locals.session.user.email
    }
}