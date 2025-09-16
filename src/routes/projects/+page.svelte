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


<main class="space-y-24">
    <div class="relative h-72 mt-12 w-full overflow-hidden  flex flex-col items-center justify-center rounded-lg">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 text-center text-accent z-20">
                Projects
            </h2>

            <div class="space-y-12 max-w-xl mx-auto text-center mb-6 z-20 text-text">
                <p>
                    A complete list of my public GitHub repositories, including experiments, tools, and ongoing
                    projects.
                </p>
            </div>


        <div class="absolute bottom-0 left-0 w-full h-1 bg-accent/70 blur-md shadow-[0_0_10px_rgba(255,255,255,0.3)] z-20"></div>
        <div class="absolute bottom-0 left-0 w-full border-t border-surface1"></div>
    </div>

    <div class="space-y-16">
        <div class="flex flex-wrap justify-center gap-4">
            {#each techs as tech}
                <TechCard
                        name={tech}
                        active={activeTech === tech}
                        on:click={() => toggleTech(tech)}
                />
            {/each}
        </div>

        <div class="text-center space-y-2">
            <div class="h-6">
                {#if activeTech}
                    <button class="text-text hover:text-accent transition-colors duration-200 cursor-pointer"
                            on:click={clearFilters} >
                        - Show All Projects -
                    </button>
                {/if}
            </div>
            <GradientLine />
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


<script>
    import {afterUpdate, onMount, tick} from 'svelte';
    import TechCard from "$lib/components/TechCard.svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import GradientLine from "$lib/components/ui/GradientLine.svelte";

    let techs = ["Rust", "CSharp", "C", "Python"];
    let activeTech = null;

    let loadError = false;
    let repos = [];

    let animate = false;
    let animateTimeout;

    function clearFilters() {
        activeTech = null;

        animate = false;
        if (animateTimeout) clearTimeout(animateTimeout);

        tick().then(() => {
            animate = true;
            animateTimeout = setTimeout(() => (animate = false), 1100);
        });
    }

    async function toggleTech(tech) {
        activeTech = activeTech === tech ? null : tech;

        animate = false;
        if (animateTimeout) clearTimeout(animateTimeout);

        await tick();

        animate = true;

        animateTimeout = setTimeout(() => (animate = false), 1100);
    }

    const techLabelToLang = {
        CSharp: 'C#'
    };

    const normalize = s => (s || '').toString().toLowerCase().replace('#', 'sharp').replace(/\s+/g, '');

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
            const cached = localStorage.getItem('zelvios_repos');
            const lastFetched = localStorage.getItem('zelvios_repos_fetched_at');
            const oneDay = 24 * 60 * 60 * 1000;
            const now = Date.now();

            if (cached && lastFetched && now - Number(lastFetched) < oneDay) {
                repos = JSON.parse(cached);
                return;
            }

            const res = await fetch('https://api.github.com/users/Zelvios/repos');
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();

            const full = data
                .filter(r => r.name.toLowerCase() !== 'zelvios')
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            const enriched = await Promise.all(
                full.map(async repo => {
                    let topLanguages = null;
                    let langError = false;

                    try {
                        const langRes = await fetch(
                            `https://api.github.com/repos/Zelvios/${repo.name}/languages`
                        );
                        if (!langRes.ok) throw new Error(langRes.statusText);

                        const langs = await langRes.json();
                        topLanguages = Object.entries(langs)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 5)
                            .map(([lang]) => lang);

                    } catch (err) {
                        console.error(`Failed to fetch languages for ${repo.name}:`, err);
                        langError = true;
                    }

                    return {
                        name: repo.name,
                        html_url: repo.html_url,
                        description: repo.description,
                        created_at: repo.created_at,
                        topLanguages,
                        langError
                    };
                })
            );

            localStorage.setItem('zelvios_repos', JSON.stringify(enriched));
            localStorage.setItem('zelvios_repos_fetched_at', Date.now().toString());
            repos = enriched;
            loadError = false;

        } catch (e) {
            console.error('Could not load repos:', e);
            loadError = true;
        }
    });

    function formatDate(iso) {
        return new Date(iso).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    afterUpdate(async () => {
        await tick();
        const descs = Array.from(document.querySelectorAll('.repo-desc'));
        if (!descs.length) return;
        const maxH = descs.reduce((mx, el) => Math.max(mx, el.offsetHeight), 0);
        descs.forEach(el => el.style.minHeight = `${maxH}px`);
    });
</script>