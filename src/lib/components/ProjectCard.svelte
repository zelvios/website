<script>
    export let repo;
    export let formatDate;
</script>

<div class="group relative flex-none w-[360px] min-w-0 mb-10">
    <div class="relative overflow-hidden rounded-2xl bg-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/15">

        <div class="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>
        <div class="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>

        <div class="relative p-6">
            <div class="absolute right-6 top-6">
                <img src="./images/projects.svg"
                     alt="Project Icon"
                     class="h-12 w-12 text-indigo-500/10"/>
            </div>

            <!-- title & desc -->
            <div class="mt-4 space-y-2">
                <a href={repo.html_url}
                   target="_blank"
                   rel="noopener noreferrer"
                   class="block hover:underline">
                    <h3 class="text-xl font-semibold text-white">{repo.name}</h3>

                    <img src={`https://raw.githubusercontent.com/Zelvios/${repo.name}/main/.github/screenshots/design.png`}
                         alt="Project screenshot"
                         class="mt-4 rounded-lg w-full h-40 object-cover"/>
                </a>

                <p class="repo-desc text-slate-400 mt-2">
                    {repo.description ?? 'No description provided.'}
                </p>
            </div>

            <!-- languages -->
            <div class="rounded-xl bg-slate-900/50 p-4 mt-4">
                <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-white">Languages</span>
                </div>

                {#if repo.topLanguages === null && !repo.langError}
                    <p class="mt-1 text-xs text-text italic">Loading…</p>
                {:else if repo.langError}
                    <p class="mt-1 text-xs text-text italic">
                        Couldn’t load languages.
                    </p>
                {:else if repo.topLanguages.length > 0}
                    <p class="mt-1 text-xs text-text">
                        {repo.topLanguages.join(', ')}
                    </p>
                {:else}
                    <p class="mt-1 text-xs text-text">—</p>
                {/if}
            </div>

            <!-- gitHub link & created date -->
            <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <a href={repo.html_url}
                       target="_blank"
                       rel="noopener noreferrer"
                       class="rounded-lg bg-slate-900 p-2 text-slate-400 transition-colors hover:text-white"
                       aria-label={`Go to ${repo.name} GitHub repository`}>
                        <svg class="h-5 w-5"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                             aria-hidden="true">
                            <path fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.22-.124-.304-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.484 11.484 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.872.118 3.176.77.839 1.235 1.91 1.235 3.22 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.103.823 2.223v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                </div>
                <span class="text-sm text-slate-400"> Created: {formatDate(repo.created_at)} </span>
            </div>
        </div>
    </div>
</div>