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
	};
</script>

<div class="main" class:hidden={!$page.data.session.user}>
	<div class="navbar p-2 bg-gray-100/20">
		<button class="logo avatar btn btn-ghost" on:click={showNav}>
			<div class="logo w-10 h-10 rounded-full ring ring-accent">
				<img src="/images/algory.svg" alt="Algory logo" />
			</div>
		</button>
	</div>
	<div class="container" class:hidden={!isVisible}>
		<div class="wrap">
			<div class="heading">
				<h1 class="text-2xl">Account info</h1>
				<button on:click={showNav} class="text-4xl">&times;</button>
			</div>
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
			<div class="menu-container mt-8">
				<ul class="menu-links">
					<li on:click={showNav} on:keydown={showNav}>
						<a href="/profile">Profile</a>
					</li>
					<li on:click={showNav} on:keydown={showNav}>
						<a href="/settings">Settings</a>
					</li>
				</ul>
				<div class="divider" />
				<button type="button" on:click={signOut} href="/logout">Logout</button>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
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
