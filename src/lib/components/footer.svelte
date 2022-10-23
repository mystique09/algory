<script>
	import { page } from '$app/stores';
</script>

{#if !!$page.data.session.user}
	<footer>
		<div class="wrap">
			<ul>
				<li><a href="/questions">Quesions</a></li>
				<li><a href="/explore">Explore</a></li>
				<li><a href="/settings">Settings</a></li>
			</ul>
		</div>
	</footer>
{/if}

<style lang="postcss">
	footer {
		@apply absolute bottom-0 left-0;
		@apply w-full;
	}

	.wrap {
		@apply p-8;
	}

	.wrap ul {
		@apply flex items-center justify-between;
	}
</style>
