<script lang="ts">
	export let answer: Answer;
</script>

<div class="answer">
	<div class="divider" />
	<a href={`/users/${answer.author}`} class="text-primary text-xs">{answer.author}</a>
	<p class="text-xs">
		{answer.content}
	</p>
</div>
