<script>
    import { page } from '$app/stores';
    function isActive(path) {
        return $page.url.pathname === path;
    }
</script>

<header class="bg-base bg-opacity-40 backdrop-blur-md text-text p-6 shadow-md flex flex-col items-center justify-between h-[15vh] fixed bottom-0 left-0 right-0 z-10 border-t-2 border-accent fade-in-left">
    <nav class="mt-4 text-center">
        <ul class="flex justify-center gap-6 flex-wrap">
            <li class="nav-item">
                <a
                        href="/"
                        class="text-base p-2 rounded"
                        class:bg-accent={isActive('/')}
                        class:text-base={isActive('/')}
                        class:text-accent={!isActive('/')}
                >
                    Home
                </a>
            </li>
            <li class="nav-item">
                <a
                        href="/projects"
                        class="text-base p-2 rounded"
                        class:bg-accent={isActive('/projects')}
                        class:text-base={isActive('/projects')}
                        class:text-accent={!isActive('/projects')}
                >
                    Projects
                </a>
            </li>
            <li class="nav-item">
                <a
                        href="/contact"
                        class="text-base p-2 rounded"
                        class:bg-accent={isActive('/contact')}
                        class:text-base={isActive('/contact')}
                        class:text-accent={!isActive('/contact')}
                >
                    Contact
                </a>
            </li>
        </ul>
    </nav>
</header>

<style>
    .fade-in-left {
        animation: fadeInLeft 0.5s ease-out;
    }

    @keyframes fadeInLeft {
        0% {
            opacity: 0;
            transform: translateX(-100%);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInBorder {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

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
