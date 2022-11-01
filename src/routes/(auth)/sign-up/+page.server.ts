import type { PageServerLoad } from "./$types";
import { invalid, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
    const { authenticated } = await parent();
    console.log(authenticated)

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
            return invalid(400, { credentials: true, message: "Missing required fields." });
        }

        if (password.toString().length < 8) {
            return invalid(400, { password, message: "Password must be atleast 8 characters." });
        }

        if (username.toString().length < 8) {
            return invalid(400, { username, message: "Username must be atleast 8 characters." });
        }

        if (password != confirmPassword) {
            return invalid(400, { confirm: true, message: "Password mismatched." });
        }

        try {
            await locals.pb.users.create({
                email,
                password,
                passwordConfirm: confirmPassword
            });

            const { user } = await locals.pb.users.authViaEmail(email.toString(), password.toString());
            const id = user.profile?.id!;
            await locals.pb.records.update('profiles', id, {
                name: username
            });

            await locals.pb.users.requestVerification(user.email);

            locals.pb.authStore.clear();
        } catch (e: any) {
            console.log(e)
            const { data } = e.data;

            if (data.email) {
                console.log(data, data.email);
                return invalid(400, { email: true, message: data.email.message });
            }

            return invalid(e.status, { success: false, message: e.message });
        }
        throw redirect(303, '/sign-in');
    }
}