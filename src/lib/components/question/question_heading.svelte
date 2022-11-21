<script lang="ts">
	export let title: string;
	export let author: string;
	export let views: number;
</script>

<div class="container mt-4">
	<h2 class="text-2xl">{title}</h2>
	<div class="info">
		<p class="text-2xs">
			<span>Author </span><a class="text-primary" href={`/users/${author}`}
				>{author}</a
			>
		</p>
		<p class="text-xs">
			<span class="text-gray-500">Viewed </span>{views} times
		</p>
	</div>
</div>

<style lang="postcss">
	.info {
		@apply mt-4;
		@apply flex items-center justify-start gap-2;
	}
</style>
