<script lang="ts">
	export let tags: string[];
	export let content: string;
	export let totalUpvotes: number;
	export let totalDownvotes: number;
	export let authenticated: boolean;

	const upvoteHandler = async () => {
		totalDownvotes = totalDownvotes - 1 < 0 ? 0 : totalDownvotes - 1;
		totalUpvotes++;
	};

	const downvteHandler = async () => {
		totalUpvotes = totalUpvotes - 1 < 0 ? 0 : totalUpvotes - 1;
		totalDownvotes++;
	};
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
