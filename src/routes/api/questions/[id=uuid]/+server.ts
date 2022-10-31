import { pbClient } from "$lib/db/pocketbase";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
    const { id } = params;
    try {
        const question = await pbClient.records.getOne('posts', id, {
            sort: '-created',
            filter: `id = "${params.id}"`,
            expand: 'upvotes,downvotes,comments,comments.upvotes,comments.downvotes'
        });

        return json(question);
    } catch (e: any) {
        throw error(e.status, e.message);
    }
}