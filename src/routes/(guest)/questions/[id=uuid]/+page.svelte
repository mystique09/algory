<script lang="ts">
	import { page } from '$app/stores';
	import QuestionAnswers from '$lib/components/question/question_answers.svelte';
	import QuestionContent from '$lib/components/question/question_content.svelte';
	import QuestionForm from '$lib/components/question/question_form.svelte';
	import QuestionHeading from '$lib/components/question/question_heading.svelte';
	import { toast } from '$lib/stores/toast';

	import type { PageData } from './$types';

	export let data: PageData;
	let totalUpvotes = $page.data.upvotes.length;
	let totalDownvotes = $page.data.downvotes.length;

	import type { ActionData } from './$types';

	export let form: ActionData;

	if (form?.failed) {
		toast.error(form?.message, 5000);
	}
</script>

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
/>
<QuestionAnswers answers={$page.data.question.expand.answers || []} />
<QuestionForm authenticated={data.authenticated} />
