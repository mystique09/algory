import { pbClient } from "$lib/db/pocketbase";
import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
    try {
        const question = await pbClient.records.getOne('posts', params.id, {
            expand: 'comments'
        });
        return { question };
    } catch (e: any) {
        throw error(404, 'Question not found!');
    }
};