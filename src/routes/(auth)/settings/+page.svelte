<script lang="ts">
	import WarningIcon from '$lib/components/icons/warning_icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="wrap">
		{#if !data.user.verified}
			<div class="alert alert-warning text-xs flex flex-row items-center justify-start mb-4">
				<WarningIcon />
				Your email is not verified!
			</div>
		{/if}
		<h1>This is your settings {data.user.name}</h1>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply bg-base-100 h-screen;
	}
	.wrap {
		@apply max-w-md m-auto;
		@apply rounded-md;
	}
</style>
