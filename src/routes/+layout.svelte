<script>
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.postcss';
	// import EventSource from 'eventsource';
	// global.EventSource = EventSource;
</script>

<Navbar />
<slot />
