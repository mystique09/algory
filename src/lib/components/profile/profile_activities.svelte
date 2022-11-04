<script lang="ts">
	import Question from '../question.svelte';

	type Question = {
		id: string;
		author: string;
		title: string;
		description: string;
		tags: string;
		views: number;
	};

	export let questions: Question[];
	export let totalQuestions: number;
</script>

<div class="questions flex flex-col items-center justify-center">
	<h1>Activities</h1>
	{#if totalQuestions > 0}
		{#each questions as question}
			<Question
				id={question.id}
				author={question.author}
				title={question.title}
				description={question.description}
				tags={question.tags}
				views={question.views}
			/>
		{/each}
	{/if}
</div>
