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
	<meta name="description" content="A portfolio created to showcase expertise in web development, design, and programming." />
	<meta property="og:title" content="Jacob-J • Portfolio" />
	<meta property="og:description" content="A portfolio created to showcase expertise in web development, design, and programming." />
	<meta property="og:url" content="https://jacob-j.com" />
</svelte:head>

<main class="min-h-screen bg-base flex flex-col pb-[15vh]">
	<div class="flex-grow">
		<slot />
	</div>
	<Header />
</main>