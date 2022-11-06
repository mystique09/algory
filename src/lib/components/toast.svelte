<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import Alert from './alert.svelte';

	$: $toast.map((_, i) => {
		setTimeout(() => {
			$toast = $toast.filter((_, j) => i != j);
		}, 2000);
	});
</script>

<div class="absolute top-0 right-0 toast toast-top toast-end flex flex-col gap-2 h-auto">
	{#if $toast.length > 0}
		{#each $toast as alert}
			<Alert type={alert.type} message={alert.message} />
		{/each}
	{/if}
</div>

<style lang="postcss">
	.toast {
		@apply absolute z-30;
	}
</style>
