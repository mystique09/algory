<script lang="ts">
	import ProfileActivities from '$lib/components/profile/profile_activities.svelte';
	import ProfileHeading from '$lib/components/profile/profile_heading.svelte';
	import type { PageData } from './$types';
	import { toast } from '$lib/stores/toast';

	export let data: PageData;

	import type { ActionData } from './$types';
	export let form: ActionData;

	let isFollowing = data.authenticated
		? data.followers.some((u: typeof data.followers) => u.follower === data.user.id)
		: false;
	let followers = data.followers.length || 0;
	let following = data.following.length || 0;

	if (form?.success) {
		toast.success(form?.message);
	}

	if (form?.failed) {
		toast.error(form?.message!, 5000);
	}
</script>

<svelte:head>
	<title>{data.info.name}'s profile</title>
	<meta type="description" content={data.info.bio || `Hello I am ${data.info.name}`} />
</svelte:head>

<div class="container">
	<div class="wrap">
		<ProfileHeading {data} {followers} {following} {isFollowing} />
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
