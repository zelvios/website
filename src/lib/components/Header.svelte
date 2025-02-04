<script>
    import { page } from '$app/stores';
    function isActive(path) {
        return $page.url.pathname === path;
    }
</script>

<header class="bg-base bg-opacity-40 backdrop-blur-md text-text p-6 shadow-md flex flex-col items-center justify-between h-[15vh] fixed bottom-0 left-0 right-0 z-10 border-t-2 border-accent">
    <nav class="mt-4 text-center">
        <ul class="flex justify-center gap-6 flex-wrap">
            <li>
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
            <li>
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
            <li>
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