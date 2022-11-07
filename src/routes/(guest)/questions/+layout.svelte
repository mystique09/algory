<script lang="ts">
	import { page } from '$app/stores';
	import QuestionModal from '$lib/components/question_modal.svelte';
</script>

<QuestionModal />
<div class="px-3">
	<div class="heading">
		{#if $page.url.pathname === '/questions'}
			<h1>All questions</h1>
		{:else}
			<h1>One question</h1>
		{/if}

		{#if $page.data.authenticated}
			<button
				class="px-6 py-3 bg-primary content rounded-sm shadow-md text-primary-content text-xs"
			>
				<label for="question_modal"> Ask question </label>
			</button>
		{:else}
			<button class="px-6 py-3 bg-accent shadow-md text-accent-content text-xs">
				<a href="/sign-in">Ask question</a>
			</button>
		{/if}
	</div>
	<slot />
</div>

<style lang="postcss">
	.heading {
		@apply flex items-center justify-between;
	}

	.heading > h1 {
		@apply font-normal text-xl;
	}
</style>
