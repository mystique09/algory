<script lang="ts">
	import { languages } from '$lib/stores/languages';
</script>

<div class="container px-2">
	<div class="form-control m-4 flex md:flex-row items-center justify-around mb-8">
		<div class="w-full">
			<h1 class="text-center text-2xl mb-4">All available tags</h1>
		</div>
	</div>
	<ul class="tags flex flex-col gap-1">
		{#each $languages as language}
			<ol class="text-lg">
				<a href={`/explore/${language}/#top`}>{language}</a>
			</ol>
		{/each}
	</ul>
</div>
