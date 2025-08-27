<script>
    import AmbientColor from "$lib/components/ui/AmbientColor.svelte";
    import SocialButton from "$lib/components/SocialButton.svelte";
</script>

<main class="text-text p-6 fade-in min-h-screen flex items-center justify-center">
    <AmbientColor/>

    <div class="flex flex-col md:flex-row items-center justify-center gap-16 w-full max-w-6xl transform -translate-y-24">
        <div class="flex flex-col justify-center space-y-12 w-full md:w-1/2 text-center mx-auto">
            <div class="space-y-4">
                <h2 class="text-3xl md:text-4xl font-bold mb-4 text-accent z-20">
                    Contact
                </h2>
                <div class="space-y-12 max-w-md text-text z-20 mx-auto">
                    <p>
                        Feel free to reach out to me through any of the channels below.
                    </p>
                </div>
            </div>

            <div class="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 mx-auto">
                <SocialButton
                        href="mailto:contact@jacob-j.com?subject=Hello Jacob&body=Hi Jacob,%0A%0A"
                        text="contact@jacob-j.com"
                        title="Email"/>

                <SocialButton
                        href="https://www.linkedin.com/in/jacob-j-in/"
                        text="Jacob Jørgensen"
                        title="LinkedIn"/>
            </div>

            <div class="mt-12 text-sm text-text z-20">
                <p>
                    You can also explore more of my work on
                    <a class="text-accent" href="https://github.com/zelvios">GitHub</a>:
                    <a class="font-semibold underline hover:text-accent" href="https://github.com/zelvios">zelvios</a>.
                </p>
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
</style>
