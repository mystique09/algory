import { authAdmin, pbClient } from "$lib/db/pocketbase";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;
    try {
        await authAdmin();

        const info = await pbClient.users.getOne(id, undefined).then(JSON.stringify).then(JSON.parse);
        const followers = await pbClient.records.getFullList('followers', 2048, {
            filter: `followed_user = "${id}"`
        }).then(JSON.stringify).then(JSON.parse);
        const following = await pbClient.records.getFullList('followers', 2048, {
            filter: `user = "${id}"`
        }).then(JSON.stringify).then(JSON.parse);
        const questions = await pbClient.records.getFullList('posts', 2048, {
            filter: `author = "${info.id}"`
        }).then(JSON.stringify).then(JSON.parse);

        return { info, followers, following, questions }
    } catch (e: any) {
        if (e.status === 404) {
            throw error(e.status, 'User not found!');
        }
        throw error(e.status, e.message);
    }
};