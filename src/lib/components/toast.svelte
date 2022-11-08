<script lang="ts">
	import { toast } from '$lib/stores/toast';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Alert from './alert.svelte';
</script>

{#if $toast}
	<div class="fixed bottom-20 z-30 toast toast-start toast-bottom h-auto">
		{#each $toast as alert (alert.id)}
			<div animate:flip transition:fly={{ y: 30 }}>
				<Alert type={alert.type} message={alert.message} />
			</div>
		{/each}
	</div>
{/if}
