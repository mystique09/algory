<script lang="ts">
	import { ToastType } from '$lib/stores/toast';
	import ErrorIcon from './icons/error_icon.svelte';
	import InfoIcon from './icons/info_icon.svelte';
	import SuccessIcon from './icons/success_icon.svelte';
	import { onDestroy } from 'svelte';
	import { toast } from '$lib/stores/toast';
	import WarningIcon from './icons/warning_icon.svelte';

	export let type: ToastType;
	export let message: string | undefined | null;

	let unsub = toast.subscribe(() => {});

	onDestroy(() => {
		unsub();
	});
</script>

<div
	class={`alert ${
		type === ToastType.ERROR
			? 'alert-error'
			: type === ToastType.WARNING
			? 'warning'
			: type === ToastType.SUCCESS
			? 'alert-success'
			: 'alert-info'
	}`}
>
	<div>
		{#if type === ToastType.ERROR}
			<ErrorIcon />
		{:else if type === ToastType.WARNING}
			<WarningIcon />
		{:else if type === ToastType.SUCCESS}
			<SuccessIcon />
		{:else if type === ToastType.INFO}
			<InfoIcon />
		{/if}
		<span class="text-xs">{message}</span>
	</div>
</div>
