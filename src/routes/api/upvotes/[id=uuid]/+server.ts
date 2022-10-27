import { pbClient } from "$lib/db/pocketbase";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, params, url }) => {
    const { id } = params;
    const record = url.searchParams.get('record');
    const type = url.searchParams.get('type');
    const data = await request.json();

    if (!type || !record) {
        throw error(400, 'Type must not be empty!');
    }

    try {
        const newVote = record === "posts" ? {
            user: data.user,
            post_id: id
        } : {
            user: data.user,
            comment_id: id
        }
        const votes = await pbClient.records.create(type, newVote);
        return json(votes);
    } catch (e: any) {
        throw error(e.status, 'Something went wrong!');
    }
};

export const DELETE: RequestHandler = async ({ request, url }) => {
    const data = await request.json();
    const type = url.searchParams.get('type');
    const { id } = data;

    if (!type) {
        throw error(400, 'Type must not be empty!');
    }

    try {
        const upvote = await pbClient.records.delete(type, id);
        return json(upvote);
    } catch (e: any) {
        throw error(e.status, e.message);
    }
};