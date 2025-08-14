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

<main>
    <aside class="relative xl:fixed top-0 left-0 w-full xl:w-1/4 h-auto xl:h-screen pr-4 flex items-center justify-center text-text mt-20 xl:mt-0 mb-8 xl:mb-0" >
        <div class="text-center fade-in max-w-xl mx-auto px-4">
            <h1 class="text-6xl font-bold bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                Projects
            </h1>
            <p class="mt-4 text-base text-text leading-relaxed">
                A complete list of my public GitHub repositories, including experiments, tools, and ongoing projects.
            </p>
        </div>
    </aside>

    <section class="mt-8 xl:mt-0  ml-0 xl:ml-[25vw] pr-4 pt-20 space-y-8 text-text">
        <section class="snap-section flex flex-wrap items-start justify-center bg-base text-text relative gap-5 px-5 w-full">
            {#if loadError || repos.length === 0}
                <div class="w-full min-h-[50vh] flex items-center justify-center">
                    {#if loadError}
                        <div class="max-w-md min-w-[200px] px-4 text-center">
                            <p class="text-accent font-semibold text-xl">
                                Sorry, could not load GitHub projects at the moment.
                            </p>
                            <p class="text-text mt-2 text-base">
                                Please try again later.
                            </p>
                        </div>
                    {:else}
                        <div class="text-center text-slate-400 text-lg">
                            Loading projects…
                        </div>
                    {/if}
                </div>
            {:else}
                {#each repos as repo}
                    <ProjectCard {repo} {formatDate} />
                {/each}
            {/if}
        </section>
    </section>
</main>

<script>
    import { afterUpdate, onMount, tick } from 'svelte';
    import ProjectCard from "$lib/components/ProjectCard.svelte";

    let loadError = false;
    let repos = [];

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
                        name:         repo.name,
                        html_url:     repo.html_url,
                        description:  repo.description,
                        created_at:   repo.created_at,
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