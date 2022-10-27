<script lang="ts">
	import { page } from '$app/stores';
	import { voteBaseHandler } from '$lib/utils/upvote';
	import type { PageData } from './$types';

	export let data: PageData;
	const totalUpVotes = $page.data.question.upvotes.length;
	const totalDownVotes = $page.data.question.downvotes.length;

	const upVoteHandler = async () => {
		const res = await voteBaseHandler('posts', 'post_upvotes', {
			user: $page.data.session.user.id,
			record_id: $page.data.question.id
		});
		console.log(res);
	};

	const downVoteHandler = async () => {
		const res = await voteBaseHandler('posts', 'post_downvotes', {
			user: $page.data.session.user.id,
			record_id: $page.data.question.id
		});
		console.log(res);
	};
</script>

<div class="container max-w-6xl">
	<div class="wrap mt-24 mb-36">
		<div class="flex items-center justify-end my-8">
			<a class="px-8 py-4 bg-primary shadow-md text-secondary text-sm" href="/questions/new"
				>Ask question</a
			>
		</div>
		<h2 class="text-xl">{data.question.title}</h2>
		<div class="info">
			<p class="text-xs">
				<span class="text-gray-500">Author </span><a
					class="text-accent"
					href={`/users/${data.question.author}`}>{data.question.author}</a
				>
			</p>
			<p class="text-xs">
				<span class="text-gray-500">Viewed </span>{data.question.views} times
			</p>
		</div>
		<div class="divider" />
		<div class="content">
			<p>{data.question.description}</p>
			<div class="tags mt-4">
				{#each data.question.tags.split(', ') as tag}
					<a href={`/explore/${tag}`} class="text-xs p-1 bg-primary/20 text-primary mr-1">{tag}</a>
				{/each}
			</div>

			<div class="buttons flex items-center mt-4">
				{#if $page.data.session.user}
					<button type="button" on:click={upVoteHandler} class="flex items-center gap-3"
						><span>{totalUpVotes}</span>
						<img src="/svgs/thumbs-up-solid.svg" alt="thumbs up icon" />
					</button>
					<div class="divider divider-horizontal" />
					<button type="button" on:click={downVoteHandler} class="flex items-center gap-3"
						><span>{totalDownVotes}</span>
						<img src="/svgs/thumbs-down-solid.svg" alt="thumbs down icon" />
					</button>
				{:else}
					<a href="/sign-in" class="flex items-center gap-3"
						><span>{totalUpVotes}</span>
						<img src="/svgs/thumbs-up-solid.svg" alt="thumbs up icon" /></a
					>
					<div class="divider divider-horizontal" />
					<a href="/sign-in" class="flex items-center gap-3"
						><span>{totalDownVotes}</span>
						<img src="/svgs/thumbs-down-solid.svg" alt="thumbs down icon" />
					</a>
				{/if}
			</div>
		</div>
		<div class="answers mt-8 pl-8 max-w-lg">
			{#if !($page.data.question.comments.length > 0)}
				<p>Be the first one to comment!</p>
			{:else}
				{#each $page.data.question['@expand'].comments as comment}
					<div class="answer">
						<div class="divider" />
						<p class="text-xs">
							{comment.content}
						</p>
						<a href="/users/wdow5dggcwrxdff" class="text-accent text-xs">{comment.user}</a>
					</div>
				{/each}
			{/if}
		</div>
		<div class="footer w-full mt-8">
			<form class="w-full">
				<label class="text-label" for="answer">Your answer</label>
				<textarea
					disabled={!$page.data.session.user}
					id="answer"
					name="answer"
					class="textarea textarea-bordered h-48 w-full max-w-lg resize-none"
					placeholder={`${!$page.data.session.user ? 'Sign in to answer' : 'Answer...'}`}
				/>
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply px-4 mt-8 m-auto;
	}

	.info {
		@apply mt-4;
		@apply flex items-center justify-start gap-2;
	}
</style>
