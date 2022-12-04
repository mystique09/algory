<script lang="ts">
	import { page } from '$app/stores';
	import { toast } from '$lib/stores/toast';
	import QuestionAnswers from '$lib/components/question/question_answers.svelte';
	import QuestionContent from '$lib/components/question/question_content.svelte';
	import QuestionForm from '$lib/components/question/question_form.svelte';
	import QuestionHeading from '$lib/components/question/question_heading.svelte';

	import type { PageData } from './$types';
	import type { ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	if (form?.upvoteFailed || form?.downvoteFailed || form?.answerFailed) {
		toast.error(form?.message!, 5000);
	}

	let totalUpvotes = data.upvotes.length;
	let totalDownvotes = data.downvotes.length;

	const hasUpvote = data.authenticated
		? data.upvotes.filter((vote: { id: string; user: string; hash: string }) => {
				return vote.user === data.user.id;
		  })
		: false;
	const hasDownvote = data.authenticated
		? data.downvotes.filter((vote: { id: string; user: string; hash: string }) => {
				return vote.user === data.user.id;
		  })
		: false;
</script>

<div class="relative p-2">
	<QuestionHeading
		title={data.question.title}
		author={data.question.author}
		views={data.question.views}
	/>
	<QuestionContent
		authenticated={data.authenticated}
		content={data.question.content}
		tags={data.question.tags}
		{totalUpvotes}
		{totalDownvotes}
		upvotes={hasUpvote}
		downvotes={hasDownvote}
	/>
	<QuestionAnswers answers={$page.data.question.expand.answers || []} />
	<QuestionForm authenticated={data.authenticated} />
</div>
