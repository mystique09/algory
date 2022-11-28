<script lang="ts">
	import ProfileHeadingBanner from './profile_heading_banner.svelte';
	import ProfileHeadingInfo from './profile_heading_info.svelte';

	export let userInfo: UserInfoProp;
	export let userData: UserDataProp;
</script>

<div class="heading">
	<ProfileHeadingBanner {userInfo} />
	<ProfileHeadingInfo {userInfo} {userData} />
</div>

<style lang="postcss">
	.heading {
		@apply h-1/2;
		@apply flex flex-col items-start;
		@apply bg-neutral text-neutral-content;
		@apply rounded-md;
	}
</style>
