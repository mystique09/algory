<script lang="ts">
	import { page } from '$app/stores';

	import ProfileActivities from '$lib/components/profile/profile_activities.svelte';
	import ProfileHeading from '$lib/components/profile/profile_heading.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const userId = $page.params.id;
	let isFollowing = data.authenticated
		? data.followers.some((u: typeof data.followers) => u.follower === userId)
		: false;
	let followers = data.followers.length || 0;
	let following = data.following.length || 0;
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
