<script lang="ts">
	import { page } from '$app/stores';

	const reloadHandler = async () => {
		window.location.reload();
	};
</script>

<div class="container">
	<div class="wrap">
		<div class="top">
			<h1 class="text-4xl">Error {$page.status}</h1>
			<p>{$page.error?.message}</p>
		</div>
		<div class="bottom">
			<div class="btns flex flex-col gap-2 w-full">
				<a class="px-6 py-3 ring-2 ring-primary rounded-sm text-xs text-center" href="/questions"
					>Go back</a
				>
				<button
					on:click={reloadHandler}
					class="px-6 py-3 bg-primary text-white rounded-md text-xs"
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
