<script lang="ts">
	import Question from '../question.svelte';

	type Question = {
		id: string;
		author: string;
		title: string;
		content: string;
		tags: string;
		views: number;
		upvotes: string[];
		downvotes: string[];
		answers: string[];
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
				content={question.content}
				tags={question.tags}
				views={question.views}
				votes={question.upvotes.length + question.downvotes.length}
				answers={question.answers.length}
			/>
		{/each}
	{/if}
</div>
