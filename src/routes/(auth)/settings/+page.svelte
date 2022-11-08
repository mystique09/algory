<script lang="ts">
	import { browser } from '$app/environment';

	import { invalidateAll } from '$app/navigation';

	import EditIcon from '$lib/components/icons/edit_icon.svelte';
	import WarningIcon from '$lib/components/icons/warning_icon.svelte';
	import { toast } from '$lib/stores/toast';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	let isChangepassEnabled: boolean = false;
	let isChangeProfileEnabled: boolean = false;

	let username = data.user?.username;
	let confirmDeleteAccount: string;
	let bio = data.user?.bio;
	let github = data.user?.github;
	let email = data.user?.email;

	function cancelProfileEdit() {
		isChangeProfileEnabled = false;
		email = data.user?.email;
		username = data.user?.username;
		bio = data.user?.bio;
		github = data.user?.github;
	}

	export let form: ActionData;

	if (
		form?.changePasswordFailed ||
		form?.confirmPasswordInvalid ||
		form?.oldPasswordInvalid ||
		form?.invalidUsernameLength ||
		form?.invalidBioLength ||
		form?.updateAccountFailed ||
		form?.requestVerificationFailed
	) {
		toast.error(form?.message!, 2500);
	}

	if (form?.requestVerificationSuccess) {
		toast.success(form?.message!, 3500);
	}

	if (form?.changePasswordSuccess || form?.updateAccountSuccess) {
		toast.success(form?.message!, 3500);
		setTimeout(() => {
			if (browser) {
				invalidateAll();
			}
		}, 1500);
	}

	if (form?.accountDeleted) {
		toast.success(form?.message!, 2500);
		setTimeout(() => {
			if (browser) {
				invalidateAll();
			}
		}, 1500);
	}
</script>

<div class="wrap h-auto p-2">
	{#if !data.user.verified}
		<div class="alert alert-warning text-xs flex flex-row items-center justify-between mb-4">
			<div class="flex flex-row items-center">
				<WarningIcon />
				Your email is not verified!
			</div>
			<form method="POST" action="?/requestVerification">
				<button class="btn btn-neutral text-neutral-content btn-xs px-4 normal-case">Re-send</button
				>
			</form>
		</div>
	{/if}

	<!-- HEADING -->
	<div>
		<div class="action flex flex-row items-center justify-end">
			<div class="text-xs bg-accent text-accent-content rounded-lg px-3 py-1">
				<a href={`/users/${data.user?.id}`}>Go to your profile</a>
			</div>
		</div>
		<h1 class="text-lg font-bold my-2">Update account info</h1>
		<div class="divider" />
		<div class="flex flex-row my-2 items-center justify-end">
			<div class="h-4 w-4">
				<button on:click={() => (isChangeProfileEnabled = true)}>
					<EditIcon color="#1209b9" />
				</button>
			</div>
		</div>
	</div>
	<!-- UPDATE ACCOUNT -->
	<form method="POST" action="?/updateAccount">
		<div class="flex flex-col max-w-md">
			<label for="username" class="text-sm text-neutral font-semibold">Username</label>
			<input
				disabled={!isChangeProfileEnabled}
				class:input-disabled={!isChangeProfileEnabled}
				id="username"
				name="username"
				class="input input-sm input-bordered"
				type="text"
				placeholder="Username"
				bind:value={username}
			/>
		</div>
		<div class="flex flex-row items-center gap-3 justify-start my-4">
			{#if isChangeProfileEnabled}
				<button
					class="btn btn-sm btn-outline btn-error normal-case px-12 py-2"
					type="button"
					on:click={cancelProfileEdit}>Cancel</button
				>
				<button class="btn btn-sm btn-success normal-case px-12 py-2">Save</button>
			{/if}
		</div>
	</form>

	<!-- CHANGE PASSWORD -->
	<div class="changepass my-4">
		<h1 class="text-lg font-semibold">Change password</h1>
		{#if isChangepassEnabled}
			<form method="POST" class="mb-8" action="?/changePassword">
				<div class="flex flex-col max-w-md mt-1">
					<label for="old-password" class="text-sm text-neutral font-semibold">Old password</label>
					<input
						disabled={!isChangepassEnabled}
						class:input-disabled={!isChangepassEnabled}
						id="old-password"
						name="old-password"
						class="input input-sm input-bordered"
						type="password"
						placeholder="Old password"
					/>
				</div>
				<div class="flex flex-col max-w-md mt-2">
					<label for="password" class="text-sm text-neutral font-semibold">New password</label>
					<input
						disabled={!isChangepassEnabled}
						class:input-disabled={!isChangepassEnabled}
						id="password"
						name="password"
						class="input input-sm input-bordered"
						type="password"
						placeholder="New password"
					/>
				</div>
				<div class="flex flex-col max-w-md mt-2">
					<label for="confirm-password" class="text-sm text-neutral font-semibold"
						>Confirm new password</label
					>
					<input
						disabled={!isChangepassEnabled}
						class:input-disabled={!isChangepassEnabled}
						id="confirm-password"
						name="confirm-password"
						class="input input-sm input-bordered"
						type="password"
						placeholder="Re-type password"
					/>
				</div>
				{#if isChangepassEnabled}
					<div class="my-4">
						<button
							class="btn btn-sm btn-outline btn-error normal-case px-12 py-2"
							type="button"
							on:click={() => (isChangepassEnabled = false)}>Cancel</button
						>
						<button class="btn btn-sm btn-success normal-case px-12 py-2">Save</button>
					</div>
				{/if}
			</form>
		{:else}
			<button
				on:click={() => (isChangepassEnabled = true)}
				class="my-2 btn btn-sm bg-gray-700 text-xs text-neutral-content btn-ghost px-8 normal-case"
				>Change password</button
			>
		{/if}
	</div>

	<!-- DELETE ACCOUNT -->
	<div class="mt-2">
		<h1 class="text-xl font-bold text-error">Delete account</h1>
		<div class="divider" />
		<p class="text-sm my-2">Once you delete your account, there is no going back!</p>
		<label
			for="account-deletion-modal"
			class="btn btn-sm btn-ghost bg-gray-700 px-8 normal-case text-error text-normal"
			type="button">Delete account</label
		>
	</div>
</div>

<div>
	<input type="checkbox" id="account-deletion-modal" class="modal-toggle" />
	<div id="account-deletion-modal" class="modal absolute">
		<div class="modal-box h-auto">
			<div
				class="mb-6 alert alert-warning alert-xs text-xs flex flex-row items-center justify-start h-12"
			>
				<WarningIcon />
				Once you delete your account, there is no going back!
			</div>
			<form method="POST" action="?/deleteAccount">
				<h1 class="text-center">Follow instructions below</h1>
				<div class="input-group-vertical">
					<label for="confirm-username" class="text-sm"
						>Type <span
							class="text-neutral text-xs font-bold"
							class:text-success={confirmDeleteAccount === username}>({username})</span
						> below.</label
					>
					<input
						class="w-full input input-bordered input-sm"
						type="text"
						id="confirm-username"
						name="confirm-username"
						bind:value={confirmDeleteAccount}
						placeholder="Type your username"
					/>
				</div>
				<div class="modal-action">
					<label
						for="account-deletion-modal"
						class="btn btn-outline px-8 btn-md btn-success normal-case text-xs">Cancel</label
					>
					<button
						disabled={confirmDeleteAccount != username}
						class="btn px-8 btn-error normal-case text-xs">Delete account</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
