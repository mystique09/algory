<script lang="ts">
	import { page } from '$app/stores';

	import QuestionModal from '$lib/components/question_modal.svelte';
</script>

<QuestionModal />
<div class="relative m-auto max-w-4xl w-full h-screen">
	<div class="p-2 h-auto">
		<div class="heading">
			{#if $page.url.pathname === '/questions'}
				<h1>All questions</h1>
			{:else}
				<h1>One question</h1>
			{/if}

			{#if $page.data.authenticated}
				<button class="bg-accent rounded-full p-4">
					<label for="question_modal">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-8 h-8 stroke-accent-content"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
							/>
						</svg>
					</label>
				</button>
			{:else}
				<a href="/sign-in" class="bg-accent rounded-full p-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-8 h-8 stroke-accent-content"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
						/>
					</svg></a
				>
			{/if}
		</div>
		<slot />
	</div>
</div>

<style lang="postcss">
	.heading {
		@apply flex items-center justify-between;
	}

	.heading > h1 {
		@apply font-normal text-xl;
	}
</style>
