import type { PageServerLoad } from "./$types";
import { error, invalid } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { parseNonPOJO } from "$lib/utils/helpers";

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        const question = await locals.pb.collection("questions").getOne(params.id, {
            sort: '-created',
        });

        const updatedQuestion = await locals.pb.collection("questions").update(params.id, {
            views: question.views + 1
        }, {
            expand: 'answers,answers.upvotes,answers.downvotes,votes'
        }).then(parseNonPOJO);

        const upvotes = updatedQuestion.expand?.votes?.filter((vote: { type: string }) => vote.type === "upvote") || [];
        const downvotes = updatedQuestion.expand?.votes?.filter((vote: { type: string }) => vote.type === "downvote") || [];

        return { question: updatedQuestion, upvotes, downvotes, answers: updatedQuestion.answers };
    } catch (e: any) {
        console.log(e)
        throw error(e.status, e.message);
    }
}

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
            return invalid(e.status, { answerFailed: true, message: 'Something went wrong.' });
        }
    },
    async upvoteQuestion({ locals, params }) {
        const { id: question } = params;
        const { id: user } = locals.session!;
        const hash = `${question}${user}upvote`;
        const voteId = user.substring(0, 7) + question.substring(0, 8);

        const data = {
            id: voteId,
            user,
            question,
            hash,
            type: "upvote"
        };

        try {
            await locals.pb.collection('question_votes').create(data);

            const allVotes = await locals.pb.collection('question_votes').getFullList(2048, {
                filter: `question = "${question}"`
            }).then(votes => votes.map((vote: { id: string }) => vote.id));

            await locals.pb.collection('questions').update(question, {
                votes: allVotes
            });
        } catch (e: any) {
            const { hash } = e.data.data;
            if (e.status === 400 || hash?.code === "validation_not_unique") {
                await locals.pb.collection('question_votes').delete(voteId, {
                    filter: `hash = "${hash}"`
                });
                await locals.pb.collection('question_votes').create(data);
                const allVotes = await locals.pb.collection('question_votes').getFullList(2048, {
                    filter: `question = "${question}"`
                }).then(votes => votes.map((vote: { id: string }) => vote.id));
                await locals.pb.collection('questions').update(question, {
                    votes: allVotes
                });
                return { upvoteSuccess: true, message: "Downvoted" };
            }
            return invalid(e.status, { upvoteFailed: true, message: e.message });
        }
    },
    async downvoteQuestion({ locals, params }) {
        const { id: question } = params;
        const { id: user } = locals.session!;
        const hash = `${question}${user}downvote`;
        const voteId = user.substring(0, 7) + question.substring(0, 8);
        const data = {
            id: voteId,
            user,
            question,
            hash,
            type: "downvote"
        };

        try {
            await locals.pb.collection('question_votes').create(data);

            const allVotes = await locals.pb.collection('question_votes').getFullList(2048, {
                filter: `question = "${question}"`
            }).then(votes => votes.map((vote: { id: string }) => vote.id));

            await locals.pb.collection('questions').update(question, {
                votes: allVotes
            });
        } catch (e: any) {
            const { hash } = e.data.data;

            if (e.status === 400) {
                await locals.pb.collection('question_votes').delete(voteId, {
                    filter: `hash = "${hash}"`
                });

                await locals.pb.collection('question_votes').create(data);

                const allVotes = await locals.pb.collection('question_votes').getFullList(2048, {
                    filter: `question = "${question}"`
                }).then(votes => votes.map((vote: { id: string }) => vote.id));

                await locals.pb.collection('questions').update(question, {
                    votes: allVotes
                });
                return { downvoteSuccess: true, message: "Downvoted" };
            }
            return invalid(e.status, { downvoteFailed: true, message: e.message });
        }
    }
}