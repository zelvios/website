<script>
    import { page } from '$app/stores';
    import {onMount} from "svelte";

    let stickyMenu = false;

    function isActive(path) {
        const normalize = (str) => str.endsWith('/') && str !== '/' ? str.slice(0, -1) : str;
        return normalize($page.url.pathname) === normalize(path);
    }
    function handleScroll() {
        stickyMenu = window.scrollY > 0;
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<header class="fixed left-0 top-0 w-full z-50 p-3 lg:py-0 flex flex-col items-center justify-between h-[7vh] transition-all duration-150"
        class:bg-base={stickyMenu}
        class:bg-opacity-70={stickyMenu}
        class:backdrop-blur-lg={stickyMenu}
        class:shadow={stickyMenu}
        class:!py-4={stickyMenu}>
    <nav class="mt-3 text-center">
        <ul class="flex justify-center gap-6 flex-wrap">
            {#each [
                { href: '/', label: 'Home' },
                { href: '/projects', label: 'Projects' },
                { href: '/contact', label: 'Contact' }
            ] as { href, label }}
                <li class="nav-item">
                    <a
                            href={href}
                            class="text-base p-2 rounded flex flex-col items-center text-text"
                    >
                        {label}
                        {#if isActive(href)}
                            <span class="w-1.5 h-1.5 bg-[#cba6f7] rounded-full mt-1"></span>
                        {/if}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</header>


<style>
    .nav-item {
        opacity: 0;
        animation: fadeInItem 1s ease-out forwards;
    }
    .nav-item:nth-child(1) { animation-delay: 0.5s; }
    .nav-item:nth-child(2) { animation-delay: 0.7s; }
    .nav-item:nth-child(3) { animation-delay: 0.9s; }

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
