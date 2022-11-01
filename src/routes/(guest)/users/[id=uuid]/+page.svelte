<script lang="ts">
	import Question from '$lib/components/question.svelte';

	import type { PageData } from './$types';
	export let data: PageData;

	let isFollowing = data.authenticated
		? data.followers.some((u: typeof data.followers) => u.user === data.user?.id)
		: false;
	let followers = data.followers.length || 0;
	let following = data.following.length || 0;

	function followUser() {
		isFollowing = !isFollowing;
		isFollowing ? followers++ : followers--;
	}
</script>

<svelte:head>
	<title>{data.info.name}'s profile</title>
	<meta
		type="description"
		content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora commodi inventore ipsum
						perferendis error architecto fuga quasi hic."
	/>
</svelte:head>

<div class="container">
	<div class="wrap">
		<div class="heading">
			<div class="avatar offline">
				<div class="w-20 rounded-full">
					<img src="/images/algory.svg" alt="user avatar" />
				</div>
			</div>
			<div class="info mt-2">
				<div class="top flex items-center justify-between">
					<div class="profile">
						<h1 class="text-lg text-bold">{data.info.name}</h1>
						<p class="text-xs">{followers} Followers</p>
						<p class="text-xs">{following} Following</p>
					</div>
					{#if data.authenticated}
						{#if data.user.id !== data.info.userId}
							<div class="profile-actions">
								<button
									type="button"
									on:click={followUser}
									class="btn btn-ghost h-12 flex items-center"
								>
									<div class="w-5 h-5">
										<img
											src={`${
												isFollowing ? '/svgs/user-minus-solid.svg' : '/svgs/user-plus-solid.svg'
											}`}
											alt="follow icon"
											class="w-full h-full"
										/>
									</div>
								</button>
							</div>
						{/if}
					{/if}
				</div>
				<div class="bottom mt-2">
					<p class="text-xs font-light">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora commodi inventore ipsum
						perferendis error architecto fuga quasi hic.
					</p>
				</div>
				<div class="divider" />
				<div class="questions flex flex-col items-center justify-center">
					<h1>Activities</h1>
					{#each data.questions as question}
						<Question
							id={question.id}
							author={question.author}
							title={question.title}
							description={question.description}
							tags={question.tags}
							views={question.views}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply h-full w-full mb-24;
	}

	.wrap {
		@apply px-4 max-w-xl m-auto;
	}

	.heading {
		@apply h-1/2;
		@apply flex flex-col items-start;
	}
</style>
