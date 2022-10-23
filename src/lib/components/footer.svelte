<script>
	import { page } from '$app/stores';
</script>

<footer class:hidden={!$page.data.session.user}>
	<div class="wrap">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/explore">Explore</a></li>
			<li><a href="/settings">Settings</a></li>
		</ul>
	</div>
</footer>

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
