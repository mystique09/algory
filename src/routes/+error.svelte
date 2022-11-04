<script lang="ts">
	import { page } from '$app/stores';

	const reloadHandler = async () => {
		location.reload();
	};

	const goBack = () => history.back();
</script>

<div class="container">
	<div class="wrap">
		<div class="top">
			<h1 class="text-4xl">Error {$page.status}</h1>
			<p>{$page.error?.message}</p>
		</div>
		<div class="bottom">
			<div class="btns flex flex-col gap-2 w-full">
				<button
					class="px-6 py-3 ring-2 ring-secondary text-secondary rounded-sm text-xs text-center"
					on:click={goBack}>Go back</button
				>
				<button
					on:click={reloadHandler}
					class="px-6 py-3 bg-accent text-accent-content rounded-md text-xs"
					type="button">Reload page</button
				>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply px-2;
		@apply h-screen;
	}
	.wrap {
		@apply h-full max-w-lg w-full m-auto;
	}

	.wrap .top {
		@apply flex flex-col gap-1 items-start justify-center h-1/3;
	}
</style>
