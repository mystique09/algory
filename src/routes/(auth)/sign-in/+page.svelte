<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { toast, ToastType } from '$lib/stores/toast';

	import type { ActionData } from './$types';
	export let form: ActionData;

	if (browser) {
		invalidateAll();
	}

	$toast = { type: form?.success ? ToastType.SUCCESS : ToastType.ERROR, message: form?.message };
</script>

<form method="POST" action="?/login">
	<div class="form-logo">
		<img src="/images/algory.svg" alt="Algory logo" />
	</div>
	<div class="input-group">
		<label for="email" class:text-red-700={form?.credentials}>Email</label>
		<input
			class="input input-normal input-bordered"
			id="email"
			name="email"
			type="email"
			placeholder="Email"
			required
		/>
	</div>
	<div class="input-group">
		<label for="password" class:text-red-700={form?.failed || form?.credentials}>Password</label>
		<input
			class="input input-normal input-bordered"
			id="password"
			name="password"
			type="password"
			placeholder="Password"
			required
		/>
	</div>
	<a href="/forot-password" class="text-xs text-secondary">Forgot password?</a>
	<div class="flex items-center justify-center w-full mt-6">
		<button class="btn btn-md bg-accent border-none btn-wide btn-block text-white" type="submit"
			>Sign in</button
		>
	</div>
	<p class="text-center text-sm mt-4">
		New to Algory? <a class="text-secondary" href="/sign-up">Create an account</a>
	</p>
</form>

<style lang="postcss">
	form {
		@apply px-12 py-6 m-auto w-full bg-white;
		@apply h-full;
		@apply shadow-md;
	}

	form > .form-logo {
		@apply flex items-center justify-center;
		@apply mb-12;
	}

	form > .input-group {
		@apply flex flex-col;
		@apply mb-4;
	}

	form > .input-group label {
		@apply text-sm;
	}
</style>
