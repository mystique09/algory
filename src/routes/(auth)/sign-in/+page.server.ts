import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const { authenticated } = await parent();

    if (authenticated) {
        throw redirect(307, "/questions");
    }

    return {};
};

export const actions: Actions = {
    async login({ request, locals }) {
        const data = await request.formData();
        const email = data.get("username-or-email");
        const password = data.get("password");

        if (!(email && password)) {
            return fail(400, {
                fieldsInvalid: true,
                message: "Missing required fields",
            });
        }

        try {
            await locals.pb.collection("users").authWithPassword(email.toString(), password.toString());
            return { signinSuccess: true, message: "Logged in successfully" };
        } catch (e: any) {
            const { message } = e;
            return fail(e.status, { signinFailed: true, message });
        }
    },
};
