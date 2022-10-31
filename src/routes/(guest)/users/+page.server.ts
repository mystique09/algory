import { authAdmin, pbClient } from "$lib/db/pocketbase";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ }) => {
    try {
        const users = await pbClient.users.getFullList(200, undefined).then(JSON.stringify).then(JSON.parse);
        return { users }
    } catch (e: any) {
        if (e.status === 401 || e.status === 403) {
            await authAdmin();
            const users = await pbClient.users.getFullList(200, undefined).then(JSON.stringify).then(JSON.parse);
            return { users }
        }
        throw error(e.status, e.message);
    }
};