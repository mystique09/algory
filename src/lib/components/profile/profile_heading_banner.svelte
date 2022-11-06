<script lang="ts">
	import EditIcon from '../icons/edit_icon.svelte';
	import { isEditingMode } from '$lib/stores/profile';
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
				on:click={() => ($isEditingMode = !$isEditingMode)}
				type="button"
				class="btn btn-ghost btn-square w-5 text-base-100 z-10 absolute top-0 right-2"
			>
				{#if !$isEditingMode}
					<EditIcon />
				{:else}
					<svg
						class="swap-on fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 512 512"
						><polygon
							points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
						/></svg
					>
				{/if}
			</button>
		{/if}
	{/if}
</div>
