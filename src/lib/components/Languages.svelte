<script>
    import Marquee from "$lib/components/ui/Marquee.svelte";
    import ReviewCard from "$lib/components/ui/ReviewCard.svelte";
    import {
        SiC,
        SiDocker,
        SiGithub,
        SiJavascript,
        SiPostgresql,
        SiPython,
        SiRust,
        SiSvelte,
        SiTypescript,
        SiVuedotjs
    } from "@icons-pack/svelte-simple-icons";

    let root;

    const languages = [
        {name: "Rust", body: "Built apps with Tauri, Ratatui, and Diesel.", icon: SiRust},
        {name: "C#", body: "Developed e-commerce sites with APIs and databases.", icon: SiC},
        {name: "JavaScript", body: "Worked on multiple projects.", icon: SiJavascript},
        {name: "TypeScript", body: "Used for type-safe project development.", icon: SiTypescript},
        {name: "Vue", body: "Gained experience from education [ TECHCOLLEGE ].", icon: SiVuedotjs},
        {name: "Svelte", body: "Created portfolio and experimental projects.", icon: SiSvelte},
        {name: "GitHub", body: "Managed and hosted Git repositories.", icon: SiGithub},
        {name: "Docker", body: "Containerized apps and environments.", icon: SiDocker},
        {name: "PostgreSQL", body: "Worked with relational databases via Diesel.", icon: SiPostgresql},
        {name: "Python", body: "Built small projects and explored ML.", icon: SiPython}
    ];

    let firstRow = languages.slice(0, languages.length / 2);
    let secondRow = languages.slice(languages.length / 2);
</script>


<main class="relative flex items-start justify-center w-full mb-32 px-8 pt-16">
    <div bind:this={root}
         class="relative w-full sm:w-[75%] min-h-[50vh] h-auto p-8 sm:p-16 md:p-24 lg:p-32 rounded-xl border border-white/10 bg-white bg-opacity-[0.01] overflow-hidden flex flex-col justify-between"
         id="part2">

        <div class="flex-1 z-10">
            <p class="mt-5 text-sm text-accent line-clamp-3 text-left font-bold">
                Programming Languages
            </p>

            <h2 class="pointer-events-none mt-2 font-semibold leading-none text-transparent bg-gradient-to-b from-accent to-black bg-clip-text text-4xl md:text-6xl text-left">
                Your Programmer
            </h2>

            <p class="mt-5 text-sm text-gray-600 line-clamp-3 text-left max-w-lg">
                Experienced with a wide range of tools and always ready to apply
                that knowledge to learn and master new technologies.
            </p>
        </div>

        <div class="w-full flex flex-col items-center justify-center overflow-hidden bg-background py-6 md:py-10 md:shadow-xl border-transparent z-0">
            <Marquee class="[--duration:20s]" pauseOnHover>
                {#each firstRow as item}
                    <ReviewCard {...item}/>
                {/each}
            </Marquee>

            <Marquee class="[--duration:20s]" pauseOnHover reverse>
                {#each secondRow as item}
                    <ReviewCard {...item}/>
                {/each}
            </Marquee>
        </div>

        <div class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-base dark:from-background"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-base dark:from-background"></div>

        <div class="flex justify-center">
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

        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent pointer-events-none"></div>

    </div>
</main>
