<script lang="ts">
	import Answer from '../answer/answer.svelte';

	export let answers: Answer[];
</script>

<div class="answers mt-8 pl-8 max-w-lg">
	{#if !(answers.length > 0)}
		<p>Be the first one to comment!</p>
	{:else}
		{#each answers as answer}
			<Answer
				answer={{
					content: answer.content,
					author: answer.author
				}}
			/>
		{/each}
	{/if}
</div>
