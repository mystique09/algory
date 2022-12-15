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
    async forgotPassword({ locals, request }) {
        const data = await request.formData();
        const email = data.get("email");

        if (!email) {
            return fail(400, {
                missingEmail: true,
                message: "Please provide an email adress!",
            });
        }

        try {
            await locals.pb.collection("users").requestPasswordReset(email.toString());
            return {
                requestSent: true,
                message: "Password reset sent, please check your email!",
            };
        } catch (e: any) {
            return fail(e.status, {
                requestFailed: true,
                messdage: e.data.data.email.message,
            });
        }
    },
};
