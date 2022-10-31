import { pbClient } from "$lib/db/pocketbase";
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
    async signup({ request }) {
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
            const user = await pbClient.users.create({
                email,
                password,
                passwordConfirm: confirmPassword
            });

            await pbClient.users.requestVerification(user.email);

            return { success: true, message: "New user created." };
        } catch (e: any) {
            console.log(e)
            const { data } = e.data;

            if (data.email) {
                console.log(data, data.email);
                return invalid(400, { email: true, message: data.email.message });
            }

            return invalid(e.status, { success: false, message: e.message });
        }
    }
}