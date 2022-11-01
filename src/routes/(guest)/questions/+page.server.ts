import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url: { searchParams }, locals }) => {
    const id = Number(searchParams.get('page')) || 1;

    try {
        const res = await locals.pb.records.getList('posts', id, 20, {
            sort: '-created'
        }).then(JSON.stringify).then(JSON.parse);

        return { questions: res }
    } catch (e: any) {
        throw error(e.status, e.message);
    }
};

export const actions: Actions = {
    async newQuestion({ request, locals }) {
        if (!locals.session) {
            throw redirect(303, '/questions');
        }

        const body = await request.formData();
        const title = body.get('title');
        const description = body.get('description');
        const tags = body.get('tags');
        const author = locals.session?.id;

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

            const newQuestion = await locals.pb.records.create('posts', data).then(JSON.stringify).then(JSON.parse);
            return { newQuestion }
        } catch (e: any) {
            throw error(e.status, e.message);
        }
    }
}