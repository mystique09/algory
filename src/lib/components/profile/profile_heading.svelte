<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/(guest)/users/[id=uuid]/$types';
	import ProfileHeadingBanner from './profile_heading_banner.svelte';
	import ProfileHeadingInfo from './profile_heading_info.svelte';
	export let data: PageData;
	export let followers: number;
	export let following: number;
	export let isFollowing: boolean;
</script>

<div class="heading">
	<ProfileHeadingBanner
		authenticated={data.authenticated}
		userId={data.user?.id}
		id={data.info.id}
	/>
	<ProfileHeadingInfo
		{followers}
		{following}
		{isFollowing}
		authenticated={data.authenticated}
		name={data.info.name}
		bio={data.info.bio}
		userId={data.user?.id}
		id={data.info.id}
	/>
</div>

<style lang="postcss">
	.heading {
		@apply h-1/2;
		@apply flex flex-col items-start;
	}
</style>
