//import { pbClient } from "$lib/db/pocketbase";
import PocketBase from 'pocketbase';
import { invalid, type Actions } from "@sveltejs/kit";
const pbClient = new PocketBase(process.env.POCKETBASE_URL);

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            return invalid(400, { email, missing: true });
        }

        const user = await pbClient.users.authViaEmail(email as string, password as string);

        if (!user.token) {
            return invalid(400, { email, incorrect: true });
        }

        const session = {
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
    }
};