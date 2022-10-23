<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import '@fontsource/poppins';
	import '../app.postcss';
	// import EventSource from 'eventsource';
	// global.EventSource = EventSource;
</script>

<Navbar />
<slot />
<Footer />