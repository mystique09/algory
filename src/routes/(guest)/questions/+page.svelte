<script lang="ts">
	import Question from '$lib/components/question.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container mb-24">
	<div class="content px-4">
		<div class="heading">
			<h1>All questions</h1>
			<a href="/questions/new">Ask question</a>
		</div>
		<div class="info mt-8">
			<p>100 questions</p>
		</div>
		<div class="divider" />
		<div class="questions flex flex-col items-center justify-center">
			{#each data.questions.items as question}
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
	<div class="btn-group flex items-center justify-center m-4 gap-1">
		<a href="/questions?page=1" class="btn">1</a>
		<a href="/questions?page=2" class="btn">2</a>
		<a href="/questions?page=0" class="btn btn-disabled">...</a>
		<a href="/questions?page=99" class="btn">99</a>
		<a href="/questions?page=100" class="btn">100</a>
	</div>
</div>

<style lang="postcss">
	.heading {
		@apply flex items-center justify-between;
	}

	.heading > h1 {
		@apply font-semibold text-xl;
	}

	.heading > a {
		@apply px-8 py-4 bg-primary shadow-md text-secondary text-sm;
	}
</style>
