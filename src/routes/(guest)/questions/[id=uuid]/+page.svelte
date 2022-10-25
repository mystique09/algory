<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
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
		</div>
		<div class="answers mt-8 pl-8 max-w-lg">
			<div class="answer">
				<div class="divider" />
				<p class="text-xs">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti et culpa tenetur
					explicabo voluptatem? Modi accusamus voluptate facere, ducimus dolor error possimus
					corrupti eligendi dolore nemo. At ipsa iure vitae!
				</p>
				<a href="/users/wdow5dggcwrxdff" class="text-accent text-xs">wdow5dggcwrxdff</a>
			</div>
			<div class="answer">
				<div class="divider" />
				<p class="text-xs">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti et culpa tenetur
					explicabo voluptatem? Modi accusamus voluptate facere, ducimus dolor error possimus
					corrupti eligendi dolore nemo. At ipsa iure vitae!
				</p>
				<a href="/users/wdow5dggcwrxdff" class="text-accent text-xs">wdow5dggcwrxdff</a>
			</div>
			<div class="answer">
				<div class="divider" />
				<p class="text-xs">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti et culpa tenetur
					explicabo voluptatem? Modi accusamus voluptate facere, ducimus dolor error possimus
					corrupti eligendi dolore nemo. At ipsa iure vitae!
				</p>
				<a href="/users/wdow5dggcwrxdff" class="text-accent text-xs">wdow5dggcwrxdff</a>
			</div>
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
