<script lang="ts">
	import { toast, ToastType } from '$lib/stores/toast';
	setTimeout(() => {
		$toast = { type: ToastType.NOTHING, message: null };
	}, 2000);
</script>

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
		<div><span>{$toast.message}</span></div>
	</div>
</div>

<style lang="postcss">
	.toast {
		@apply absolute z-30;
	}
</style>
