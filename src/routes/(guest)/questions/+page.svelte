<script lang="ts">
	import { page } from '$app/stores';
	import Question from '$lib/components/question.svelte';
	import { toast } from '$lib/stores/toast';
	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	if (form?.titleInvalid || form?.creationError || form?.contentInvalid || form?.tagsInvalid) {
		toast.error(form?.tags, 3500);
	}

	if (form?.creationSuccess) {
		toast.success('New question created.');
	}

	$: numPages = Number($page.url.searchParams.get('page')) || 1;
	$: prevPage = numPages - 1 || numPages;
	$: nextPage = numPages % data.questions.totalPages;
</script>

<svelte:head>
	<title>Algory, latest questions.</title>
</svelte:head>

<div class="info flex items-center justify-between mt-4">
	<p>{$page.data.questions.items.length} questions</p>
	<span class="text-md">Page {numPages} of {data.questions.totalPages}</span>
</div>
<div class="divider" />
<div class="mb-24">
	<div
		class="questions flex flex-col items-center justify-center"
		class:h-screen={!data.questions.totalItems}
	>
		{#if data.questions.totalItems > 0}
			{#each data.questions.items as question}
				<Question
					id={question.id}
					author={question.author}
					title={question.title}
					content={question.content}
					tags={question.tags}
					views={question.views}
					votes={question.votes.length}
					answers={question.answers.length}
				/>
			{/each}
		{:else}
			<h1 class="text-4xl">No questions yet :(</h1>
		{/if}
	</div>

	{#if data.questions.totalItems > 10 && data.questions.totalPages > 1}
		<div class="btn-group flex items-center justify-center m-4 gap-1">
			<a disabled={prevPage === 0} href={`/questions?page=${prevPage}`} class="btn btn-wide text-xs"
				>Previous</a
			>
			<a
				disabled={nextPage === numPages}
				href={`/questions?page=${nextPage + 1}`}
				class="btn text-xs">Next</a
			>
		</div>
	{/if}
</div>
