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

<svelte:head>
	<title>Jacob-J • Portfolio</title>
	<meta name="description" content="Hi, I’m Jacob. This portfolio showcases my programming skills and development projects." />
	<meta property="og:title" content="Jacob-J • Portfolio" />
	<meta property="og:description" content="Hi, I’m Jacob. This portfolio showcases my programming skills and development projects." />
	<meta property="og:url" content="https://jacob-j.com" />
</svelte:head>

<main class="bg-base flex flex-col min-h-screen">
	<Header />
	<div class="flex-grow">
		<slot />
	</div>
</main>