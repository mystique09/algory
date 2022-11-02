import type { Actions, PageServerLoad } from "./$types";
import { error, invalid, redirect } from "@sveltejs/kit";
import { parseNonPOJO } from "$lib/utils/helpers";

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
        const session = parseNonPOJO(locals.session);
        const body = await request.formData();
        const title = body.get('title');
        const description = body.get('description');
        const tags = body.get('tags');
        const author = session.profile.id;

        if (!title || !description || !author) {
            throw error(400, 'Missing required fields!');
        }

        try {
            const data = {
                title: title.toString(),
                description: description,
                author,
                tags: tags?.toString().split(', '),
                views: 0,
                comments: []
            };

            const newQuestion = await locals.pb.records.create('posts', data).then(JSON.stringify).then(JSON.parse);
            const allQuestions = await locals.pb.records.getFullList('posts', 2048, {
                filter: `author = "${author}"`
            }).then(question => {
                return question.map(question => question.id);
            });
            const allAnswers = await locals.pb.records.getFullList('comments', 2048, {
                filter: `user = "${author}"`
            }).then(answers => {
                return answers.map(answer => answer.id);
            });

            await locals.pb.records.update('profiles', author, {
                posts: allQuestions,
                comments: allAnswers
            });

            return { newQuestion }
        } catch (e: any) {
            return invalid(e.status, { failed: true, tags: e.data.data.tags.message });
        }
    }
}