<script lang="ts">
	import { page } from '$app/stores';
	import QuestionModal from '$lib/components/question_modal.svelte';
</script>

<QuestionModal />
<div class="container mb-24">
	<div class="content px-4 max-w-xl w-full m-auto">
		<div class="heading">
			{#if $page.url.pathname === '/questions'}
				<h1>All questions</h1>
			{:else}
				<h1>One question</h1>
			{/if}

			{#if $page.data.authenticated}
				<label for="question_modal">Ask question</label>
			{:else}
				<label for="_">
					<a href="/sign-in">Ask question</a>
				</label>
			{/if}
		</div>
		<slot />
	</div>
</div>

<style lang="postcss">
	.heading {
		@apply flex items-center justify-between mb-8;
	}

	.heading > h1 {
		@apply font-normal text-xl;
	}

	.heading > label {
		@apply px-6 py-3 bg-primary shadow-md text-secondary text-xs;
	}
</style>
