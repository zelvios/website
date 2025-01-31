<script>
    import { onMount } from 'svelte';

    let showGitHubProjects = false;
    let projects = [];
    let loading = true;
    let error = null;
    let currentPage = 1;
    const projectsPerPage = 3;

    const staticProjects = [
        'dotfiles',
        'todo-tui',
        'BashControlCenter'
    ];

    let staticProjectData = [];

    const fetchProjects = async () => {
        try {
            const response = await fetch('https://api.github.com/users/Zelvios/repos');
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            projects = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            staticProjectData = staticProjects
                .map(projectName =>
                    projects.find(project => project.name === projectName)
                )
                .filter(project => project !== undefined);
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    };

    const paginate = (direction) => {
        if (direction === 'next') {
            if (currentPage < totalPages) currentPage += 1;
        } else if (direction === 'prev') {
            if (currentPage > 1) currentPage -= 1;
        }
    };

    const getCurrentProjects = () => {
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        return projects.slice(startIndex, endIndex);
    };

    $: totalPages = Math.ceil(projects.length / projectsPerPage);

    onMount(() => {
        fetchProjects();
    });

    function handleImageError(event) {
        event.target.src = 'https://avatars.githubusercontent.com/u/0?v=4';
    }
</script>

<main class="text-text p-8">
    <div class="flex justify-center mb-8">
        <button
                class="bg-base text-text border border-accent border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md
        hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                on:click={() => showGitHubProjects = !showGitHubProjects}
        >
            <span class="bg-accent shadow-accent absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
            {showGitHubProjects ? 'Show Fewer Projects' : 'View all Projects'}
        </button>
    </div>

    {#if showGitHubProjects}
        {#if loading}
            <p class="text-center text-lg text-accent">Loading projects...</p>
        {:else if error}
            <p class="text-center text-lg text-red-500">{error}</p>
        {:else}
            <div class="flex justify-center items-center mb-12 space-x-4">
                <button
                        on:click={() => paginate('prev')}
                        class="py-1 px-2 bg-accent text-black rounded-lg hover:bg-opacity-80 transition-colors {currentPage === 1 ? 'bg-gray-400 text-gray-700' : 'bg-text-accent'} text-sm"
                        disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span class="mx-2 text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                        on:click={() => paginate('next')}
                        class="py-1 px-2 bg-accent text-black rounded-lg hover:bg-opacity-80 transition-colors {currentPage === totalPages ? 'bg-gray-400 text-gray-700' : 'bg-text-accent'} text-sm"
                        disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            <!-- Github Project Card Design -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-6 max-w-screen-lg mx-auto fade-in">
                {#each getCurrentProjects() as project}
                    <div class="flex flex-col items-start space-y-3 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
                        <a href={project.html_url} target="_blank">
                            <img
                                    src={`https://raw.githubusercontent.com/Zelvios/${project.name}/main/screenshots/design.png`}
                                    alt="Project Image"
                                    class="project-image w-full h-40 object-cover rounded-t-lg transition-all duration-300"
                                    on:error={handleImageError}
                            />
                        </a>
                        <h2 class="text-lg font-semibold text-accent text-left w-full flex items-center space-x-2">
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
        {/if}
    {:else}
        <!-- Pinned Project -->
        <div class={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-screen-lg mx-auto fade-in
            ${staticProjectData.length <= 2 ? 'justify-center' : ''}`}>
            {#each staticProjectData as project}
                <div class="flex flex-col items-start space-y-3 w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
                    <a href={project.html_url} target="_blank">
                        <img
                                src={`https://raw.githubusercontent.com/Zelvios/${project.name}/main/screenshots/design.png`}
                                alt="Project Image"
                                class="project-image w-full h-40 object-cover rounded-t-lg transition-all duration-300"
                                on:error={handleImageError}
                        />
                    </a>
                    <h2 class="text-lg font-semibold text-accent text-left w-full flex items-center space-x-2">
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
    {/if}
</main>

<style>
    .fade-in {
        animation: fadeIn 1s ease-out;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

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
