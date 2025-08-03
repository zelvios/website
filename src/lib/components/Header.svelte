<script>
    import { page } from '$app/stores';

    function isActive(path) {
        const normalize = (str) => str.endsWith('/') && str !== '/' ? str.slice(0, -1) : str;
        return normalize($page.url.pathname) === normalize(path);
    }
</script>

<header class="text-text p-4 flex flex-col items-center justify-between h-[8vh] fixed top-0 left-0 right-0 z-50 fade-in-left">
    <nav class="mt-4 text-center">
        <ul class="flex justify-center gap-6 flex-wrap">
            {#each [
                { href: '/', label: 'Home' },
                { href: '/projects', label: 'Projects' },
                { href: '/contact', label: 'Contact' }
            ] as { href, label }}
                <li class="nav-item">
                    <a
                            href={href}
                            class="text-base p-2 rounded flex flex-col items-center"
                            class:text-[#cba6f7]={isActive(href)}
                            class:text-text={!isActive(href)}
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
