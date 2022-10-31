<script>
	import { page } from '$app/stores';
</script>

{#if !!$page.data.authenticated}
	<footer>
		<div class="wrap">
			<ul>
				<li class="h-6 w-6">
					<a href="/questions"><img src="/svgs/globe-solid.svg" alt="globe icon" /></a>
				</li>
				<li class="h-6 w-6">
					<a href="/explore"> <img src="/svgs/magnifying-glass-solid.svg" alt="search icon" /></a>
				</li>
				<li class="h-6 w-6">
					<a href="/settings"> <img src="/svgs/gear-solid.svg" alt="settings icon" /></a>
				</li>
			</ul>
		</div>
	</footer>
{/if}

<style lang="postcss">
	footer {
		@apply fixed bottom-0 left-0 bg-white;
		@apply w-full;
	}

	.wrap {
		@apply p-8;
		@apply max-w-4xl m-auto;
	}

	.wrap ul {
		@apply flex items-center justify-between;
	}
</style>
