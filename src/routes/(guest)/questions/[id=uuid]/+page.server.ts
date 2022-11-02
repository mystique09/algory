import type { PageServerLoad } from "./$types";
import { error, invalid } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { parseNonPOJO } from "$lib/utils/helpers";
import { ADMIN_USERNAME, ADMIN_PASSWORD, BACKEND_URL } from "$env/static/private";
import PocketBase from 'pocketbase';

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        const question = await locals.pb.records.getOne('posts', params.id, {
            sort: '-created',
            filter: `id = "${params.id}"`,
            expand: 'comments,comments.upvotes,comments.downvotes'
        }).then(parseNonPOJO);

        return { question, upvotes: question.upvotes, downvotes: question.downvotes };
    } catch (e: any) {
        throw error(e.status, e.message);
    }
};

export const actions: Actions = {
    async newComment({ locals, request, params }) {
        const body = await request.formData();
        const { id } = params;
        const answer = body.get('answer');
        const session = parseNonPOJO(locals.session);

        if (!answer) {
            return invalid(400, { failed: true, message: "Too short, I know you have a better answer than that!" });
        }

        try {
            const data = {
                post_id: id,
                content: answer.toString(),
                user: session.profile.id
            };

            const newAnswer = await locals.pb.records.create('comments', data).then(parseNonPOJO);
            const allAnswersOfPost = await locals.pb.records.getFullList('comments', 2048, {
                filter: `post_id = "${id}"`
            }).then(answers => {
                return answers.map(answer => answer.id);
            });

            const adminPb = new PocketBase(BACKEND_URL);
            await adminPb.admins.authViaEmail(ADMIN_USERNAME, ADMIN_PASSWORD);
            await adminPb.records.update('posts', id, {
                comments: allAnswersOfPost,
            });
            adminPb.admins.client.authStore.clear();

            const allQuestions = await locals.pb.records.getFullList('posts', 2048, {
                filter: `author = "${session.profile.id}"`
            }).then(question => {
                return question.map(question => question.id);
            });

            const allAnswersOfUser = await locals.pb.records.getFullList('comments', 2048, {
                filter: `user = "${session.profile.id}"`
            }).then(answers => {
                return answers.map(answer => answer.id);
            });
            await locals.pb.records.update('profiles', session.profile.id, {
                comments: allAnswersOfUser,
                posts: allQuestions
            });

            return { newAnswer }
        } catch (e: any) {
            throw error(e.status, e.message);
        }
    }
}