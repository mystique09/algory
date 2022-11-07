<script lang="ts">
	import WarningIcon from '$lib/components/icons/warning_icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="wrap h-screen">
	{#if !data.user.verified}
		<div class="alert alert-warning text-xs flex flex-row items-center justify-start mb-4">
			<WarningIcon />
			Your email is not verified!
		</div>
	{/if}
	<h1>This is your settings {data.user.name}</h1>
</div>
