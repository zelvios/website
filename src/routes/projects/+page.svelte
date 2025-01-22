<script>
    import { onMount } from 'svelte';

    let showGitHubProjects = false;
    let projects = [];
    let loading = true;
    let error = null;
    let currentPage = 1;
    const projectsPerPage = 6;

    // Fetch repositories from GitHub
    const fetchProjects = async () => {
        try {
            const response = await fetch('https://api.github.com/users/Zelvios/repos');
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            projects = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    };

    // Handle the change after changing Page
    const paginate = (direction) => {
        if (direction === 'next') {
            if (currentPage < totalPages) currentPage += 1;
        } else if (direction === 'prev') {
            if (currentPage > 1) currentPage -= 1;
        }
    };

    // Get the projects for the current page
    const getCurrentProjects = () => {
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        return projects.slice(startIndex, endIndex);
    };

    // Calculate total pages after fetching projects
    $: totalPages = Math.ceil(projects.length / projectsPerPage);

    onMount(() => {
        fetchProjects();
    });

    // Error handler for images
    function handleImageError(event) {
        event.target.src = 'https://avatars.githubusercontent.com/u/0?v=4';
    }
</script>

<main class="text-text p-8">
    <button
            class="mb-4 py-2 px-4 bg-accent text-black rounded-lg hover:bg-opacity-80 transition-colors block mx-auto"
            on:click={() => showGitHubProjects = !showGitHubProjects}
    >
        {showGitHubProjects ? 'Show Fewer Projects' : 'View all Projects'}
    </button>

    {#if showGitHubProjects}
        {#if loading}
            <p class="text-center text-lg text-accent">Loading projects...</p>
        {:else if error}
            <p class="text-center text-lg text-red-500">{error}</p>
        {:else}
            <!-- Github Project Card Design -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-6 max-w-screen-lg mx-auto">
                {#each getCurrentProjects() as project}
                    <div class="flex flex-col items-start space-y-2 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
                        <a href={project.html_url} target="_blank">
                            <img
                                    src={`https://raw.githubusercontent.com/Zelvios/${project.name}/main/screenshots/design.png`}
                                    alt="Project Image"
                                    class="project-image w-full h-40 object-cover rounded-t-lg transition-all duration-300"
                                    on:error={handleImageError}
                            />
                        </a>
                        <h2 class="text-lg font-semibold text-accent text-left w-full flex items-center">
                            <span>{project.name}</span>
                            <span class="line"></span>
                        </h2>
                        <p class="text-xs text-left w-full">
                            {#if project.language}
        <span class="inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-700 rounded-md">
          {project.language}
        </span>
                            {/if}
                        </p>
                        <p class="text-sm text-text text-left w-full">
                            {project.description || 'No description available'}
                        </p>

                        <p class="text-xs text-left w-full leading-tight">
                            <span class="text-accent">- Created on:</span>
                            <span class="text-text">{new Date(project.created_at).toLocaleDateString()}</span>
                        </p>

                        <div class="flex items-center space-x-2 mt-4 w-full">
                            <a href={project.html_url} target="_blank" class="text-accent hover:text-accent-dark">
                                <img src="src/lib/images/github.svg" alt="GitHub" class="w-5 h-5">
                            </a>
                            <a href={project.html_url} target="_blank" class="text-sm text-text underline hover:text-accent">
                                View Repository
                            </a>
                        </div>
                    </div>
                {/each}
            </div>

            <!-- Pages (GitHub Projects) -->
            <div class="flex justify-center items-center mt-6">
                <button
                        on:click={() => paginate('prev')}
                        class="py-2 px-3 bg-accent text-black rounded-lg hover:bg-opacity-80 transition-colors {currentPage === 1 ? 'bg-gray-400 text-gray-700' : 'bg-text-accent'} text-sm"
                        disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span class="mx-3 text-lg">
					Page {currentPage} of {totalPages}
				</span>
                <button
                        on:click={() => paginate('next')}
                        class="py-2 px-3 bg-accent text-black rounded-lg hover:bg-opacity-80 transition-colors {currentPage === totalPages ? 'bg-gray-400 text-gray-700' : 'bg-text-accent'} text-sm"
                        disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        {/if}
    {:else}
        <!-- Static Project -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-24 max-w-screen-lg mx-auto">
            <!-- Static Project 1 -->
            <div class="flex flex-col items-start space-y-3 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
                <a href="https://github.com/Zelvios/todo-tui" target="_blank">
                    <img src="src/lib/images/todo-tui.png" alt="no image"
                         class="project-image w-full h-40 object-cover rounded-t-lg transition-all duration-300">
                </a>
                <h2 class="text-lg font-semibold text-accent text-left w-full flex items-center space-x-2">
                    <span>Todo-TUI</span>
                    <span class="line"></span>
                </h2>
                <p class="text-xs text-left w-full">
                    <a href="https://www.rust-lang.org/" target="_blank"
                       class="inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-700 rounded-md hover:text-accent hover:bg-gray-600 transition-colors">
                        Rust
                    </a>
                    <a href="https://ratatui.rs/" target="_blank"
                       class="inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-700 rounded-md ml-1 hover:text-accent hover:bg-gray-600 transition-colors">
                        Ratatui
                    </a>
                </p>
                <p class="text-sm text-text text-left w-full">
                    A simple terminal-based To-Do app built in rust using the ratatui library for creating a text-based
                    user interface.
                </p>
                <div class="flex items-center space-x-2 mt-4 w-full">
                    <a href="https://github.com/Zelvios/todo-tui" target="_blank"
                       class="text-accent hover:text-accent-dark">
                        <img src="src/lib/images/github.svg" alt="GitHub" class="w-5 h-5">
                    </a>
                    <a href="https://github.com/Zelvios/todo-tui" target="_blank"
                       class="text-sm text-text underline hover:text-accent">
                        Source code
                    </a>
                </div>
            </div>

            <!-- Static Project 2 -->
            <div class="flex flex-col items-center space-y-3 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
                <img src="src/images/project2.jpg" alt="no image" class="w-full h-40 object-cover rounded-t-lg">
                <h2 class="text-lg font-semibold text-accent text-left w-full flex items-center space-x-2">
                    <span>Project 2</span>
                    <span class="line"></span>
                </h2>
                <p class="text-sm text-text text-left w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet vulputate nibh.
                </p>
            </div>

            <!-- Static Project 3 -->
            <div class="flex flex-col items-center space-y-3 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
                <img src="src/images/project3.jpg" alt="no image" class="w-full h-40 object-cover rounded-t-lg">
                <h2 class="text-lg font-semibold text-accent text-left w-full flex items-center space-x-2">
                    <span>Project 3</span>
                    <span class="line"></span>
                </h2>
                <p class="text-sm text-text text-left w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet vulputate nibh.
                </p>
            </div>
        </div>
    {/if}
</main>

<style>
    .project-image {
        transition: transform 0.3s ease, filter 0.3s ease;
    }

    .project-image:hover {
        transform: scale(1.05);
    }

    h2 .line {
        flex-grow: 1;
        border-bottom: 1.5px solid #c6d0f5;
        margin-left: 8px;
    }
</style>
