<script lang="ts">
	import ProfileActivities from '$lib/components/profile/profile_activities.svelte';
	import ProfileHeading from '$lib/components/profile/profile_heading.svelte';
	import type { PageData } from './$types';
	import { toast } from '$lib/stores/toast';
	import type { ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let isFollowing = data.authenticated
		? data.followers.some((u: typeof data.followers) => u.follower === data.user.id)
		: false;
	let followers = data.followers.length || 0;
	let following = data.following.length || 0;

	if (form?.changeProfileSuccess || form?.followSuccess || form?.unfollowSuccess) {
		toast.success(form?.message);
	}

	if (form?.changeProfileFailed || form?.followFailed || form?.unfollowFailed) {
		toast.error(form?.message);
	}
</script>

<svelte:head>
	<title>{data.info.name}'s profile</title>
	<meta type="description" content={data.info.bio || `Hello I am ${data.info.name}`} />
</svelte:head>

<div class="container">
	<div class="wrap">
		<ProfileHeading
			userInfo={{
				userId: data.user?.id,
				infoId: data.info.id,
				isAuthenticated: data.authenticated
			}}
			userData={{
				name: data.info.name ?? '',
				bio: data.info.bio ?? '',
				social: data.info.github ?? '',
				followers,
				following,
				followId: data.followId,
				isFollowing
			}}
		/>
		<ProfileActivities
			totalQuestions={data.info.questions.length}
			questions={data.info.expand.questions}
		/>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply h-full w-full mb-24;
	}

	.wrap {
		@apply px-4 max-w-xl m-auto;
	}
</style>
