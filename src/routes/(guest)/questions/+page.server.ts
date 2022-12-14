import type { Actions, PageServerLoad } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
import { parseNonPOJO } from "$lib/utils/helpers";

export const load: PageServerLoad = async ({ url: { searchParams }, locals }) => {
    const page = Number(searchParams.get("page")) || 1;

    try {
        const res = await locals.pb
            .collection("questions")
            .getList(page, 20, {
                sort: "-created",
                expand: "votes",
            })
            .then(JSON.stringify)
            .then(JSON.parse);

        return { questions: res };
    } catch (e: any) {
        throw error(e.status, e.message);
    }
};

export const actions: Actions = {
    async newQuestion({ request, locals }) {
        if (!locals.session) {
            throw redirect(303, "/questions");
        }
        const session = parseNonPOJO(locals.session);
        const body = await request.formData();
        const title = body.get("title");
        const content = body.get("content");
        const tags = body.get("tags");
        const author = session.id;

        if (!(title && content && author)) {
            throw error(400, "Missing required fields!");
        }

        try {
            const data = {
                title: title.toString(),
                content,
                author,
                tags: tags!,
                views: 0,
            };

            const newQuestion = await locals.pb.collection("questions").create(data).then(JSON.stringify).then(JSON.parse);
            const allQuestions = await locals.pb
                .collection("questions")
                .getFullList(2048, {
                    filter: `author = "${author}"`,
                })
                .then((question) => {
                    return question.map((question) => question.id);
                });
            const allAnswers = await locals.pb
                .collection("answers")
                .getFullList(2048, {
                    filter: `author = "${author}"`,
                })
                .then((answers) => {
                    return answers.map((answer) => answer.id);
                });

            await locals.pb.collection("users").update(author, {
                questions: allQuestions,
                answers: allAnswers,
            });

            return { creationSuccess: true, newQuestion };
        } catch (e: any) {
            const { data } = e.data;
            if (data.title) {
                return fail(e.status, {
                    titleInvalid: true,
                    tags: data.title.message,
                });
            }

            if (data.content) {
                return fail(e.status, {
                    contentInvalid: true,
                    tags: data.content.message,
                });
            }

            if (data.tags) {
                return fail(e.status, {
                    tagsInvalid: true,
                    tags: data.tags.message,
                });
            }

            return fail(e.status, { creationError: true, message: e.message });
        }
    },
};
