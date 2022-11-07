<script lang="ts">
	import { languages } from '$lib/stores/languages';
</script>

<div class="container">
	<div class="form-control m-4 flex md:flex-row items-center justify-around mb-8">
		<div class="w-full">
			<h1 class="text-center text-xl mb-4">All available tags</h1>
		</div>
	</div>
	<div class="tags">
		{#each $languages as language}
			<div class="badge badge-neutral-content m-1">
				<a href={`/explore/${language}/#top`}>{language}</a>
			</div>
		{/each}
	</div>
</div>
