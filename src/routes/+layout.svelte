<script context="module">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<main class="min-h-screen bg-base flex flex-col">
	<div class="flex-grow">
		<slot />
	</div>
	<Header />
</main>
