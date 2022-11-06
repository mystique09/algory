<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;

	import { toast } from '$lib/stores/toast';

	if (form?.credentials || form?.username || form?.password || form?.email || form?.confirm) {
		toast.error(form?.message, 5000);
	}
	if (form?.success) {
		toast.success(form?.message);
	}
</script>

<form method="POST" action="?/signup">
	<div class="form-logo">
		<img src="/images/algory.svg" alt="Algory logo" />
	</div>
	<div class:text-red-700={form?.credentials || form?.email} class="input-group">
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
		<label class:text-red-700={form?.credentials || form?.email} for="email">Email</label>
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
		<label for="password" class:text-red-700={form?.password || form?.credentials}>Password</label>
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
		<label for="confirm-password" class:text-red-700={form?.confirm || form?.credentials}
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
		<button
			class="btn btn-md bg-accent border-none btn-block btn-wide text-accent-content"
			type="submit">Sign up</button
		>
	</div>
	<p class="text-center text-sm mt-4">
		Already registered? <a class="text-secondary" href="/sign-in">Login</a>
	</p>
</form>

<style lang="postcss">
	form {
		@apply px-12 py-6;
		@apply bg-white;
		@apply shadow-md;
	}

	form > .form-logo {
		@apply w-full flex items-center justify-center;
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
