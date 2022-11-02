<script lang="ts">
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;
	let totalUpvotes = $page.data.upvotes.length;
	let totalDownvotes = $page.data.downvotes.length;

	import type { ActionData } from './$types';

	export let form: ActionData;

	const upvoteHandler = async () => {
		totalDownvotes = totalDownvotes - 1 < 0 ? 0 : totalDownvotes - 1;
		totalUpvotes++;
	};

	const downvteHandler = async () => {
		totalUpvotes = totalUpvotes - 1 < 0 ? 0 : totalUpvotes - 1;
		totalDownvotes++;
	};
</script>

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
		{#each data.question.tags as tag}
			<a href={`/explore/${tag}`} class="text-xs p-1 bg-primary/20 text-primary mr-1">{tag}</a>
		{/each}
	</div>

	<div class="buttons flex items-center mt-4 gap-6">
		{#if $page.data.authenticated}
			<button type="button" on:click={upvoteHandler} class="flex items-center gap-3">
				<div class="upvote_icon">
					<img src="/svgs/thumbs-up-solid.svg" alt="thumbs up icon" />
				</div>
				<span class="upvote_val">{totalUpvotes}</span>
			</button>
			<button type="button" on:click={downvteHandler} class="flex items-center gap-3"
				><span class="downvote_val">{totalDownvotes}</span>
				<div class="downvote_icon">
					<img src="/svgs/thumbs-down-solid.svg" alt="thumbs down icon" />
				</div>
			</button>
		{:else}
			<a href="/sign-in" class="flex items-center gap-3">
				<div class="upvote_icon">
					<img src="/svgs/thumbs-up-solid.svg" alt="thumbs up icon" />
				</div>
				<span class="upvote_val">{totalUpvotes}</span></a
			>
			<a href="/sign-in" class="flex items-center gap-3">
				<span class="downvote_val">{totalDownvotes}</span>
				<div class="downvote_icon">
					<img src="/svgs/thumbs-down-solid.svg" alt="thumbs down icon" />
				</div>
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
				<a href={`/users/${comment.user}`} class="text-accent text-xs">{comment.user}</a>
				<p class="text-xs">
					{comment.content}
				</p>
			</div>
		{/each}
	{/if}
</div>
<div class="footer w-full mt-8">
	<form class="w-full" method="POST" action="?/newComment">
		<label class="text-label" for="answer">Your answer</label>
		<textarea
			disabled={!$page.data.authenticated}
			id="answer"
			name="answer"
			class="textarea textarea-bordered h-48 w-full max-w-lg resize-none"
			placeholder={`${!$page.data.authenticated ? 'Sign in to answer' : 'Answer...'}`}
		/>
		{#if form?.failed}
			<span class="badge badge-error text-xs">{form.message}</span>
		{/if}
		{#if $page.data.authenticated}
			<button id="submit" class="px-12 py-3 bg-primary text-white">Submit answer</button>
		{/if}
	</form>
</div>

<style lang="postcss">
	.info {
		@apply mt-4;
		@apply flex items-center justify-start gap-2;
	}

	.upvote_val,
	.downvote_val {
		@apply text-xs;
	}

	.upvote_icon,
	.downvote_icon {
		@apply w-5 h-5;
	}
</style>
