<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import '@fontsource/poppins';
	import '../app.postcss';
	import Toast from '$lib/components/toast.svelte';
	// import EventSource from 'eventsource';
	// global.EventSource = EventSource;
</script>

<Navbar />
<Toast />
<slot />
<Footer />