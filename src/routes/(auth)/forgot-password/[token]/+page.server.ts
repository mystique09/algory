import { error, invalid, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
	const { authenticated } = await parent();

	if (authenticated) {
		throw redirect(307, "/questions");
	}

	return {};
};

export let actions: Actions = {
	async confirmPasswordReset({ locals, request, params }) {
		const data = await request.formData();

		const token = params.token;
		const newPassword = data.get("new_password");
		const newPasswordConfirm = data.get("new_password_confirm");

		if (!(newPassword && newPasswordConfirm)) {
			return invalid(400, {
				missingFields: true,
				message: "Missing required fields!",
			});
		}

		if (newPassword.toString() !== newPasswordConfirm.toString()) {
			return invalid(400, {
				mismatch: true,
				message: "New password doesn't match.",
			});
		}

		try {
			await locals.pb
				.collection("users")
				.confirmPasswordReset(token!, newPassword.toString(), newPasswordConfirm.toString());
			return { passwordReset: true, message: "Password successfully reset." };
		} catch (e: any) {
			if (e.status === 400) {
				return invalid(e.status, {
					confirmFailed: true,
					message: "Failed to reset password, please try again later.",
				});
			}
			throw error(e.status, "Something went wrong!");
		}
	},
};
