<script>
    import { onMount } from 'svelte';

    let showGitHubProjects = false;
    let projects = [];
    let loading = true;
    let error = null;
    let currentPage = 1;
    const projectsPerPage = 6;

    const staticProjects = [
        'dotfiles',
        'todo-tui',
        'BashControlCenter'
    ];

    let staticProjectData = [];

    const fetchProjects = async () => {
        const timeoutDuration = 5000;

        const timeout = setTimeout(() => {
            if (loading) {
                error = 'Failed to fetch projects, please try again later.';
                loading = false;
            }
        }, timeoutDuration);

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
            clearTimeout(timeout);
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

<main class="text-text p-8 flex flex-col">
    {#if showGitHubProjects}
        {#if loading}
            <div class="flex items-center justify-center">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accent" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="text-center text-accent ml-3">Loading projects...</p>
            </div>
        {:else if error}
            <div class="flex flex-col justify-center items-center text-accent" role="alert">
                <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div class="flex justify-center">
                    <span class="font-medium">Error! </span>
                    <span class="ml-2">{error}</span>
                </div>

                <div class="text-center mt-2 text-sm text-gray-500">
                    <p>Please try again later.</p>
                </div>
            </div>
        {:else}
            <!-- Github Project Card Design -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-10 max-w-screen-lg mx-auto fade-in">
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
                            <a href={project.html_url} target="_blank">
                                <span>{project.name}</span>
                            </a>
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
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.55 5.47 7.61.4.07.55-.17.55-.39 0-.19-.01-.69-.02-1.35-2.23.48-2.69-.54-2.69-.54-.36-.91-.88-1.15-.88-1.15-.72-.5.06-.49.06-.49 1.01.07 1.54 1.04 1.54 1.04 1.05 1.77 2.75 1.26 3.42.96.11-.77.41-1.26.75-1.55-1.56-.18-3.19-.78-3.19-3.47 0-.76.27-1.38.73-1.87-.07-.18-.32-.93.07-1.94 0 0 .58-.19 1.89.73.55-.15 1.14-.23 1.73-.23s1.18.08 1.73.23c1.31-.92 1.89-.73 1.89-.73.39 1.01.14 1.76.07 1.94.46.49.73 1.11.73 1.87 0 2.7-1.63 3.29-3.19 3.47.42.36.8 1.09.8 2.19 0 1.58-.02 2.86-.02 3.24 0 .22.15.46.55.39C13.71 14.55 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                            <a href={project.html_url} target="_blank" class="text-sm text-text underline hover:text-accent">
                                View Repository
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="flex justify-center items-center mb-12 space-x-4 mt-12 fade-in">
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
        {/if}
    {:else}
        {#if loading}
            <div class="flex items-center justify-center">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accent" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="text-center text-accent ml-3">Loading projects...</p>
            </div>
        {:else if error}
            <div class="flex flex-col justify-center items-center text-accent" role="alert">
                <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div class="flex justify-center">
                    <span class="font-medium">Error! </span>
                    <span class="ml-2">{error}</span>
                </div>

                <div class="text-center mt-2 text-sm text-gray-500">
                    <p>Please try again later.</p>
                </div>
            </div>
        {:else}
            <div class={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-screen-lg mx-auto fade-in mb-16 mt-10
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
                            <a href={project.html_url} target="_blank">
                                <span>{project.name}</span>
                            </a>
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
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.55 5.47 7.61.4.07.55-.17.55-.39 0-.19-.01-.69-.02-1.35-2.23.48-2.69-.54-2.69-.54-.36-.91-.88-1.15-.88-1.15-.72-.5.06-.49.06-.49 1.01.07 1.54 1.04 1.54 1.04 1.05 1.77 2.75 1.26 3.42.96.11-.77.41-1.26.75-1.55-1.56-.18-3.19-.78-3.19-3.47 0-.76.27-1.38.73-1.87-.07-.18-.32-.93.07-1.94 0 0 .58-.19 1.89.73.55-.15 1.14-.23 1.73-.23s1.18.08 1.73.23c1.31-.92 1.89-.73 1.89-.73.39 1.01.14 1.76.07 1.94.46.49.73 1.11.73 1.87 0 2.7-1.63 3.29-3.19 3.47.42.36.8 1.09.8 2.19 0 1.58-.02 2.86-.02 3.24 0 .22.15.46.55.39C13.71 14.55 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                            </a>
                            <a href={project.html_url} target="_blank" class="text-sm text-text underline hover:text-accent">
                                View Repository
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}

    <div class="flex justify-center mb-8 mt-auto mt-8 fade-in">
        {#if staticProjectData.length > 0}
            <button
                    class="bg-base text-text border border-accent border-b-4 font-medium overflow-hidden relative px-8 py-2 rounded-md
                hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                    on:click={() => showGitHubProjects = !showGitHubProjects}
            >
                <span class="bg-accent shadow-accent absolute -top-[150%] left-0 inline-flex w-full h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                {showGitHubProjects ? 'View Pinned Projects' : 'View all Projects'}
            </button>
        {/if}
    </div>
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
