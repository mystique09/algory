import type { PageServerLoad } from "./$types";
import { error, invalid } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { parseNonPOJO } from "$lib/utils/helpers";

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        const question = await locals.pb.collection("questions").getOne(params.id, {
            sort: '-created',
            expand: 'answers,answers.upvotes,answers.downvotes,upvotes,downvotes'
        }).then(parseNonPOJO);

        return { question, upvotes: question.upvotes, downvotes: question.downvotes, answers: question.answers };
    } catch (e: any) {
        throw error(e.status, e.message);
    }
};

export const actions: Actions = {
    async newComment({ locals, request, params }) {
        const { id } = params;
        const body = await request.formData();
        const answer = body.get('answer');
        const { id: author } = locals.session!;

        if (!answer || answer.toString().length < 6) {
            return invalid(400, { failed: true, message: "Too short, I know you have a better answer than that!" });
        }

        try {
            const data = {
                question: id,
                content: answer!,
                author
            };

            const newAnswer = await locals.pb.collection("answers").create(data).then(parseNonPOJO);
            const allAnswersOfPost = await locals.pb.collection("answers").getFullList(2048, {
                filter: `question = "${id}"`
            }).then(answers => {
                return answers.map(answer => answer.id);
            });

            await locals.pb.collection("questions").update(id, {
                answers: allAnswersOfPost,
            });

            const allQuestions = await locals.pb.collection("questions").getFullList(2048, {
                filter: `author = "${author}"`
            }).then(question => {
                return question.map(question => question.id);
            });

            const allAnswersOfUser = await locals.pb.collection("answers").getFullList(2048, {
                filter: `author = "${author}"`
            }).then(answers => {
                return answers.map(answer => answer.id);
            });
            await locals.pb.collection("users").update(author, {
                answers: allAnswersOfUser,
                questions: allQuestions
            });

            return { newAnswer }
        } catch (e: any) {
            throw error(e.status, e.message);
        }
    }
}