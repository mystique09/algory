import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }) => {
    try {
        const res = await fetch(`/api/questions/${params.id}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        });
        const question = await res.json();

        return { question };
    } catch (e: any) {
        throw error(404, 'Question not found!');
    }
};