<script lang="ts">
	import Question from '$lib/components/question.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<a class="p-2 link link-primary" href="/questions">Go back</a>
<Question
	id={data.question.id}
	author={data.question.author}
	title={data.question.title}
	description={data.question.description}
	tags={data.question.tags}
	views={data.question.views}
/>
