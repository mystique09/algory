<script lang="ts">
	import ThumbsDownSolid from '../icons/thumbs-down-solid.svelte';
	import ThumbsUpSolid from '../icons/thumbs-up-solid.svelte';

	type Vote = {
		id: string;
		user: string;
		question: string;
		hash: string;
		type: 'upvote' | 'downvote';
	};

	export let tags: string[];
	export let content: string;
	export let totalUpvotes: number;
	export let totalDownvotes: number;
	export let authenticated: boolean;
	export let upvotes: Vote[];
	export let downvotes: Vote[];

	let hasUpvote = upvotes.length > 0;
	let hasDownvote = downvotes.length > 0;
</script>

<div class="content mt-4">
	<p class="text-sm">{content}</p>
	<div class="tags mt-4">
		{#each tags as tag}
			<div class="badge badge-secondary text-2xs ml-1">
				<a href={`/explore/${tag}`}>{tag}</a>
			</div>
		{/each}
	</div>

	<div class="divider" />
	<div class="buttons flex items-center mt-4 gap-6">
		{#if authenticated}
			<form method="POST" action="?/upvoteQuestion">
				<button class="flex items-center gap-3">
					<div class="upvote_icon">
						<ThumbsUpSolid className={`w-6 h-6 ${hasUpvote ? 'fill-primary' : 'stroke-primary'}`} />
					</div>
					<span class="upvote_val text-primary">{totalUpvotes}</span>
				</button>
			</form>
			<form method="POST" action="?/downvoteQuestion">
				<button class="flex items-center gap-3">
					<span class="downvote_val text-primary">{totalDownvotes}</span>
					<div class="downvote_icon">
						<ThumbsDownSolid
							className={`w-6 h-6 ${hasDownvote ? 'fill-primary' : 'stroke-primary'}`}
						/>
					</div>
				</button>
			</form>
		{:else}
			<a href="/sign-in" class="flex items-center gap-3">
				<div class="upvote_icon">
					<ThumbsUpSolid className={`w-6 h-6 ${hasUpvote ? 'fill-primary' : 'stroke-primary'}`} />
				</div>
				<span class="upvote_val">{totalUpvotes}</span></a
			>
			<a href="/sign-in" class="flex items-center gap-3">
				<span class="downvote_val">{totalDownvotes}</span>
				<div class="downvote_icon">
					<ThumbsDownSolid
						className={`w-6 h-6 ${hasDownvote ? 'fill-primary' : 'stroke-primary'}`}
					/>
				</div>
			</a>
		{/if}
	</div>
</div>

<style lang="postcss">
	.upvote_val,
	.downvote_val {
		@apply text-xs;
	}

	.upvote_icon,
	.downvote_icon {
		@apply w-5 h-5;
	}
</style>
