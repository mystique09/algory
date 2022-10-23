<script>
	import Question from '$lib/components/question.svelte';
</script>

<div class="container">
	<div class="content px-4">
		<div class="heading">
			<h1>All questions</h1>
			<a href="/questions/new">Ask question</a>
		</div>
		<div class="info mt-8">
			<p>100 questions</p>
		</div>
		<div class="divider" />
		<div class="questions">
			<Question />
			<Question />
			<Question />
			<Question />
		</div>
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
