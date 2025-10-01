<script lang="ts">
    import {afterUpdate, onMount, tick} from 'svelte';
    import TechCard from '$lib/components/TechCard.svelte';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import GradientLine from '$lib/components/ui/GradientLine.svelte';
    import {type EnrichedRepo, fetchAllRepos, formatDate, normalize, techLabelToLang} from '$lib/api/repos';
    import AmbientColor from "$lib/components/ui/AmbientColor.svelte";

    const techs: Record<string, string> = {
        Rust: "#e07b39",
        CSharp: "#68217A",
        C: "#4b5563",
        Python: "#facc15"
    };

    let activeTech: string | null = null;

    let repos: EnrichedRepo[] = [];
    let loadError = false;

    let animate = false;
    let animateTimeout: number;

    function clearFilters() {
        activeTech = null;
        animate = false;
        if (animateTimeout) clearTimeout(animateTimeout);

        tick().then(() => {
            animate = true;
            animateTimeout = setTimeout(() => (animate = false), 1100);
        });
    }

    async function toggleTech(tech: string) {
        activeTech = activeTech === tech ? null : tech;
        animate = false;
        if (animateTimeout) clearTimeout(animateTimeout);

        await tick();
        animate = true;
        animateTimeout = setTimeout(() => (animate = false), 1100);
    }

    $: filteredRepos = (() => {
        if (!activeTech) return repos;
        const target = techLabelToLang[activeTech] ?? activeTech;
        const normTarget = normalize(target);

        return repos.filter(repo => {
            if (!repo.topLanguages || !repo.topLanguages.length) return false;
            return repo.topLanguages.some(lang => normalize(lang) === normTarget);
        });
    })();

    onMount(async () => {
        try {
            repos = await fetchAllRepos();
            loadError = false;
        } catch (e) {
            console.error('Could not load repos:', e);
            loadError = true;
        }
    });

    afterUpdate(async () => {
        await tick();

        const descs = Array.from(document.querySelectorAll('.repo-desc')) as HTMLElement[];
        if (!descs.length) return;

        const maxH = descs.reduce((mx, el) => Math.max(mx, el.offsetHeight), 0);
        descs.forEach(el => (el.style.minHeight = `${maxH}px`));
    });
</script>

<main class="pt-32 relative fade-in">
    <AmbientColor/>
    <div class="mt-28 fade-in mb-14">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-center text-accent">
            Projects
        </h2>
        <div class="space-y-12 max-w-xl mx-auto text-center mb-6 z-20 text-text">
            <p>
                A complete list of my public GitHub repositories, including experiments, tools, and ongoing projects.
            </p>
        </div>
    </div>

    <div class="space-y-16">
        <div class="flex flex-wrap justify-center gap-4">
            {#each Object.keys(techs) as tech}
                <TechCard
                        name={tech}
                        color={techs[tech]}
                        active={activeTech === tech}
                        on:click={() => toggleTech(tech)}
                />
            {/each}
        </div>

        <div class="text-center space-y-2">
            <div class="h-6">
                {#if activeTech}
                    <button class="text-text hover:text-accent transition-colors duration-200 cursor-pointer"
                            on:click={clearFilters}>
                        - Show All Projects -
                    </button>
                {/if}
            </div>
            <GradientLine/>
        </div>


        <div class="flex flex-wrap justify-center gap-6 px-16">
            {#each filteredRepos as repo (repo.name)}
                <div class:fade-in={animate}>
                    <ProjectCard {repo} {formatDate}/>
                </div>
            {/each}
        </div>
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
</style>