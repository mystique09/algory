import type { PageServerLoad } from "./$types";
import { invalid, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
    const { authenticated } = await parent();

    if (authenticated) {
        throw redirect(307, "/questions");
    }

    return {}
}

export const actions: Actions = {
    async signup({ request, locals }) {
        const data = await request.formData();
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const confirmPassword = data.get("confirm-password");

        if (!username || !email || !password) {
            return invalid(400, { credentialsInvalid: true, message: "Missing required fields." });
        }

        if (password.toString().length < 8) {
            return invalid(400, { passwordInvalid: true, message: "Password must be atleast 8 characters." });
        }

        if (username.toString().length < 8) {
            return invalid(400, { usernameInvalid: true, message: "Username must be atleast 8 characters." });
        }

        if (password != confirmPassword) {
            return invalid(400, { confirmPasswordInvalid: true, message: "Password mismatched." });
        }

        try {
            await locals.pb.collection("users").create({
                username,
                email,
                emailVisibility: true,
                name: username,
                password,
                passwordConfirm: confirmPassword
            });
            await locals.pb.collection("users").requestVerification(email.toString());

            locals.pb.authStore.clear();
        } catch (e: any) {
            const { data } = e.data;

            if (data.email) {
                return invalid(400, { emailInvalid: true, message: data.email.message });
            }

            if (data.username) {
                return invalid(400, { usernameInvalid: true, message: data.username.message });
            }

            return invalid(e.status, { signupFailed: true, message: e.message });
        }
        throw redirect(303, '/sign-in');
    }
}