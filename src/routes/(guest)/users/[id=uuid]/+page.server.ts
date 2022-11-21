import { parseNonPOJO } from "$lib/utils/helpers";
import { error, invalid } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
	const { id } = params;
	try {
		const info = await locals.pb
			.collection("users")
			.getOne(id, {
				expand: "questions,questions.votes",
			})
			.then(parseNonPOJO);

		const followers = await locals.pb
			.collection("followers")
			.getFullList(2048, {
				filter: `user.id = "${id}"`,
			})
			.then(parseNonPOJO);

		const following = await locals.pb
			.collection("followers")
			.getFullList(2048, {
				filter: `follower.id = "${id}"`,
			})
			.then(parseNonPOJO);

		return {
			info,
			questions: info.questions,
			followers,
			following,
			followId: followers[0]?.id,
		};
	} catch (e: any) {
		if (e.status === 404) {
			throw error(e.status, "User not found!");
		}
		throw error(e.status, e.message);
	}
};

export const actions: Actions = {
	async changeProfile({ locals, request }) {
		const data = await request.formData();
		const name = data.get("name");
		const bio = data.get("bio");
		const github = data.get("github");
		const { id } = locals.session!;

		try {
			const data = {
				name,
				bio,
				github,
			};

			await locals.pb.collection("users").update(id, data).then(parseNonPOJO);

			return { changeProfileSuccess: true, message: "Profile saved." };
		} catch (e: any) {
			console.log(e);
			if (e.status === 400 || e.status === 404) {
				return invalid(e.status, {
					changeProfileFailed: true,
					message: "Failed to update profile",
				});
			}
			throw error(e.status, e.message);
		}
	},

	async followUser({ locals, params }) {
		const { id: user } = params;
		const { id: follower } = locals.session!;

		try {
			const data = {
				hash: user + follower,
				user,
				follower,
			};

			const newFollower = await locals.pb.collection("followers").create(data).then(parseNonPOJO);
			return {
				followSuccess: true,
				message: "User added to following!",
				newFollower,
			};
		} catch (e: any) {
			if (e.status === 400 || e.status === 404) {
				return invalid(e.status, {
					followFailed: true,
					message: "Failed to follow user.",
				});
			}
			throw error(e.status, "Something went wrong!");
		}
	},

	async unfollowUser({ locals, request }) {
		const data = await request.formData();
		const followId = data.get("followId");

		try {
			await locals.pb.collection("followers").delete(followId?.toString()!);
			return { unfollowSuccess: true, message: "User removed from following." };
		} catch (e: any) {
			if (e.status === 400 || e.status === 404) {
				return invalid(e.status, {
					unfollowFailed: true,
					message: "Failed to unfollow user!",
				});
			}
			throw error(e.status, "Something went wrong!");
		}
	},
};
