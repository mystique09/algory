<script lang="ts">
	let isFollowing: boolean = false;
	let followers = 200;
	let following = 0;

	function followUser() {
		isFollowing = !isFollowing;
		isFollowing ? followers++ : followers--;
	}
</script>

<svelte:head>
	<title>Mystique09's profile</title>
	<meta
		type="description"
		content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora commodi inventore ipsum
						perferendis error architecto fuga quasi hic."
	/>
</svelte:head>

<div class="container">
	<div class="wrap">
		<div class="heading">
			<div class="avatar offline">
				<div class="w-20 rounded-full">
					<img src="/images/algory.svg" alt="user avatar" />
				</div>
			</div>
			<div class="info mt-2">
				<div class="top flex items-center justify-between">
					<div class="profile">
						<h1 class="text-xl text-bold">Mystique09</h1>
						<p class="text-xs">{followers} Followers</p>
						<p class="text-xs">{following} Following</p>
					</div>
					<div class="profile-actions">
						<button type="button" on:click={followUser} class="btn btn-ghost w-14 h-14">
							<img
								src={`${isFollowing ? '/svgs/user-minus-solid.svg' : '/svgs/user-plus-solid.svg'}`}
								alt="follow icon"
							/>
							<span class="text-xs">{isFollowing ? 'Unfollow' : 'Follow'}</span>
						</button>
					</div>
				</div>
				<div class="bottom mt-2">
					<p class="text-xs font-light">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora commodi inventore ipsum
						perferendis error architecto fuga quasi hic.
					</p>
				</div>
				<div class="divider" />
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply h-full w-full;
	}

	.wrap {
		@apply px-4 max-w-xl m-auto;
	}

	.heading {
		@apply h-1/2;
		@apply flex flex-col items-start;
	}
</style>
