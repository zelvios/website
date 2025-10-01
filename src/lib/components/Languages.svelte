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
    import AnimatedShinyText from "$lib/components/ui/AnimatedShinyText.svelte";

    let root;

    const languages = [
        {name: "Rust", body: "Built apps with Tauri, Ratatui, and Diesel.", icon: SiRust},
        {name: "C#", body: "Developed e-commerce sites with APIs and databases.", icon: SiC},
        {name: "JavaScript", body: "Worked on multiple projects.", icon: SiJavascript},
        {name: "TypeScript", body: "Worked on multiple projects.", icon: SiTypescript},
        {name: "Vue", body: "Gained experience from education [ TECHCOLLEGE ].", icon: SiVuedotjs},
        {name: "Svelte", body: "Created portfolio and experimental projects.", icon: SiSvelte},
        {name: "GitHub", body: "Using conventional commits for structured workflows.", icon: SiGithub},
        {name: "Docker", body: "Using containers to simulate production environments.", icon: SiDocker},
        {name: "PostgreSQL", body: "Worked with relational databases via Diesel.", icon: SiPostgresql},
        {name: "Python", body: "Built small projects and explored Machine Learning.", icon: SiPython}
    ];

    let firstRow = languages.slice(0, languages.length / 2);
    let secondRow = languages.slice(languages.length / 2);
</script>


<main class="relative flex items-start justify-center w-full px-8 pt-16">
    <div bind:this={root}
         class="relative w-full sm:w-[80%] min-h-[45vh] h-auto p-8 sm:p-16 md:p-24 lg:p-32 rounded-xl border border-white/10 bg-white bg-opacity-[0.01] overflow-hidden flex flex-col justify-between"
         id="part2">

        <div class="flex-1 z-10">
            <div class="pointer-events-none inline-block bg-surface/30 backdrop-blur-sm border border-surface1/40 rounded-lg px-3 py-1 shadow-sm mb-2">
                <AnimatedShinyText
                        class="text-sm font-bold text-transparent bg-clip-text animate-shimmer
           bg-gradient-to-r from-transparent via-[#cba6f7]/80 via-50% to-transparent"
                >
                    Experince
                </AnimatedShinyText>
            </div>

            <h2 class="pointer-events-none mt-2 font-semibold leading-none text-accent text-4xl md:text-6xl text-left pb-4">
                Your Programmer
            </h2>

            <p class="mt-5 text-sm tex-text line-clamp-3 text-left max-w-lg">
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

        <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent pointer-events-none"></div>

    </div>
</main>
