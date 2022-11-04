import { invalid, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
    const { authenticated } = await parent();

    if (authenticated) {
        throw redirect(307, '/questions');
    }

    return {}
}

export const actions: Actions = {
    async login({ request, locals }) {
        const data = await request.formData();
        const email = data.get('username-or-email');
        const password = data.get('password');

        if (!email || !password) {
            return invalid(400, { credentials: true, message: "Missing required fields" });
        }

        try {
            await locals.pb.collection("users").authWithPassword(email.toString(), password.toString());
            return { success: true, message: "Logged in successfully" };
        } catch (e: any) {
            const { message } = e;
            return invalid(e.status, { failed: true, message });
        }
    }
};