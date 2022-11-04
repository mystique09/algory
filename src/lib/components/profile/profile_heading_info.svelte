<script lang="ts">
	export let name: string;
	export let bio: string;
	export let followers: number;
	export let following: number;
	export let isFollowing: boolean;
	export let authenticated: boolean;
	export let userId: string;
	export let id: string;

	function followUser() {
		isFollowing = !isFollowing;
		isFollowing ? followers++ : followers--;
	}
</script>

<div class="info w-full mt-2">
	<div class="top flex items-center justify-between">
		<div class="profile">
			<h1 class="text-2xl text-bold">{name}</h1>
			<p class="text-xs">{followers} Followers</p>
			<p class="text-xs">{following} Following</p>
		</div>
		{#if authenticated}
			{#if userId !== id}
				<div class="profile-actions">
					<button type="button" on:click={followUser} class="btn btn-ghost h-12 flex items-center">
						<div class="w-5 h-5">
							<img
								src={`${isFollowing ? '/svgs/user-minus-solid.svg' : '/svgs/user-plus-solid.svg'}`}
								alt="follow icon"
								class="w-full h-full"
							/>
						</div>
					</button>
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
