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
		<div class="navbar w-full bg-base-100 text-base-100-content shadow-sm">
			<div class="navbar-start">
				<a href="/" class="btn btn-ghost">
					<AlgoryIcon className="fill-primary" />
				</a>
			</div>
			<div class="navbar-center">
				<ul class="menu menu-horizontal hidden md:menu md:menu-horizontal">
					<li><a href="/questions"><HouseIcon />Questions</a></li>
					<li><a href="/users"><UsersIcon />Users</a></li>
					<li>
						<a href="/explore"><MagnifyingGlassIcon />Explore</a>
					</li>
				</ul>
			</div>
			<div class="navbar-end px-3">
				<ul class="menu menu-horizontal hidden md:menu md:menu-horizontal">
					{#if $page.data.authenticated}
						<div class="divider divider-horizontal" />
						<div class="dropdown dropdown-bottom dropdown-end">
							<button class="btn btn-ghost h-12 w-12 rounded-full ring ring-primary" tabindex="0">
								<AlgoryIcon className="fill-primary" />
							</button>
							<button
								tabindex="0"
								class="dropdown-content menu menu-center p-2 shadow-lg rounded-box w-auto bg-base-100 text-neutral"
							>
								<ul>
									<li>
										<a href={`/users/${$page.data.user.id}`}><UserIcon />Profile</a>
									</li>
									<li>
										<a href="/settings"><GearIcon />Settings</a>
									</li>
								</ul>
								<div class="divider" />
								<button on:click={signOut} class="btn btn-ghost gap-2 normal-case"
									><SignoutIcon /> Signout</button
								>
							</button>
						</div>
					{:else}
						<li>
							<a href="/sign-in" class="btn btn-outline normal-case btn-primary text-xs">Sign in</a>
						</li>
						<li>
							<a
								href="/sign-up"
								class="btn btn-primary text-primary-content normal-case rounded-box ml-2 text-xs"
								>Sign up</a
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
		<slot />
	</div>
	<div class="drawer-side">
		<label for="algory-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			<div class="flex items-center justify-center mb-2">
				<AlgoryIcon className="fill-primary" />
			</div>
			<li><a href="/questions"><HouseIcon />Questions</a></li>
			<li><a href="/users"><UsersIcon />Users</a></li>
			<li class="mb-2"><a href="/explore"><MagnifyingGlassIcon />Explore</a></li>
			{#if $page.data.authenticated}
				<li>
					<a href="/settings"><GearIcon />Settings</a>
				</li>
				<li><a href={`/users/${$page.data.user.id}`}><UserIcon />Profile</a></li>
				<div class="divider" />
				<button on:click={signOut} class="btn btn-ghost gap-2 normal-case"
					><SignoutIcon /> Signout</button
				>
			{:else}
				<li>
					<a href="/sign-in" class="btn btn-outline mb-2 btn-primary text-primary-content text-md"
						>Sign in</a
					>
				</li>
				<li>
					<a href="/sign-up" class="btn btn-primary text-primary-content text-md">Sign up</a>
				</li>
			{/if}
		</ul>
	</div>
</div>
