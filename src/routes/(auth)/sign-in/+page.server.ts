import { invalid, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import { pbClient } from "$lib/db/pocketbase";

export const load: PageServerLoad = async ({ parent }) => {
    const { authenticated } = await parent();

    if (authenticated) {
        throw redirect(307, '/questions');
    }

    return {}
}

export const actions: Actions = {
    async login({ cookies, request }) {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            return invalid(400, { credentials: true, message: "Missing required fields" });
        }

        try {
            const user = await pbClient.users.authViaEmail(email as string, password as string);

            const session = {
                token: user.token,
                id: user.id,
                user: {
                    id: user.user.id,
                    email: user.user.email,
                    verified: user.user.verified,
                    profile: {
                        id: user.user.profile?.id,
                        avatar: user.user.profile?.avatar,
                        name: user.user.profile?.name,
                        userId: user.user.profile?.userId,
                    }
                },
            }

            cookies.set('session', JSON.stringify(session), {
                path: "/",
                maxAge: 60 * 60 * 5,
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            });

            return { success: true, message: "Logged in successfully" };
        } catch (e: any) {
            const { message } = e;
            return invalid(e.status, { failed: true, message });
        }
    }
};