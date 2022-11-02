<script lang="ts">
	import { toast, ToastType } from '$lib/stores/toast';
	import ErrorIcon from './error_icon.svelte';
	import InfoIcon from './info_icon.svelte';
	import SuccessIcon from './success_icon.svelte';
	import WarningIcon from './warning_icon.svelte';

	setTimeout(() => {
		$toast = { type: ToastType.NOTHING, message: null };
	}, 2000);
</script>

{#if $toast.message}
	<div class="toast toast-top toast-end" class:hidden={!$toast.message}>
		<div
			class={`alert ${
				$toast.type === 1
					? 'alert-error'
					: $toast.type === 2
					? 'alert-success'
					: $toast.type === 3
					? 'alert-info'
					: ''
			}`}
		>
			<div>
				{#if $toast.type === 1}
					<ErrorIcon />
				{:else if $toast.type === 2}
					<SuccessIcon />
				{:else if $toast.type === 3}
					<InfoIcon />
				{:else if $toast.type === 4}
					<WarningIcon />
				{/if}
				<span class="text-xs">{$toast.message}</span>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.toast {
		@apply absolute z-30;
	}
</style>
