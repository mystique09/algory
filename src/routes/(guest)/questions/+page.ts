import { pbClient } from "$lib/db/pocketbase";
import type { PageLoad } from ".svelte-kit/types/src/routes/(guest)/questions/$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ url: { searchParams } }) => {
    const id = Number(searchParams.get('page')) || 1;

    try {
        const questions = await pbClient.records.getList('posts', id, 20, {
            sort: '-created'
        })
        return { questions };
    } catch (e: any) {
        throw error(503, e.message);
    }
};