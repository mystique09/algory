import type { PageServerLoad } from "./$types";
import { error, invalid, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent, params, locals }) => {
	const { user } = await parent();

	if (user.verified) {
		throw redirect(307, "/questions");
	}

	const { token } = params;

	try {
		await locals.pb.collection("users").confirmVerification(token!);
		return { confirmSuccess: true, message: "Account verified!" };
	} catch (e: any) {
		if (e.status === 400) {
			return invalid(e.status, {
				invalidToken: true,
				message: "Missing required value.",
			});
		}
		throw error(e.status, "Something went wrong!");
	}
};
