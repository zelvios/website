<script lang="ts">
    import {Motion, useMotionTemplate, useMotionValue} from "svelte-motion";
    import {createEventDispatcher, onMount} from "svelte";

    export let name: string;
    export let active: boolean = false;
    export let color: string = "#cba6f7";

    let gradientSize = 150;
    let gradientColor = color;
    let gradientOpacity = 0.8;

    let gradSize = useMotionValue(gradientSize);
    let gradColor = useMotionValue(gradientColor);
    let mouseX = useMotionValue(-gradientSize);
    let mouseY = useMotionValue(-gradientSize);

    function handleMouseMove(e: MouseEvent) {
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }

    function handleMouseLeave() {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }

    onMount(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    });

    let bg = useMotionTemplate`radial-gradient(${gradSize}px circle at ${mouseX}px ${mouseY}px, ${gradColor}, transparent 100%)`;

    const dispatch = createEventDispatcher();
</script>

<main>
    <button
            class="group relative flex overflow-hidden rounded-xl
           bg-neutral-100 dark:bg-neutral-900
           items-center justify-center gap-2
           w-[180px] h-[100px] cursor-pointer
           transition-all duration-500 ease-in-out
           ring-0
           hover:ring-2
           {active ? 'ring-2' : ''}"
            on:click={() => dispatch("click")}
            on:mouseleave={handleMouseLeave}
            on:mousemove={handleMouseMove}
            style="--tw-ring-color: {color}; color: {active ? color : ''};">

        <div class="relative z-10 flex items-center gap-3">
            <img alt={`${name} Logo`} class="w-8 h-8" src={`/images/icons/${name.toLowerCase()}.svg`}/>
            <p
                    class="lowercase font-bold text-lg transition-colors duration-300"
                    style="color: {active ? color : ''};"
            >
                {name}
            </p>
        </div>


        <Motion let:motion
                style={{
            background: bg,
            opacity: gradientOpacity,
            }}>
            <div class="pointer-events-none absolute -inset-px rounded-xl opacity-0
                   transition-opacity duration-300
                   group-hover:opacity-100 {active ? 'opacity-100' : ''}"
                 use:motion/>
        </Motion>
    </button>
</main>