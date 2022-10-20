import PocketBase from 'pocketbase';
import { invalid, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from '.svelte-kit/types/src/routes/(auth)/sign-in/$types';
const pbClient = new PocketBase(process.env.POCKETBASE_URL || "http://localhost:8090");

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();

  if (!!session.user) {
    throw redirect(307, '/posts');
  }

  return {}
}

export const actions: Actions = {
  async login({ cookies, request }) {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      return invalid(400, { credentials: true, missing: true });
    }

    try {
      const user = await pbClient.users.authViaEmail(email as string, password as string);

      const { errorDetails, errorMessage } = user;

      if (!!errorDetails || !!errorMessage) {
        return invalid(400, { credentials: true, message: errorDetails });
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
    } catch (e) {
      return { success: false, message: "Something went wrong." }
    }
  }
};