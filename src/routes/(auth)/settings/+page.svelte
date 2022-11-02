<script lang="ts">
	import WarningIcon from '$lib/components/warning_icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="wrap">
		{#if !data.user.verified}
			<div class="alert alert-warning text-xs">
				<WarningIcon />
				Your email is not verified!
			</div>
		{/if}
		<h1>This is your settings {data.user.profile.name}</h1>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply bg-base-100;
	}
	.wrap {
		@apply max-w-md m-auto p-4;
		@apply h-auto;
		@apply rounded-md;
	}
</style>
