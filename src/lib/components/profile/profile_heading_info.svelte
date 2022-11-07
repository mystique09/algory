<script lang="ts">
	import { isEditingMode } from '$lib/stores/profile';
	import { page } from '$app/stores';
	import { toast } from '$lib/stores/toast';
	import UserMinusSolid from '../icons/user-minus-solid.svelte';
	import UserPlusSolid from '../icons/user-plus-solid.svelte';

	export let name: string;
	export let bio: string;
	export let followers: number;
	export let following: number;
	export let isFollowing: boolean;
	export let authenticated: boolean;
	export let userId: string;
	export let id: string;
	export let social: string;
	export let followId: string;

	$: totalFollowers = followers;
	$: isFollowing = isFollowing;
	$: fId = followId;

	async function handleFollow() {
		if (isFollowing) {
			try {
				const res = await fetch(`${$page.url.pathname}/?id=${fId}`, {
					method: 'DELETE',
					headers: {
						'content-type': 'application/json'
					},
					body: ''
				});
				const resp = await res.json();

				totalFollowers--;
				isFollowing = false;
				toast.success(resp.message);
			} catch (e: any) {
				toast.error('Error occured while unfollowing user.');
			}
		} else {
			try {
				const res = await fetch(`${$page.url.pathname}`, {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: ''
				});
				const resp = await res.json();

				totalFollowers++;
				isFollowing = true;
				fId = resp.newFollower.id;
				toast.success(resp.message);
			} catch (e: any) {
				toast.error('Error occured while unfollowing user.');
			}
		}
	}

	let bioValue: string = bio;
</script>

<div class="info w-full mt-2 px-4">
	<div class="top flex flex-col-reverse">
		<div class="profile">
			{#if $isEditingMode}
				<form class="my-2" method="POST" action="?/changeProfile">
					<div class="input-group-vertical">
						<label class="label text-xs" for="name">Name</label>
						<input
							id="name"
							name="name"
							class="w-full input input-xs input-ghost text-lg py-2 my-2"
							type="text"
							placeholder="New name"
							value={name}
						/>
					</div>
					<div class="input-group-vertical">
						<label class="label text-xs" for="github">Github username</label>
						<input
							id="github"
							name="github"
							type="text"
							class="w-full input input-xs input-ghost py-2 my-2"
							value={social}
							placeholder="Github username"
						/>
					</div>
					<div class="input-group-vertical my-2">
						<label class="label text-xs" for="bio">Bio ({bioValue.length} out of 255)</label>
						<textarea
							id="bio"
							name="bio"
							class="w-full text-xs p-2 resize-none textarea textarea-ghost"
							class:input-error={bioValue.length >= 255}
							bind:value={bioValue}
							placeholder="Your bio..."
						/>
					</div>
					<div class="w-full flex flex-row items-center justify-end gap-2">
						<button
							type="button"
							on:click={() => ($isEditingMode = !$isEditingMode)}
							class="btn btn-sm btn-outline btn-error">Cancel</button
						>
						<button class="btn btn-accent btn-sm px-6">Save</button>
					</div>
				</form>
			{:else}
				<h1 class="text-2xl text-bold">{name}</h1>
				{#if social}
					<a
						class="text-xs link link-secondary"
						href={`https://github.com/${social}`}
						target="_blank"
						rel="noreferrer">Github</a
					>
				{/if}
			{/if}
			<p class="text-xs">{totalFollowers} Followers</p>
			<p class="text-xs">{following} Following</p>
		</div>
		{#if authenticated}
			{#if userId !== id}
				<div class="profile-actions flex flex-row items-center justify-end">
					<!-- <form action={`${isFollowing ? '?/unfollowUser' : '?/followUser'}`} method="POST">
						<input name="followId" id="followId" type="text" hidden value={followId} /> -->
					<button
						type="button"
						on:click={handleFollow}
						class="btn btn-ghost h-12 flex items-center"
					>
						<div class="w-5 h-5">
							{#if isFollowing}
								<UserMinusSolid className="fill-accent-content" />
							{:else}
								<UserPlusSolid className="fill-accent-content" />
							{/if}
						</div>
					</button>
					<!-- </form -->
				</div>
			{/if}
		{/if}
	</div>
	<div class="bottom mt-2">
		<p class="text-xs font-light">
			{bio || ''}
		</p>
	</div>
	<div class="divider" />
</div>
