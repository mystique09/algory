<script lang="ts">
	import EditIcon from '../icons/edit_icon.svelte';

	export let userId: string;
	export let id: string;
	export let authenticated: boolean;
</script>

<div class="user w-full h-48 bg-black/80 p-4 flex flex-row items-end justify-between relative">
	<div>
		<div>
			<img
				class="w-full h-full absolute top-0 left-0"
				src="/images/default_profile_banner.jpg"
				alt="Default profile banner, technology."
			/>
		</div>
		<div class="avatar online">
			<div
				class="w-20 h-20 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 bg-neutral-content"
			>
				<img class="w-full h-full" src="/images/algory.svg" alt="user avatar" />
			</div>
		</div>
	</div>
	{#if authenticated}
		{#if userId === id}
			<button
				type="button"
				class="btn btn-ghost btn-square w-6 h-6 text-base-100 z-10 absolute top-0 right-2"
				><EditIcon /></button
			>
		{/if}
	{/if}
</div>
