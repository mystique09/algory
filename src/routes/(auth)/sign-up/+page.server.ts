import type { PageServerLoad } from ".svelte-kit/types/src/routes/(auth)/sign-in/$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();

  if (!!session.token) {
    throw redirect(307, "/posts");
  }

  return {}
}