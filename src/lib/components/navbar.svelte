<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import AlgoryIcon from './icons/algory_icon.svelte';
	import GearIcon from './icons/gear_icon.svelte';
	import HouseIcon from './icons/house_icon.svelte';
	import MenuIcon from './icons/menu_icon.svelte';
	import MagnifyingGlassIcon from './icons/magnifying-glass-icon.svelte';
	import SignoutIcon from './icons/signout_icon.svelte';
	import UsersIcon from './icons/users_icon.svelte';
	import UserIcon from './icons/user_icon.svelte';

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

<div class="drawer">
	<input type="checkbox" id="algory-drawer" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<div class="navbar w-full bg-neutral text-neutral-content">
			<div class="navbar-start">
				<div class="btn btn-ghost">
					<AlgoryIcon />
				</div>
			</div>
			<div class="navbar-center">
				<ul class="menu menu-horizontal hidden md:menu md:menu-horizontal">
					<li><a href="/questions"><HouseIcon color="#EDEDED" />Questions</a></li>
					<li><a href="/users"><UsersIcon color="#EDEDED" />Users</a></li>
					<li>
						<a href="/explore"><MagnifyingGlassIcon className="fill-neutral-content" />Explore</a>
					</li>
				</ul>
			</div>
			<div class="navbar-end px-3">
				<ul class="menu menu-horizontal hidden md:menu md:menu-horizontal">
					{#if $page.data.authenticated}
						<div class="divider divider-horizontal" />
						<div class="dropdown dropdown-bottom dropdown-end">
							<button class="btn btn-ghost h-12 w-12 rounded-full ring ring-accent" tabindex="0">
								<AlgoryIcon />
							</button>
							<button
								tabindex="0"
								class="dropdown-content menu menu-center p-2 shadow-lg rounded-box w-52 bg-base-100 text-neutral"
							>
								<ul>
									<li><a href={`/users/${$page.data.user.id}`}><UserIcon />Profile</a></li>
									<li>
										<a href="/settings"><GearIcon color="#2E2730" />Settings</a>
									</li>
								</ul>
								<div class="divider" />
								<button on:click={signOut} class="btn btn-ghost gap-2"
									><SignoutIcon /> Signout</button
								>
							</button>
						</div>
					{:else}
						<li>
							<a href="/sign-in" class="btn btn-outline btn-primary text-xs">Sign in</a>
						</li>
						<li>
							<a
								href="/sign-up"
								class="btn btn-secondary text-content-secondary rounded-box ml-2 text-xs">Sign up</a
							>
						</li>
					{/if}
				</ul>
				<div class="flex-none md:hidden">
					<label for="algory-drawer" class="btn btn-square btn-ghost">
						<MenuIcon />
					</label>
				</div>
			</div>
		</div>
		<div id="top" class="md:m-auto pt-8 pb-20 w-full max-w-2xl">
			<slot />
		</div>
	</div>
	<div class="drawer-side">
		<label for="algory-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<div class="flex items-center justify-center mb-2">
				<AlgoryIcon color="#2E2730" />
			</div>
			<li><a href="/questions"><HouseIcon />Questions</a></li>
			<li><a href="/users"><UsersIcon />Users</a></li>
			<li class="mb-2"><a href="/explore"><MagnifyingGlassIcon />Explore</a></li>
			{#if $page.data.authenticated}
				<li>
					<a href="/settings"><GearIcon color="#2E2730" />Settings</a>
				</li>
				<li><a href={`/users/${$page.data.user.id}`}><UserIcon />Profile</a></li>
				<div class="divider" />
				<button on:click={signOut} class="btn btn-ghost gap-2"><SignoutIcon /> Signout</button>
			{:else}
				<li>
					<a href="/sign-in" class="btn btn-outline mb-2 btn-accent text-accent-content text-xs"
						>Sign in</a
					>
				</li>
				<li>
					<a href="/sign-up" class="btn btn-secondary text-secondary-content text-xs">Sign up</a>
				</li>
			{/if}
		</ul>
	</div>
</div>
