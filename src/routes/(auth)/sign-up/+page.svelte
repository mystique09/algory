<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;

	import { toast, ToastType } from '$lib/stores/toast';
	$toast = { type: form?.success ? ToastType.SUCCESS : ToastType.ERROR, message: form?.message };
</script>

<div class="main">
	<div class="wrap">
		<form method="POST" action="?/signup">
			<a href="/" class="text-lg text-accent">Back</a>
			<div class="form-logo">
				<img src="/images/algory.svg" alt="Algory logo" />
			</div>
			<div class="input-group">
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
				<label for="password" class:text-red-700={form?.password || form?.credentials}
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
					class="btn btn-lg bg-primary border-none btn-block btn-wide text-white"
					type="submit">Sign up</button
				>
			</div>
			<p class="text-center text-sm mt-4">
				Already registered? <a class="text-accent" href="/sign-in">Login</a>
			</p>
		</form>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply h-screen w-screen;
		@apply flex flex-col items-center justify-center;
		@apply bg-base-100;
	}

	.wrap {
		@apply max-w-md;
		@apply bg-white;
		@apply h-auto;
		@apply rounded-md;
	}

	form {
		@apply px-12 py-12 m-auto;
		@apply h-full;
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
