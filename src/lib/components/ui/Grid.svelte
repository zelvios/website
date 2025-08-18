<script>
    import GridPattern from './GridPattern.svelte';
    import { onMount } from 'svelte';

    export let pattern = null;
    export let size = 20;

    let p = pattern;

    onMount(() => {
        if (!p) {
            p = Array.from({ length: 5 }, () => [
                Math.floor(Math.random() * 4) + 7,
                Math.floor(Math.random() * 6) + 1,
            ]);
        }
    });
</script>

<div class="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
    <div class="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-zinc-900/30 to-zinc-900/30 opacity-100">
        <GridPattern width={size}
                     height={size}
                     x="-12"
                     y="4"
                     {p}
                     squares={p}
                     class="absolute inset-0 h-full w-full mix-blend-overlay fill-white/10 stroke-white/10"/>
    </div>
</div>
