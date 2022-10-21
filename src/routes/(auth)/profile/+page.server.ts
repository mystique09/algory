import type { PageServerLoad } from ".svelte-kit/types/src/routes/(auth)/profile/$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  
  if (!session.user) {
    throw redirect(307, '/sign-in');
  }
  
  return {
    profile: session.user.profile,
    email: session.user.email
  }
}