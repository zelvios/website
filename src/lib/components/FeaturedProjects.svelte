<script lang="ts">
    import {onMount} from 'svelte';
    import BackgroundBeamCollision from '$lib/components/ui/BackgroundBeamCollision.svelte';
    import ProjectCard from '$lib/components/ProjectCard.svelte';

    import {type EnrichedRepo, fetchReposByNames, formatDate} from '$lib/api/repos';
    import AnimatedShinyText from "$lib/components/ui/AnimatedShinyText.svelte";

    const REPO_NAMES = ['user_auth', 'website', 'todo-tui'];

    let repos: EnrichedRepo[] = [];
    let missing: string[] = [];
    let loading = true;
    let loadError = false;

    async function loadSelected() {
        loading = true;
        loadError = false;
        repos = [];
        missing = [];

        try {
            const found = await fetchReposByNames(REPO_NAMES);
            repos = found;

            const foundNamesLower = new Set(found.map(r => r.name.toLowerCase()));
            missing = REPO_NAMES.filter(n => !foundNamesLower.has(n.toLowerCase()));
        } catch (err) {
            console.error('Error loading repos:', err);
            loadError = true;
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        loadSelected();
    });
</script>

<main class="relative flex flex-col justify-center items-center mt-0 mb-32">
    <BackgroundBeamCollision class="min-h-[320px] md:h-[50vh] rounded-lg max-w-2xl mx-auto">
        <div class="flex-1 z-10 text-center">
            <div class="inline-block bg-surface/30 backdrop-blur-sm border border-surface1/40 rounded-lg px-3 py-1 shadow-sm">
                <AnimatedShinyText
                        class="text-sm font-bold text-transparent bg-clip-text animate-shimmer
           bg-gradient-to-r from-transparent via-[#cba6f7]/80 via-50% to-transparent"
                >
                    Showcase
                </AnimatedShinyText>
            </div>

            <h2 class="pointer-events-none mt-2 font-semibold leading-none text-transparent bg-gradient-to-b from-white to-accent bg-clip-text text-4xl md:text-6xl pb-4">
                Featured Projects
            </h2>

            <p class="mt-5 text-sm tex-text line-clamp-3 max-w-md mx-auto">
                A collection of work showcasing proficiency across diverse technologies and domains.
            </p>

            <div class="flex justify-center mt-12 bottom">
                <a href="/projects">
                    <button class="flex items-center gap-2 cursor-pointer text-white text-sm font-medium bg-gradient-to-r from-gray-800 to-black px-4 py-2 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-accent hover:border-gray-800 hover:from-black hover:to-gray-900">
                        <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4Z"
                                  fill="#FFFFFF"/>
                        </svg>
                        Click to View Projects
                    </button>
                </a>
            </div>
        </div>
    </BackgroundBeamCollision>

    <div>
        {#if loading}
            <div class="mt-6 text-accent">Loading selected projects…</div>
        {:else if loadError}
            <div class="mt-6 text-red-400">Failed to load projects — check console for details.</div>
        {:else}
            <div class="space-y-4">
                {#if repos.length}
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                        {#each repos as repo (repo.name)}
                            <ProjectCard {repo} {formatDate}/>
                        {/each}
                    </div>
                {:else}
                    <div>No public repos found for the selected names.</div>
                {/if}

                {#if missing.length}
                    <div class="mt-4 text-sm text-muted-foreground">
                        <strong>Missing / not found:</strong>
                        <ul class="list-disc pl-5">
                            {#each missing as name}
                                <li>{name} — (may be private or misspelled)</li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </div>
        {/if}
    </div>
</main>
