<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import '@fontsource/poppins';
	import '../app.postcss';
	import Toast from '$lib/components/toast.svelte';
</script>

<Navbar />
<Toast />
<div class="relative mt-20">
	<slot />
</div>
<Footer />
