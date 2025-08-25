<script>
    import {onDestroy, onMount} from "svelte";

    export let className = "";

    const CELL_W = 64;
    const CELL_H = 32;

    const WIDTH_MULT = 2.6;   // controls how much wider than parent the grid is
    const HEIGHT_MULT = 2.6;  // controls how much taller than parent the grid is
    const BASE_BUFFER = 7;    // fixed extra rows/cols
    const EXTRA_FRAC = 0.21;  // additional fraction of cols/rows as safety margin

    const colors = [
        "#cba6f7",
        "#45475a",
        "#626880",
        "#ffffff",
    ];
    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    let cols = 0;
    let rows = 0;
    let parentRect = {width: 0, height: 0};

    let rootEl;
    let ro;

    function updateCounts(width, height) {
        const baseCols = Math.ceil((width * WIDTH_MULT) / CELL_W);
        const baseRows = Math.ceil((height * HEIGHT_MULT) / CELL_H);

        cols = baseCols + BASE_BUFFER + Math.ceil(baseCols * EXTRA_FRAC);
        rows = baseRows + BASE_BUFFER + Math.ceil(baseRows * EXTRA_FRAC);
    }

    onMount(() => {
        const parent = rootEl && rootEl.parentElement;
        if (!parent) return;

        const measure = () => {
            const r = parent.getBoundingClientRect();
            parentRect = {width: r.width, height: r.height};
            updateCounts(r.width, r.height);
        };

        measure();

        ro = new ResizeObserver(() => {
            measure();
        });
        ro.observe(parent);

        return () => {
            if (ro && parent) ro.unobserve(parent);
        };
    });

    onDestroy(() => {
        if (ro) ro.disconnect();
    });

    const cn = (...p) => p.filter(Boolean).join(" ");
</script>

<div bind:this={rootEl}
     class={cn("absolute left-1/2 top-1/2 z-0 pointer-events-none", className)} style="
     width: calc(100% * 2.6);
     height: calc(100% * 2.6);
     transform: translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0);
     transform-origin: center;">
    <div class="flex flex-col h-full w-full">
        {#each Array(rows) as _, i}
            <div class="flex">
                {#each Array(cols) as _, j}
                    <div on:mouseenter={(e) => {
                        e.currentTarget.style.transition = "none";
                        e.currentTarget.style.backgroundColor = getRandomColor(); }}
                         on:mouseleave={(e) => {
                             e.currentTarget.style.transition = "background-color 0.15s ease-out";
                             e.currentTarget.style.backgroundColor = "";
                         }}
                         class="pointer-events-auto relative h-8 w-16 border-t border-r border-slate-700"
                         role="presentation">
                        {#if j % 2 === 0 && i % 2 === 0}
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke-width="1.5"
                                 stroke="currentColor"
                                 class="pointer-events-none absolute -top-[14px] -left-[22px] h-6 w-10 stroke-[1px] text-slate-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
                            </svg>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
