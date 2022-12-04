<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;

	import { toast } from '$lib/stores/toast';

	if (
		form?.credentialsInvalid ||
		form?.emailInvalid ||
		form?.usernameInvalid ||
		form?.passwordInvalid ||
		form?.message ||
		form?.confirmPasswordInvalid ||
		form?.signupFailed
	) {
		toast.error(form?.message, 5000);
	}
</script>

<form method="POST" action="?/signup">
	<div class="form-logo">
		<img src="/images/algory.svg" alt="Algory logo" />
	</div>
	<div class:text-red-700={form?.credentialsInvalid || form?.usernameInvalid} class="input-group">
		<label for="username">Username</label>
		<input
			class="input input-normal input-bordered"
			id="username"
			name="username"
			type="text"
			placeholder="Username"
			required
		/>
	</div>
	<div class="input-group">
		<label class:text-red-700={form?.credentialsInvalid || form?.emailInvalid} for="email"
			>Email</label
		>
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
		<label for="password" class:text-red-700={form?.passwordInvalid || form?.credentialsInvalid}
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
	<div class="input-group">
		<label
			for="confirm-password"
			class:text-red-700={form?.confirmPasswordInvalid || form?.credentialsInvalid}
			>Confirm password</label
		>
		<input
			class="input input-normal input-bordered"
			id="confirm-password"
			name="confirm-password"
			type="password"
			placeholder="Confirm Password"
			required
		/>
	</div>
	<div class="flex items-center justify-center w-full mt-6">
		<button class="btn btn-md bg-accent border-none btn-wide text-accent-content" type="submit"
			>Sign up</button
		>
	</div>
	<p class="text-center text-sm mt-4">
		Already registered? <a class="text-accent-cotent" href="/sign-in">Login</a>
	</p>
</form>

<style lang="postcss">
	form {
		@apply max-w-xl px-12 py-6 m-auto w-full bg-white;
		@apply h-screen md:h-auto;
		@apply shadow-md;
	}

	form > .form-logo {
		@apply w-full flex items-center justify-center;
		@apply mb-12;
	}

	form > .input-group {
		@apply flex flex-col;
		@apply mb-2;
	}

	form > .input-group label {
		@apply text-xs;
	}
</style>
