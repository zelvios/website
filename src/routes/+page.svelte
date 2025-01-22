<script>
    import { accentColor } from '../stores';
    const colors = ['#f4b8e4', '#7287fd', '#df8e1d', '#ff1493'];
    let currentColor = colors[0];

    const changeAccentColor = () => {
        const currentIndex = colors.indexOf(currentColor);
        const nextColor = colors[(currentIndex + 1) % colors.length];
        accentColor.set(nextColor);
        document.documentElement.style.setProperty('--accent-color', nextColor);
        currentColor = nextColor;
    };
</script>

<main class="text-text p-8">
    <div class="flex flex-col sm:flex-row items-center justify-center space-y-40 sm:space-x-40 sm:space-y-0 mt-[30vh]">

        <!-- Left column: Title and Undertitle -->
        <div class="w-auto text-center sm:text-left mt-[-10vh]">
            <h1 class="text-4xl font-bold text-accent">
                Jacob Jørgensen
            </h1>

            <p class="text-lg text-surface mt-2 text-center">
                <a href="https://github.com/zelvios" target="_blank" class="underline-link text-surface">
                    https://github.com/zelvios
                </a>
            </p>

            <div class="mt-6 flex justify-center">
                <button
                        class="colorbtn"
                        role="button"
                        on:click={changeAccentColor}
                        style="background-image: linear-gradient(144deg, {currentColor}, {colors[(colors.indexOf(currentColor) + 1) % colors.length]})"
                >
                    <span class="text">Change Main Color</span>
                </button>
            </div>
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
    .colorbtn {
        align-items: center;
        background-image: linear-gradient(144deg, #f4b8e4, #ff6347);
        border: 0;
        border-radius: 6px;
        box-shadow: rgba(151, 65, 252, 0.15) 0 10px 20px -5px;
        box-sizing: border-box;
        color: theme('colors.text');
        display: flex;
        font-size: 9px;
        justify-content: center;
        line-height: 1em;
        max-width: 100%;
        min-width: 100px;
        padding: 4px 4px;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        white-space: nowrap;
        cursor: pointer;
    }

    .colorbtn:active,
    .colorbtn:hover {
        outline: 0;
    }

    .colorbtn span {
        background-color: rgb(5, 6, 45);
        padding: 8px 14px;
        border-radius: 6px;
        width: 100%;
        height: 100%;
        transition: 300ms;
    }

    .colorbtn:hover span {
        background: none;
    }

    @media (min-width: 768px) {
        .colorbtn {
            font-size: 16px;
            min-width: 120px;
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