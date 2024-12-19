<main class="text-text p-8">
    <div class="flex flex-col sm:flex-row items-center justify-center space-y-40 sm:space-x-40 sm:space-y-0 mt-[30vh]">

        <!-- Left column: Title and Undertitle -->
        <div class="w-auto text-center sm:text-left mt-[-10vh]">
            <h1 class="text-4xl font-bold text-accent">
                Jacob Jørgensen
            </h1>
            <p class="text-lg text-surface mt-2 text-center">
                <!-- Make it a link with custom underline effect -->
                <a href="https://github.com/zelvios" target="_blank" class="underline-link text-surface">
                    https://github.com/zelvios
                </a>
            </p>
        </div>

        <!-- Right column: Information text container -->
        <div class="w-auto sm:max-w-[20%] sm:mx-auto">
            <h2 class="text-base font-semibold text-text mb-4"><span class="text-accent">$</span> cat about_me</h2>

            <p class="text-base text-text text-left">
                I'm a student at TECHCOLLEGE for programming where I specialize in the backend, primarily Rust, but love building with whatever tools are right for the job.
            </p>

            <div class="mt-8"></div>

            <h2 class="text-base font-semibold text-text mb-4"><span class="text-accent">$</span> ls ~/skills</h2>

            <p class="text-base text-text text-left">
                Linux Rust C# SQL
            </p>
        </div>

    </div>
</main>

<style>
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
