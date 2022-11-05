<script lang="ts">
	import { loading, LoadingStatus } from '$lib/stores/loading';
	import AlgoryIcon from '../icons/algory_icon.svelte';

	$: if ($loading.status === LoadingStatus.NAVIGATING) {
		setTimeout(() => {
			if ($loading.status === LoadingStatus.NAVIGATING) {
				$loading.status = LoadingStatus.LOADING;
			}
		}, 400);
	}
</script>

{#if $loading.status === LoadingStatus.LOADING}
	<div
		class="loading absolute w-full h-full bg-black/70 z-20 flex flex-col gap-3 items-center justify-center"
	>
		<AlgoryIcon />
		<progress class="progress progress-primary w-64" />
	</div>
{/if}
