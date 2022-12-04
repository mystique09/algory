<script lang="ts">
	import { languages } from '$lib/stores/languages';
</script>

<div class="max-w-4xl m-auto w-full px-2">
	<h1 class="text-center text-2xl mt-2">All available tags</h1>
	<div class="divider" />
	<ul class="tags flex flex-col gap-1">
		{#each $languages as language}
			<ol class="text-lg">
				<a href={`/explore/${language}/#top`}>{language}</a>
			</ol>
		{/each}
	</ul>
</div>
