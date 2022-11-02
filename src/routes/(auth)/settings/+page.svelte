<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<div class="wrap">
		{#if !data.user.verified}
			<div class="alert alert-warning text-xs mb-2">Your email is not verified!</div>
		{/if}
		<h1>This is your settings {data.user.profile.name}</h1>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply bg-base-100;
	}
	.wrap {
		@apply max-w-md m-auto;
		@apply bg-white;
		@apply h-auto;
		@apply rounded-md;
	}
</style>
