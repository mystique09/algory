<script lang="ts">
	import WarningIcon from '$lib/components/icons/warning_icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let isChangepass: boolean = false;
	let isChangeProfile: boolean = false;
</script>

<div class="wrap h-auto p-2">
	{#if !data.user.verified}
		<div class="alert alert-warning text-xs flex flex-row items-center justify-between mb-4">
			<div class="flex flex-row items-center">
				<WarningIcon />
				Your email is not verified!
			</div>
			<button class="btn btn-neutral text-neutral-content btn-xs px-4 normal-case" type="button"
				>Re-send</button
			>
		</div>
	{/if}
	<div>
		<div class="action flex flex-row items-center justify-end">
			<div class="text-xs bg-accent text-accent-content rounded-lg px-3 py-1">
				<a href={`/users/${data.user?.id}`}>Go to your profile</a>
			</div>
		</div>
		<h1 class="text-lg font-bold my-2">Update account info</h1>
		<div class="divider" />
	</div>
	<form action="?/updateAccount">
		<div class="flex flex-col max-w-md">
			<label for="username" class="text-sm text-neutral font-semibold">Username</label>
			<input
				id="username"
				name="username"
				class="input input-sm input-bordered"
				type="text"
				placeholder="Username"
				value={data.user.username}
			/>
		</div>
		<div class="flex flex-col max-w-md mt-4">
			<label for="bio" class="text-sm text-neutral font-semibold">Bio</label>
			<textarea
				id="bio"
				name="bio"
				class="resize-none textarea textarea-lg textarea-bordered w-full max-w-md"
				placeholder="Tell us about yourself resize-none"
				value={data.user.bio}
			/>
		</div>
		<div class="flex flex-col max-w-md mt-4">
			<label for="github" class="text-sm text-neutral font-semibold">Github</label>
			<input
				id="github"
				name="github"
				class="input input-sm input-bordered"
				type="text"
				placeholder="Github"
				value={data.user.github}
			/>
		</div>
		<div class="flex flex-row items-center justify-end my-2">
			<button class="btn btn-sm btn-success normal-case px-12 py-2">Save<button /></button>
		</div>
	</form>
	<div class="changepass my-4">
		<h1 class="text-lg font-semibold">Change password</h1>
		{#if isChangepass}
			<form action="?/changePassword" />
		{:else}
			<button
				class="my-2 btn btn-sm bg-gray-700 text-xs text-neutral-content btn-ghost px-8 normal-case"
				>Change password</button
			>
		{/if}
	</div>
	<div class="mt-2">
		<h1 class="text-xl font-bold text-error">Delete account</h1>
		<div class="divider" />
		<p class="text-sm my-2">Once you delete your account, there is no going back!</p>
		<button
			class="btn btn-sm btn-ghost bg-gray-700 px-8 normal-case text-error text-normal"
			type="button">Delete account</button
		>
	</div>
</div>
