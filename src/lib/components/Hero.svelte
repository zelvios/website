<script>
    import {onMount} from 'svelte';
    import Meteors from "$lib/components/ui/Meteors.svelte";

    onMount(() => {
        const begin = document.getElementById('to-section-2');
        if (begin) {
            begin.addEventListener('click', () => {
                setTimeout(() => history.replaceState(null, '', ' '), 10);
            });
        }

        const back = document.getElementById('to-section-1');
        if (back) {
            back.addEventListener('click', () => {
                setTimeout(() => history.replaceState(null, '', ' '), 10);
            });
        }
    });

    let journeySection;

    onMount(() => {
        journeySection = document.getElementById('part2');

        const button = document.getElementById('to-section-2');
        if (button && journeySection) {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                const headerOffset = 90;
                const elementPosition = journeySection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        }
    });

    const birthDate = new Date(2002, 1, 7);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear() -
        (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
</script>

<section class="relative overflow-hidden z-10 pt-35 md:pt-40 xl:pt-45 mb-20 min-h-screen" id="home">
    <div class="max-w-7xl mx-auto">
        <div class="absolute -z-10 pointer-events-none inset-0 overflow-hidden -mx-28">
            <div class="absolute -z-1 -top-[128%] sm:-top-[107%] xl:-top-[73%] left-1/2 -translate-x-1/2 hero-circle-gradient w-full h-[1282px] rounded-full max-w-[1282px]"></div>
            <div class="absolute -z-1 -top-[112%] sm:-top-[93%] xl:-top-[62%] left-1/2 -translate-x-1/2 hero-circle-gradient w-full h-[1046px] rounded-full max-w-[1046px]"></div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -u-z-100">
                <img alt="blur" class="max-w-none" src="./images/blur/blur-02.svg"/>
            </div>
            <div class="absolute top-0 left-1/2 -translate-x-1/2 -u-z-100">
                <img alt="blur" class="max-w-none" src="./images/blur/blur-01.svg"/>
            </div>
        </div>
    </div>

    <div class="flex flex-col items-center justify-center space-y-7 mt-[12vh] md:mt-[12vh]">
        <div class="w-auto text-center fade-in">
            <h1 class="text-6xl font-bold bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                Jacob Jørgensen
            </h1>

            <div class="flex justify-center gap-4 mt-4">
                <a href="https://github.com/zelvios">
                    <button class="flex items-center gap-2 cursor-pointer text-white text-sm font-medium bg-gradient-to-r from-gray-800 to-black px-4 py-2 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-accent hover:border-gray-800 hover:from-black hover:to-gray-900">
                        <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                  fill="#FFFFFF"/>
                        </svg>
                        Github
                    </button>
                </a>

                <a href="https://www.linkedin.com/in/jacob-j-in/">
                    <button class="flex items-center gap-2 cursor-pointer text-white text-sm font-medium bg-gradient-to-r from-gray-800 to-black px-4 py-2 rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-accent hover:border-gray-800 hover:from-black hover:to-gray-900">
                        <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 24h4V7H.5v17zM8.5 7H12v2.5h.06c.49-.92 1.7-1.9 3.44-1.9 3.68 0 4.5 2.42 4.5 5.57V24h-4v-8.17c0-1.95-.03-4.47-2.72-4.47-2.73 0-3.15 2.13-3.15 4.33V24h-4V7z"
                                  fill="#FFFFFF"/>
                        </svg>
                        LinkedIn
                    </button>
                </a>
            </div>

            <div class="max-w-prose mx-auto mt-16">
                <p class="text-md text-text mt-3 text-center" style="line-height: 1.5;">
                    Hi, I’m {age} and currently studying to become a Computer Technician at TECHCOLLEGE Aalborg,
                    specializing in programming.
                    I enjoy creating dependable software and exploring full-stack development.
                    Check out my projects on GitHub or explore my site to see what I’ve been working on!
                </p>
            </div>
        </div>

        <Meteors/>
        <div class="fade-in">
            <a id="to-section-2">
                <button class="flex items-center gap-2 cursor-pointer text-white text-sm font-medium
                   bg-gradient-to-r from-gray-800 to-black px-4 py-2 rounded-full
                   border border-gray-600 hover:scale-105 duration-200
                   hover:text-accent hover:border-gray-800 hover:from-black hover:to-gray-900">
                    <svg fill="none" height="18" stroke="currentColor" viewBox="0 0 24 24" width="18">
                        <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                    More About Me
                    <svg fill="none" height="18" stroke="currentColor" viewBox="0 0 24 24" width="18">
                        <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                </button>
            </a>
        </div>
    </div>

    <div class="w-auto fade-in mt-20 mb-0 flex justify-center">
        <img alt="Tab Icon" class="mx-auto" fetchpriority="high" src="/images/tab.svg"/>
    </div>
</section>

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
