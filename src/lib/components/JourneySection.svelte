<script>
    import { afterUpdate, onMount, onDestroy, tick } from 'svelte';
    import TracingBeam from "$lib/components/ui/TracingBeam.svelte";
    import Grid from "$lib/components/ui/Grid.svelte";
    import JourneyCard from "$lib/components/JourneyCard.svelte";
    import Meteors from "$lib/components/ui/Meteors.svelte";

    let root;
    let io = null;
    let loadError = false;
    let repos = [];
    const staticProjects = ['user_auth', 'todo-tui', 'dotfiles'];

    $: repoMap = Object.fromEntries(
        staticProjects.map(name => [name, repos.find(r => r.name === name)])
    );

    function getLocalStaticProjects() {
        try {
            const all = Object.values(localStorage).map(item => {
                try {
                    return JSON.parse(item);
                } catch {
                    return null;
                }
            }).filter(Boolean).flat();
            return all
                .filter(r => staticProjects.includes(r.name))
                .sort((a, b) => staticProjects.indexOf(a.name) - staticProjects.indexOf(b.name))
                .map(r => ({...r, topLanguages: r.topLanguages || []}));
        } catch {
            return [];
        }
    }

    async function fetchLanguages(repo) {
        try {
            const res = await fetch(`https://api.github.com/repos/Zelvios/${repo.name}/languages`);
            if (!res.ok) return;
            const langs = await res.json();
            repo.topLanguages = Object.keys(langs).slice(0, 5);
        } catch {
            repo.topLanguages = repo.topLanguages || [];
        }
    }

    function initHidden(el, i = 0) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 1s cubic-bezier(.22,.61,.36,1), transform 1s cubic-bezier(.22,.61,.36,1)';
        el.style.willChange = 'opacity, transform';
        el.style.transitionDelay = `${i * 60}ms`;
        el.classList.remove('revealed');
    }

    function setupRevealObserver() {
        if (io) {
            try { io.disconnect(); } catch (e) {}
            io = null;
        }
        if (!root) return;

        const targets = Array.from(root.querySelectorAll('[data-reveal]'));
        if (!targets.length) return;

        targets.forEach((el, i) => initHidden(el, i));

        io = new IntersectionObserver((entries) => {
            for (let j = 0; j < entries.length; j++) {
                const entry = entries[j];
                const el = entry.target;
                const ratio = entry.intersectionRatio || 0;

                const visible = entry.isIntersecting || ratio > 0.05;

                if (visible) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.classList.add('revealed');
                } else {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(20px)';
                    el.classList.remove('revealed');
                }
            }
        }, {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0, 0.01, 0.05, 0.1, 0.25, 0.5, 1]
        });

        targets.forEach((t) => {
            if (io) io.observe(t);
        });
    }

    afterUpdate(async () => {
        await tick();
        const descs = Array.from(document.querySelectorAll('.repo-desc'));
        if (descs.length) {
            const maxH = Math.max(...descs.map(el => el.offsetHeight));
            descs.forEach(el => el.style.minHeight = `${maxH}px`);
        }
        requestAnimationFrame(() => setupRevealObserver());
    });

    onMount(async () => {
        setTimeout(() => setupRevealObserver(), 50);
    });

    onDestroy(() => {
        if (io) {
            try { io.disconnect(); } catch (e) {}
            io = null;
        }
    });

    onMount(async () => {
        try {
            const res = await fetch('https://api.github.com/users/Zelvios/repos');
            if (!res.ok) throw new Error('Fetch failed');

            const data = await res.json();
            const fetchedRepos = data
                .filter(r => staticProjects.includes(r.name))
                .sort((a, b) => staticProjects.indexOf(a.name) - staticProjects.indexOf(b.name))
                .map(r => ({ ...r, topLanguages: [] }));

            await Promise.all(fetchedRepos.map(fetchLanguages));

            const localReposRaw = localStorage.getItem('zelvios_repos');
            const localRepos = localReposRaw ? JSON.parse(localReposRaw) : [];

            const localRepoMap = new Map(localRepos.map(r => [r.name, r]));
            fetchedRepos.forEach(r => localRepoMap.set(r.name, r));
            const mergedRepos = Array.from(localRepoMap.values());

            localStorage.setItem('zelvios_repos', JSON.stringify(mergedRepos));

            repos = mergedRepos;
            loadError = mergedRepos.length === 0;

        } catch {
            repos = getLocalStaticProjects();
            loadError = repos.length === 0;
        }

        setTimeout(() => setupRevealObserver(), 50);
    });

    let features = [
        {
            title: "Polyglot Developer",
            description: "Rust is my main focus, but I also work with C#, TypeScript, Python, and more."
        },
        {
            title: "Framework Explorer",
            description: "I’ve built with Svelte, React, Vue, Tauri, and enjoy picking the right tool for the job."
        },
        {
            title: "DevOps Mindset",
            description: "Comfortable with Docker, Linux, and deployment pipelines."
        },
        {
            title: "Always Learning",
            description: "Expanding skills in full-stack, systems, and new tech."
        },
    ];
</script>

<div id="part2" bind:this={root}>
    <TracingBeam className="flex flex-col items-center bg-base text-text px-8 w-full min-h-screen mb-4" end={0.62} start={0.2}>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 text-center text-accent">
                Journey
            </h2>

        <div class="space-y-12 max-w-xl mx-auto text-center mb-6">
            <p>
                A brief curated view of my journey: projects, small facts about me, and experiences that have shaped my path so far.
                Feel free to explore and get a glimpse of what I’ve been working on.
            </p>
        </div>

        <div class="beam-anchor"/>

        <div class="w-full flex justify-center mt-24 px-6 sm:px-12 lg:px-24 flex-col items-center">
            {#if repoMap[staticProjects[0]]}
                <JourneyCard repo={repoMap[staticProjects[0]]} />
            {/if}
        </div>

        <div class="py-20 w-full px-6 sm:px-12 lg:px-24">
            <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center">
                {#each features as feature, idx (feature.title)}
                    <div data-reveal data-feature-index={idx}
                         class="relative bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 rounded-3xl overflow-hidden w-64 mx-auto">
                        <Grid size={20}/>
                        <p class="text-sm font-bold text-accent relative z-20">
                            {feature.title}
                        </p>
                        <p class="text-neutral-400 mt-4 text-sm font-normal relative z-20">
                            {feature.description}
                        </p>
                    </div>
                {/each}
            </div>
        </div>

        <div class="w-full flex justify-center mt-16 px-6 sm:px-12 lg:px-24 flex-col items-center">
            {#if repoMap[staticProjects[1]]}
                <JourneyCard repo={repoMap[staticProjects[1]]} />
            {/if}
        </div>

        <div class="w-full flex justify-center mt-16 px-6 sm:px-12 lg:px-24 flex-col items-center">
            {#if repoMap[staticProjects[2]]}
                <JourneyCard repo={repoMap[staticProjects[2]]} />
            {/if}
        </div>

        <div class="flex justify-center mt-8">
            <div class="relative inline-flex items-center justify-center gap-4 group">
                <div class="absolute inset-0 duration-1000 opacity-30 transition-all bg-gradient-to-r from-accent via-accent-light to-accent rounded-xl blur-md filter group-hover:opacity-60 group-hover:duration-200"
                ></div>
                <a class="group relative inline-flex items-center justify-center text-base rounded-xl bg-base px-8 py-3 font-semibold text-text transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:divide-surface1 beam-target"
                   href="/projects" role="button" title="payment">
                    See all Projects
                    <svg aria-hidden="true"
                         class="mt-0.5 ml-2 -mr-1 stroke-text stroke-2"
                         fill="none"
                         height="10"
                         viewBox="0 0 10 10"
                         width="10">
                        <path class="transition opacity-0 group-hover:opacity-100"
                              d="M0 5h7"
                        ></path>
                        <path class="transition group-hover:translate-x-[3px]"
                              d="M1 1l4 4-4 4"
                        ></path>
                    </svg>
                </a>
            </div>
        </div>
    </TracingBeam>
</div>
