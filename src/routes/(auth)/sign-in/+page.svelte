<div class="main">
	<div class="wrap">
		<form>
			<div class="form-logo">
				<img src="/images/algory.svg" alt="Algory logo" />
			</div>
			<div class="input-group">
				<label for="username" />
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
				<label for="password" />
				<input
					class="input input-normal input-bordered"
					id="password"
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
			</div>
			<a href="/forot-password" class="text-base text-accent">Forgot password?</a>
			<div class="flex items-center justify-center w-full mt-6">
				<button
					class="btn btn-lg bg-primary border-none btn-wide btn-block text-white"
					type="submit">Sign in</button
				>
			</div>
			<p class="text-center text-sm mt-4">
				New to Algory? <a class="text-accent" href="/sign-up">Create an account</a>
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
		@apply mb-4;
	}
</style>
