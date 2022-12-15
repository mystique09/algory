import type { PageServerLoad, Actions } from "./$types";
import { error, fail, redirect } from "@sveltejs/kit";
import { parseNonPOJO } from "$lib/utils/helpers";

export const load: PageServerLoad = async ({ parent, locals }) => {
    const { authenticated } = await parent();

    if (!authenticated) {
        throw redirect(307, "/sign-in");
    }

    return {
        user: parseNonPOJO(locals.session),
    };
};

export const actions: Actions = {
    async requestVerification({ locals }) {
        const { email } = locals.session!;

        try {
            await locals.pb.collection("users").requestVerification(email);
            return {
                requestVerificationSuccess: true,
                message: "Verification email has been sent!",
            };
        } catch (e: any) {
            if (e.status === 400) {
                return fail(e.status, {
                    requestVerificationFailed: true,
                    message: e.data.email?.message,
                });
            }
            return fail(e.status, {
                requestVerificationFailed: true,
                message: "Request for verification failed, try again later.",
            });
        }
    },
    async updateAccount({ locals, request }) {
        const data = await request.formData();
        const username = data.get("username");
        const { id: userId } = locals.session!;

        if (username!.toString().length < 8) {
            return fail(400, {
                invalidUsernameLength: true,
                message: "Username must be atleast 8 characters.",
            });
        }

        try {
            const data = {
                username,
            };

            await locals.pb.collection("users").update(userId, data);
            locals.pb.authStore.clear();

            return { updateAccountSuccess: true, message: "Account saved!" };
        } catch (e: any) {
            if (e.status === 400) {
                return fail(e.status, {
                    updateAccountFailed: true,
                    message: "Failed to update account, check your input!",
                });
            }
            return fail(e.status, {
                updateAccountFailed: true,
                message: "An error occured when trying to update account.",
            });
        }
    },
    async changePassword({ locals, request }) {
        const data = await request.formData();
        const oldPassword = data.get("old-password");
        const newPassword = data.get("password");
        const confirmNewPassword = data.get("confirm-password");
        const userId = locals.session?.id!;

        if (newPassword !== confirmNewPassword) {
            return fail(400, {
                confirmPasswordInvalid: true,
                message: "Mismatched confirm password",
            });
        }

        try {
            const data = {
                oldPassword,
                password: newPassword,
                passwordConfirm: confirmNewPassword,
            };

            await locals.pb.collection("users").update(userId, data);
            locals.pb.authStore.clear();

            return { changePasswordSuccess: true, message: "Password saved." };
        } catch (e: any) {
            if (e.status === 400) {
                const { data } = e.data;
                return fail(e.status, {
                    oldPasswordInvalid: true,
                    message: data.oldPassword.message,
                });
            }
            return fail(e.status, {
                changePasswordFailed: true,
                message: "An error occured when trying to update password.",
            });
        }
    },
    async deleteAccount({ locals }) {
        const { id: userId } = locals.session!;

        try {
            await locals.pb.collection("users").delete(userId);
            locals.pb.authStore.clear();

            return { accountDeleted: true, message: "Account deleted!" };
        } catch (e: any) {
            throw error(e.status, e.message);
        }
    },
};
