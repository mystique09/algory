import { parseNonPOJO } from "$lib/utils/helpers";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const profiles = await locals.pb.collection("users").getFullList(2048).then(parseNonPOJO);
		return { profiles };
	} catch (e: any) {
		throw error(e.status, e.message);
	}
};
