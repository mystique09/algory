import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        const question = await locals.pb.records.getOne('posts', params.id, {
            sort: '-created',
            filter: `id = "${params.id}"`,
            expand: 'comments,comments.upvotes,comments.downvotes'
        }).then(JSON.stringify).then(JSON.parse);

        const upvotes = await locals.pb.records.getFullList('post_upvotes', 2048, {
            filter: `post_id = "${question.id}"`,
            sort: '-created'
        }).then(JSON.stringify).then(JSON.parse);

        const downvotes = await locals.pb.records.getFullList('post_downvotes', 2048, {
            filter: `post_id = "${question.id}"`,
            sort: '-created'
        }).then(JSON.stringify).then(JSON.parse);

        return { question, upvotes, downvotes };
    } catch (e: any) {
        throw error(e.status, e.message);
    }
};