<script lang="ts">
	import { page } from '$app/stores';
	import Question from '$lib/components/question.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="h-screen px-2">
	<a class="link link-accent" href="/explore">Go back</a>
	<h1 class="text-center">Explore all {$page.params.topic} topics</h1>
	<div
		class="questions flex flex-col items-center justify-center"
		class:h-screen={!data.topic.totalItems}
	>
		{#if data.topic.totalItems > 0}
			{#each data.topic.items as topic}
				<Question
					id={topic.id}
					author={topic.author}
					title={topic.title}
					content={topic.content}
					tags={topic.tags}
					views={topic.views}
					votes={topic.votes.length}
					answers={topic.answers.length}
				/>
			{/each}
		{:else}
			<h1 class="text-4xl">No result found!</h1>
		{/if}
	</div>
</div>
