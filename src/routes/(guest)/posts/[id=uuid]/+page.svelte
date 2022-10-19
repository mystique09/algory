<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/$types';

	export let data: PageData;
</script>

<h1>{data.title}</h1>
<h1>{data.description}</h1>
