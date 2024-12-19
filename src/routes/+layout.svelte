<script context="module">
	import { goto } from '$app/navigation';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';

	export function load({ error }) {
		if (error && error.status === 404) {
			goto('/');
		}
	}
</script>

<main class="min-h-screen bg-base flex flex-col">
	<div class="flex-grow">
		<slot />
	</div>
	<Header />
</main>
