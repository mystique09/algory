import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
    locals.pb.authStore.clear();
    locals.session = null;
    return json({ message: 'Logged out' });
}