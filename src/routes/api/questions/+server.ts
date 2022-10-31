import { pbClient } from "$lib/db/pocketbase";
import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();

    if (!body.title || !body.description || !body.author) {
        throw error(400, 'Missing required fields!');
    }

    try {
        const data = {
            title: body.title,
            description: body.description,
            author: body.user,
            tags: body.tags,
            views: 0
        };

        const newQuestion = await pbClient.records.create('posts', data).then(JSON.stringify).then(JSON.parse);
        return json(newQuestion);
    } catch (e: any) {
        throw error(e.status, e.message);
    }
}