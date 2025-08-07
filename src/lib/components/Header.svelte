<script>
    import {page} from '$app/stores';
    import {onMount} from "svelte";

    let stickyMenu = false;
    let showMenu = false;

    function isActive(path) {
        const normalize = (str) => str.endsWith('/') && str !== '/' ? str.slice(0, -1) : str;
        return normalize($page.url.pathname) === normalize(path);
    }

    function handleScroll() {
        stickyMenu = window.scrollY > 0;
    }

    function toggleMenu() {
        showMenu = !showMenu;
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<header class="fixed left-0 top-0 w-full z-50 p-3 lg:py-0 flex items-center justify-between h-[7vh] transition-all duration-150"
        class:!py-4={stickyMenu}
        class:backdrop-blur-lg={stickyMenu}
        class:bg-base={stickyMenu}
        class:bg-opacity-70={stickyMenu}
        class:shadow={stickyMenu}>
    <a class="flex items-center" href="/">
        <img alt="Site Icon" class="h-12 w-12" src="/images/icon.svg"/>
    </a>

    <nav class="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
        <ul class="flex justify-center gap-6 flex-wrap">
            {#each [
                {href: '/', label: 'Home'},
                {href: '/projects', label: 'Projects'},
                {href: '/contact', label: 'Contact'}
            ] as {href, label}}
                <li class="nav-item">
                    <a href={href}
                       class="text-base p-2 rounded flex flex-col items-center text-text">
                        {label}
                        {#if isActive(href)}
                            <span class="w-1.5 h-1.5 bg-[#cba6f7] rounded-full mt-1"></span>
                        {/if}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>

    {#if !showMenu}
        <button class="sm:hidden flex flex-col justify-center items-center gap-1 w-8 h-8 relative z-50"
                aria-label="Open menu" on:click={toggleMenu}>
            <span class="block w-6 h-0.5 bg-text transition-transform"></span>
            <span class="block w-6 h-0.5 bg-text transition-opacity"></span>
            <span class="block w-6 h-0.5 bg-text transition-transform"></span>
        </button>
    {/if}

    {#if showMenu}
        <button class="sm:hidden absolute top-3 right-3 text-text text-5xl font-bold leading-none z-50"
                aria-label="Close menu" on:click={toggleMenu}>
            &times;
        </button>
    {/if}
</header>

{#if showMenu}
    <div class="fixed top-[0vh] left-0 w-full bg-base bg-opacity-80 backdrop-blur-lg shadow-lg z-40 p-5 flex flex-col lg:hidden">
        <nav>
            <ul class="flex flex-col gap-6 mt-16">
                {#each [
                    {href: '/', label: 'Home'},
                    {href: '/projects', label: 'Projects'},
                    {href: '/contact', label: 'Contact'}
                ] as {href, label}}
                    <li>
                        <a href={href}
                           class="text-base p-2 rounded text-text block"
                           on:click={() => (showMenu = false)}>
                            {label}
                            {#if isActive(href)}
                                <span class="w-1.5 h-1.5 bg-[#cba6f7] rounded-full inline-block ml-2"></span>
                            {/if}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
{/if}

<style>
    .nav-item {
        opacity: 0;
        animation: fadeInItem 1s ease-out forwards;
    }

    .nav-item:nth-child(1) {
        animation-delay: 0.5s;
    }

    .nav-item:nth-child(2) {
        animation-delay: 0.7s;
    }

    .nav-item:nth-child(3) {
        animation-delay: 0.9s;
    }

    @keyframes fadeInItem {
        0% {
            opacity: 0;
            transform: translateX(-20px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>
