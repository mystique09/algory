<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { toast } from '$lib/stores/toast';

	import type { ActionData } from './$types';
	export let form: ActionData;

	if (browser) {
		invalidateAll();
	}

	if (form?.signinSuccess) {
		toast.success(form?.message);
	}

	if (form?.signinFailed || form?.fieldsInvalid) {
		toast.error(form?.message, 5000);
	}
</script>

<form method="POST" action="?/login">
	<div class="form-logo">
		<img src="/images/algory.svg" alt="Algory logo" />
	</div>
	<div class="input-group">
		<label for="username-or-email" class:text-red-700={form?.fieldsInvalid}>Email</label>
		<input
			class="input input-normal input-bordered"
			id="username-or-email"
			name="username-or-email"
			type="text"
			placeholder="Username or email"
			required
		/>
	</div>
	<div class="input-group">
		<label for="password" class:text-red-700={form?.signinFailed || form?.fieldsInvalid}
			>Password</label
		>
		<input
			class="input input-normal input-bordered"
			id="password"
			name="password"
			type="password"
			placeholder="Password"
			required
		/>
	</div>
	<a href="/forgot-password" class="text-xs text-secondary">Forgot password?</a>
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
