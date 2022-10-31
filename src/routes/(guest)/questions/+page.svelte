<script lang="ts">
	import { page } from '$app/stores';

	import Question from '$lib/components/question.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: numPages = Number($page.url.searchParams.get('page')) || 1;
	$: prevPage = numPages - 1 || numPages;
	$: nextPage = numPages % data.questions.totalPages;
</script>

<div class="info mt-8 flex items-center justify-between">
	<p>{$page.data.questions.items.length} questions</p>
	<span class="text-lg text-primary">Page {numPages} of {data.questions.totalPages}</span>
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

<div class="btn-group flex items-center justify-center m-4 gap-1">
	<a disabled={prevPage === 0} href={`/questions?page=${prevPage}`} class="btn btn-wide text-xs"
		>Previous</a
	>
	<a disabled={nextPage === numPages} href={`/questions?page=${nextPage + 1}`} class="btn text-xs"
		>Next</a
	>
</div>
