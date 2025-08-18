<script>
    import Grid from "$lib/components/ui/Grid.svelte";
    import GradientLine from "$lib/components/ui/GradientLine.svelte";

    export let repo;

    export function formatDate(iso) {
        return new Date(iso).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }
</script>

{#if repo}
    <div data-reveal class="w-full max-w-3xl relative bg-gradient-to-b from-neutral-900 to-neutral-950 p-4 rounded-3xl overflow-hidden mx-auto">
        <Grid size={19}/>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="w-full">
            <p class="font-bold text-accent relative text-center text-xl mt-1 cursor-pointer transition-transform duration-200 transform hover:scale-105">
                {repo.name}
            </p>
        </a>

        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="w-full relative group">
            <div class="relative">
                <div class="absolute inset-0 rounded-lg bg-accent2 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25"></div>
                <img src={`https://raw.githubusercontent.com/Zelvios/${repo.name}/main/.github/screenshots/design.png`}
                     alt="Project screenshot"
                     class="mt-2 rounded-lg w-full h-64 object-cover relative z-10 cursor-pointer"/>
            </div>
        </a>

        <GradientLine height={1} glowOpacity={0.8}/>

        <p class="text-text mt-1 font-normal relative z-20 repo-desc text-center">
            {repo.description ?? 'No description provided.'}
        </p>

        {#if repo.topLanguages && repo.topLanguages.length}
            <div class="mt-2 flex flex-wrap justify-center gap-2 relative z-20">
                {#each repo.topLanguages as lang}
                    <span class="px-2 py-1 text-xs font-medium bg-neutral-800 rounded">{lang}</span>
                {/each}
            </div>
        {/if}

        <div class="mt-2 flex justify-between items-center relative z-20">
            <a href={repo.html_url}
               target="_blank"
               rel="noopener noreferrer"
               class="rounded-lg p-2 text-slate-400 transition-colors hover:text-white"
               aria-label={`Go to ${repo.name} GitHub repository`}>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.22-.124-.304-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.484 11.484 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.872.118 3.176.77.839 1.235 1.91 1.235 3.22 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.103.823 2.223v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
            </a>
            <span class="text-sm text-slate-400">Created: {formatDate(repo.created_at)}</span>
        </div>
    </div>
{/if}
