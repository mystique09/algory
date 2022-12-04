<script lang="ts">
	import { toast } from '$lib/stores/toast';

	import type { ActionData } from './$types';
	export let form: ActionData;

	if (form?.missingEmail || form?.requestFailed) {
		toast.error(form?.message!, 3500);
	}

	if (form?.requestSent) {
		toast.success(form?.message);
	}
</script>

<form class="max-w-xl px-4 py-6 m-auto w-full h-full" method="POST" action="?/forgotPassword">
	<div class="shadow-lg p-6 bg-white">
		<div class="form-logo flex flex-col items-center justify-center mb-12">
			<img src="/images/algory.svg" alt="Algory logo" />
			<h1 class="text-lg mt-2">Reset your password</h1>
		</div>
		<div class="input-group input-group-vertical my-6">
			<p class="my-2">
				Enter your verified email address and we will send you a password reset link.
			</p>
			<input
				type="email"
				id="email"
				name="email"
				class="input input-sm w-full input-primary"
				placeholder="Email address"
				required
			/>
		</div>
		<button class="w-full btn btn-sm btn-success font-light normal-case btn-wide"
			>Send password reset email</button
		>
	</div>
</form>
