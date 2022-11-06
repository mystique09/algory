<script lang="ts">
	export let id: string;
	export let author: string;
	export let title: string;
	export let content: string;
	export let tags: string;
	export let views: number;
	export let votes: number;
	export let answers: number;
</script>

<main
	class="min-h-48 max-w-lg w-full shadow-md py-2 px-3 rounded-sm my-2 bg-neutral text-neutral-content"
>
	<div class="status text-xs mb-2">
		<span class="text-gray-500">{votes} votes</span>
		<span class="text-gray-500">{answers} answers</span>
		<span>{views} views</span>
	</div>
	<a class="text-primary" href={`/questions/${id}`}>{title}</a>
	<p class="text-xs mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{content}</p>
	<div class="info flex flex-wrap gap-2 items-center justify-between mt-4">
		<div class="tags">
			{#each tags as tag}
				<a href={`/explore/${tag}`} class="text-xs p-1 bg-primary/20 text-primary m-1">{tag}</a>
			{/each}
		</div>
		<div class="profile flex items-center">
			<div class="mr-2 rounded-full bg-gray-300 w-full">
				<img class="w-6 h-6" src="/images/algory.svg" alt="avatar" />
			</div>
			<span class="text-xs">{author}</span>
		</div>
	</div>
</main>
