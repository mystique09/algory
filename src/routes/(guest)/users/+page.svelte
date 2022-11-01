<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container h-auto overflow-scroll p-4">
	<div class="wrap h-full mb-28 max-w-lg m-auto">
		<h1 class="text-xl font-bold text-center">All available users</h1>
		{#if !!data.profiles}
			<div class="users flex flex-col gap-2 mt-8">
				{#each data.profiles as profile}
					<div class="user">
						<a href={`/users/${profile.id}`} class="text-xs underline text-accent">{profile.id}</a>
						<h3 class="text-md">{profile.name}</h3>
					</div>
				{/each}
			</div>
		{:else}
			<h1>No users yet. Be the first one!</h1>
		{/if}
	</div>
</div>
