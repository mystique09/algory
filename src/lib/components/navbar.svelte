<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	import { page } from '$app/stores';
	let isVisible = false;

	const showNav = () => (isVisible = !isVisible);

	const signOut = async () => {
		await fetch('/logout', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			}
		});
		await invalidateAll();
		showNav();
	};
</script>

<div class="main">
	<div class="navbar flex item-start justify-between p-2 bg-gray-100/20">
		{#if !!$page.data.session.user}
			<button type="button" class="logo avatar btn btn-ghost" on:click={showNav}>
				<div class="logo w-10 h-10 rounded-full ring ring-accent">
					<img src="/images/algory.svg" alt="Algory logo" />
				</div>
			</button>
		{:else}
			<div>
				<div
					on:click={showNav}
					on:keydown={showNav}
					class="burger-menu w-12 flex flex-col p-1 gap-2 mr-1"
				>
					<span class="w-full h-1 bg-black" />
					<span class="w-full h-1 w-1/2 bg-black" />
					<span class="w-full h-1 w-1/4 bg-black" />
				</div>
			</div>
			<div class="w-12 h-12">
				<a href="/">
					<img src="/images/algory.svg" alt="Algory logo" />
				</a>
			</div>
		{/if}

		{#if !$page.data.session.user}
			<ul class="flex items-center justify-end gap-4">
				<li class="rounded-md py-1 px-6 bg-primary/10 border-none ring ring-primary">
					<a class="text-xs" href="/sign-in">Sign in</a>
				</li>
				<li class="rounded-md py-1 px-6 bg-primary text-white px-8">
					<a class="text-xs" href="/sign-up">Sign up</a>
				</li>
			</ul>
		{/if}
	</div>
	<div class="container" class:hidden={!isVisible}>
		<div class="wrap">
			<div class="heading">
				<h1 class="text-2xl">{$page.data.session.user ? 'Account info' : 'Main menu'}</h1>
				<button on:click={showNav} class="text-4xl">&times;</button>
			</div>

			{#if !!$page.data.session.user}
				<div class="account">
					<div class="avatar my-2">
						<div
							class="w-12 h-12 rounded-full avatar ring ring-primary ring-offset-base-100 ring-offset-2"
						>
							<img src="/images/algory.svg" alt="Algory logo" />
						</div>
					</div>
					<h2 class="text-base font-normal">{$page.data.session?.user?.email}</h2>
				</div>
			{/if}
			<div class="menu-container mt-8">
				<ul class="menu-links">
					<li on:click={showNav} on:keydown={showNav}>
						<a href="/questions">Questions</a>
					</li>
					<li on:click={showNav} on:keydown={showNav}>
						<a href="/explore">Explore</a>
					</li>
					<li on:click={showNav} on:keydown={showNav}>
						<a href="/users">Users</a>
					</li>

					{#if !!$page.data.session.user}
						<li on:click={showNav} on:keydown={showNav}>
							<a href="/profile">Profile</a>
						</li>
						<li on:click={showNav} on:keydown={showNav}>
							<a href="/settings">Settings</a>
						</li>
					{/if}
				</ul>

				{#if !!$page.data.session.user}
					<div class="divider" />
					<button type="button" on:click={signOut} href="/logout">Logout</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply bg-gray-100/50 shadow-md;
		@apply px-4;
	}

	.container {
		@apply absolute top-0 left-0 z-10;
		@apply w-screen h-screen;
		@apply bg-black/10;
	}

	.wrap {
		@apply p-4 w-3/4 h-full;
		@apply bg-white;
	}

	.wrap .heading {
		@apply flex items-center justify-between;
		@apply w-full mb-6;
	}

	.menu-links {
		@apply flex flex-col gap-4;
	}

	.menu-links > li {
		@apply font-bold text-xl;
	}
</style>
