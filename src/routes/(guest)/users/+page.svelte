<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="relative max-w-4xl m-auto w-full h-screen mb-24 p-2">
	<h1 class="text-xl font-bold text-center">All available users</h1>
	{#if !!data.profiles}
		<div class="users flex flex-col gap-2 mt-8">
			{#each data.profiles as profile}
				<div class="user my-1 flex items-center justify-start gap-2">
					<div class="avatar">
						<div class="w-12 rounded-full">
							<img src="/images/algory.svg" alt="User avatar" />
						</div>
					</div>
					<div class="info">
						<a class="text-lg text-primary" href={`/users/${profile.id}`}>{profile.name}</a>
						<p class="text-xs font-normal">{profile.bio ?? ''}</p>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<h1>No users yet. Be the first one!</h1>
	{/if}
</div>
