<script>
	import { page } from '$app/stores';
	import GearIcon from './icons/gear_icon.svelte';
	import GlobeIcon from './icons/globe_icon.svelte';
	import MagnifyingGlassIcon from './icons/magnifying-glass-icon.svelte';
</script>

{#if !!$page.data.authenticated}
	<div class="btm-nav md:hidden bg-base-120">
		<a class="hover:active hover:scale-110" href="/questions"><GlobeIcon /></a>
		<a class="hover:active hover:scale-110" href="/explore"><MagnifyingGlassIcon /></a>
		<a class="hover:active hover:scale-110" href="/settings"><GearIcon /></a>
	</div>
{/if}

<style lang="postcss">
	a {
		@apply duration-200;
	}
</style>
