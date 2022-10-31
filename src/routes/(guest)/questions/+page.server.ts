import { pbClient } from "$lib/db/pocketbase";
import type { Actions, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url: { searchParams } }) => {
    const id = Number(searchParams.get('page')) || 1;

    try {
        const res = await pbClient.records.getList('posts', id, 20, {
            sort: '-created'
        }).then(res => JSON.stringify(res));

        return { questions: JSON.parse(res) }
    } catch (e: any) {
        throw error(503, e.message);
    }
};

export const actions: Actions = {
    async newQuestion({ request, locals }) {
        const body = await request.formData();
        const title = body.get('title');
        const description = body.get('description');
        const tags = body.get('tags');
        const author = locals.session.user.id;

        if (!title || !description || !author) {
            throw error(400, 'Missing required fields!');
        }

        try {
            const data = {
                title: title.toString(),
                description: description,
                author,
                tags: tags,
                views: 0
            };

            const newQuestion = await pbClient.records.create('posts', data).then(JSON.stringify).then(JSON.parse);
            return { newQuestion }
        } catch (e: any) {
            throw error(e.status, e.message);
        }
    }
}