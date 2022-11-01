import { parseNonPOJO } from "$lib/utils/helpers";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
    const { id } = params;
    try {
        const info = await locals.pb.records.getOne('profiles', id).then(parseNonPOJO);
        const followers = await locals.pb.records.getFullList('followers', 2048, {
            filter: `followed_user = "${info.userId}"`
        }).then(parseNonPOJO);

        const following = await locals.pb.records.getFullList('followers', 2048, {
            filter: `user = "${info.userId}"`
        }).then(parseNonPOJO);

        const questions = await locals.pb.records.getFullList('posts', 2048, {
            filter: `author = "${info.userId}"`
        }).then(parseNonPOJO);

        return { info, followers, following, questions }
    } catch (e: any) {
        console.log(e)
        if (e.status === 404) {
            throw error(e.status, 'User not found!');
        }
        throw error(e.status, e.message);
    }
};