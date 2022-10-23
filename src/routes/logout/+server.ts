import { pbClient } from "$lib/db/pocketbase";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
  pbClient.authStore.clear();

  cookies.set('session', '', {
    path: '/',
    maxAge: 0
  });
  return json({ message: 'Logged out' });
}