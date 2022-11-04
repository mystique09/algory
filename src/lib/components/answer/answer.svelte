<script lang="ts">
	export let author: string;
	export let content: string;
</script>

<div class="answer">
	<div class="divider" />
	<a href={`/users/${author}`} class="text-accent text-xs">{author}</a>
	<p class="text-xs">
		{content}
	</p>
</div>
