import { parseNonPOJO } from "$lib/utils/helpers";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params, url }) => {
    const page = Number(url.searchParams.get("page")) || 0;
    const { topic } = params;

    try {
        const questionWithTagsOf = await locals.pb
            .collection("questions")
            .getList(page, 20, {
                filter: `tags ~ "${topic}"`,
            })
            .then(parseNonPOJO);

        return { topic: questionWithTagsOf };
    } catch (e: any) {
        throw error(e.status, "Topic not found!");
    }
};
