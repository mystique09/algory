<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<h1>This is your settings {data.user.profile.name}</h1>
