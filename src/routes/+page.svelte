<main class="text-text p-8">
    <div class="flex flex-col md:flex-row items-center justify-center space-y-16 md:space-x-40 md:space-y-0 mt-[5vh] md:mt-[20vh]">

        <!-- Left column: Title and Undertitle -->
        <div class="w-auto text-center md:text-left mt-[-5vh] md:mt-0 fade-in">
            <h1 class="text-6xl md:text-4xl font-bold text-accent">
                Jacob Jørgensen
            </h1>

            <p class="text-lg text-surface mt-2 text-center md:text-left">
                <a href="https://github.com/zelvios" target="_blank" class="underline-link text-surface">
                    https://github.com/zelvios
                </a>
            </p>

            <div class="mt-6 flex justify-center">
            </div>
        </div>

        <!-- Right column: Information text container -->
        <div class="w-auto md:max-w-[25%] md:mx-auto fade-in">
            <h2 class="text-base font-semibold text-text mb-4"><span class="text-accent">♦</span> About Me</h2>

            <p class="text-base text-text text-left">
                I’m currently studying programming at TECHCOLLEGE, focusing on backend development with Rust.
                I enjoy working with a variety of tools and technologies, always aiming to select the best one for each project.
            </p>

            <div class="mt-8"></div>

            <h2 class="text-base font-semibold text-text mb-4"><span class="text-accent">♦</span> Skills</h2>

            <div class="flex flex-wrap gap-3">
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">Rust</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">C</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">C#</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">Kotlin</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">JavaScript</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">TypeScript</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">HTML</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">CSS</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">PostgreSQL</span>
                <span class="bg-surface1 text-text rounded-full py-0.5 px-2 text-sm font-medium">SQLite</span>
            </div>
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

    .underline-link {
        position: relative;
        display: inline-block;
        color: inherit;
    }

    .underline-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background-color: currentColor;
        transition: all 0.5s ease;
        transform: translateX(-50%);
    }

    .underline-link:hover::after {
        width: 100%;
        left: 0;
        transform: translateX(0);
    }
</style>