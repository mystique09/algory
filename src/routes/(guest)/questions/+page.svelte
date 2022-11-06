<script lang="ts">
	import { page } from '$app/stores';

	import Question from '$lib/components/question.svelte';
	import { toast, ToastType } from '$lib/stores/toast';
	import type { PageData } from './$types';

	export let data: PageData;

	$: numPages = Number($page.url.searchParams.get('page')) || 1;
	$: prevPage = numPages - 1 || numPages;
	$: nextPage = numPages % data.questions.totalPages;
	import type { ActionData } from './$types';
	export let form: ActionData;

	if (form?.failed) {
		toast.addToast(ToastType.ERROR, form?.tags);
	}
</script>

<svelte:head>
	<title>Algory, latest questions.</title>
</svelte:head>

<div class="info flex items-center justify-between mt-2">
	<p>{$page.data.questions.items.length} questions</p>
	<span class="text-lg text-accent">Page {numPages} of {data.questions.totalPages}</span>
</div>
<div class="divider" />
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
				votes={question.upvotes.length + question.downvotes.length}
				answers={question.answers.length}
			/>
		{/each}
	{:else}
		<h1 class="text-4xl">No questions yet!</h1>
	{/if}
</div>

<div class="btn-group flex items-center justify-center m-4 gap-1">
	<a disabled={prevPage === 0} href={`/questions?page=${prevPage}`} class="btn btn-wide text-xs"
		>Previous</a
	>
	<a disabled={nextPage === numPages} href={`/questions?page=${nextPage + 1}`} class="btn text-xs"
		>Next</a
	>
</div>
