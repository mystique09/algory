import type { PageServerLoad } from ".svelte-kit/types/src/routes/(auth)/sign-in/$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  const { user } = session;

  if (!session.user) {
    throw redirect(307, "/sign-in");
  }

  return {
    profile: user.profile
  }
}