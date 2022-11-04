import { parseNonPOJO } from "$lib/utils/helpers";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
    const { id } = params;
    try {
        const info = await locals.pb.collection("users").getOne(id, {
            expand: 'questions'
        }).then(parseNonPOJO);

        const followers = await locals.pb.collection("followers").getFullList(2048, {
            filter: `user.id = "${id}"`
        }).then(parseNonPOJO);

        const following = await locals.pb.collection("followers").getFullList(2048, {
            filter: `follower.id = "${id}"`
        }).then(parseNonPOJO);

        return { info, questions: info.questions, followers, following }
    } catch (e: any) {
        if (e.status === 404) {
            throw error(e.status, 'User not found!');
        }
        throw error(e.status, e.message);
    }
};