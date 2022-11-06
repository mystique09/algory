<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import '@fontsource/poppins';
	import '../app.postcss';
	import Toast from '$lib/components/toast.svelte';
	import { loading } from '$lib/stores/loading';
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/spinner/loading.svelte';

	$: loading.setNavigate(!!$navigating);
</script>

<Loading />
<Toast />
<Navbar>
	<slot />
	<Footer />
</Navbar>
